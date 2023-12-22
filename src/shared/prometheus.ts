import {
	Counter,
	Gauge,
	Histogram,
	Summary,
	Registry,
	collectDefaultMetrics,
} from "prom-client";
import { CONFIG } from "./config";

// Type 1 : Counter
export const counter = new Counter({
	name: "http_request_total",
	help: "Total number of HTTP requests",
	labelNames: ["route", "method", "status_code"],
});

// Type 2 : Gauge
export const gauge = new Gauge({
	name: "type_gauge",
	help: "Any Arbitary value to help identify this gauge",
});

// Type 3 : Histogram
export const histogram = new Histogram({
	name: "type_histogram",
	help: "Any Arbitary value to help identify this histogram",
});

// type 4 : Summaries
export const summary = new Summary({
	name: "type_summary",
	help: "Any Arbitary value to help identify this summary",
});

export const registry = new Registry();
registry.setDefaultLabels({
	app: CONFIG.SERVER.SERVER_NAME,
});
collectDefaultMetrics({ register: registry });

registry.registerMetric(counter);
registry.registerMetric(gauge);
registry.registerMetric(histogram);
registry.registerMetric(summary);
