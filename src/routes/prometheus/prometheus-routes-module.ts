import { prometheusController } from "../../controllers/prometheus/prometheus-controller-module";
import { createPrometheusRoutes } from "./prometheus-routes";

export const prometheusRoutes = createPrometheusRoutes(prometheusController);
