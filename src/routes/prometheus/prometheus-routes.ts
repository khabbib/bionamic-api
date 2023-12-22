import { Router } from "express";
import { PrometheusController } from "../../controllers/prometheus/prometheus-controller";

function createPrometheusRoutes(prometheusController: PrometheusController) {
	return Router().get(
		"/",
		prometheusController.getMetrics.bind(prometheusController),
	);
}

export { createPrometheusRoutes };
