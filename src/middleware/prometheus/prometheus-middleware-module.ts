import { counter } from "../../shared/prometheus";
import { createPrometheusMiddleware } from "./prometheus-middleware";

export const prometheusMiddleware = createPrometheusMiddleware(counter);
