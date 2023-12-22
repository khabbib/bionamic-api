import axios, { AxiosRequestConfig } from "axios";
import https from "https";
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
import { IApiKey, IUser } from "./interfaces.js";

class BionamicSDK {
	private API_URL: string;
	private API_KEY: string;
	private axiosConfig: AxiosRequestConfig;

	constructor() {
		this.API_URL = "https://localhost/api";
		this.API_KEY = "<api-key>";
		// const __filename = fileURLToPath(import.meta.url);
		// const __dirname = path.dirname(__filename);
		this.axiosConfig = {
			httpsAgent: new https.Agent({
				rejectUnauthorized: false, // Production must Set to true
				// cert: fs.readFileSync(path.resolve(__dirname, '../../certificates/server.crt')),
				// key: fs.readFileSync(path.resolve(__dirname, '../../certificates/server.key')),
			}),
		};
	}

	async test(): Promise<string> {
		try {
			const response = await axios.get(
				`${this.API_URL}/test`,
				this.axiosConfig,
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	// API KEY
	async getAPIKeys(offset: number, limit: string): Promise<IApiKey[]> {
		try {
			const response = await axios.get(
				`${this.API_URL}/api-keys?offset=${offset}&limit=${limit}`,
				this.axiosConfig,
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async getAPIKeyById(id: string): Promise<IApiKey[]> {
		try {
			const response = await axios.get(
				`${this.API_URL}/api-keys?id=${id}`,
				this.axiosConfig,
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async insertApiKey(level: number): Promise<IApiKey[]> {
		try {
			const response = await axios.post(
				`${this.API_URL}/api-key/${level}`,
				{},
				this.axiosConfig,
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	// USER
	async getUsers(offset: number, limit: string): Promise<IUser[]> {
		try {
			const response = await axios.get(
				`${this.API_URL}/users?offset=${offset}&limit=${limit}`,
				this.axiosConfig,
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
}

export default BionamicSDK;
