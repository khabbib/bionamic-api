import { Handler } from "express";
import { Counter } from "prom-client";

export function createPrometheusMiddleware(counterMetric: Counter): Handler {
	return (req, res, next) => {
		res.on("finish", () => {
			const statusCode = String(res.statusCode);
			const path = String(req.route?.path);
			counterMetric.labels(path, req.method, statusCode).inc();
		});

		next();
	};
}
