import { Router } from "express";
import { apiRoutes } from "./api/api-routes";
import { prometheusRoutes } from "./prometheus/prometheus-routes-module";
import { prometheusMiddleware } from "../middleware/prometheus/prometheus-middleware-module";

export const rootRoutes = Router()
	.use(prometheusMiddleware)
	.use("/api/test", (_req, res) => {
		res.send("got it");
	})
	.use("/api", apiRoutes)
	.use("/metrics", prometheusRoutes);
