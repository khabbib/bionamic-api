import { register } from "prom-client";
import { Request, Response } from "express";
import { respInternalServerError, respOkJSON } from "../shared/server-response";
export class PrometheusController {
	async getMetrics(_req: Request, res: Response) {
		res.setHeader("Content-Type", register.contentType);
		try {
			const metrics = await register.metrics();
			await respOkJSON(res, metrics, null);
		} catch (error) {
			respInternalServerError(res, null);
		}
	}
}
