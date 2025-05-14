import { apiRoutes, apiVersion } from "@/constants/api";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { BaseResponse } from "@/types";
import {
	IHealthInfo,
	ILogVitals,
	IUpdateHealthInfo,
} from "@/types/health/payload";
import { IHealthInfoResponse } from "@/types/health/responses";
import axios from "axios";

export default function useHealthService() {
	const axiosAuth = useAxiosAuth();

	const healthInfo = async (
		payload: IHealthInfo
	): Promise<IHealthInfoResponse> => {
		// if (checkAuthRoutes(pathname)) {
		//   return;
		// }

		try {
			const { data } = await axiosAuth.post(
				`${apiVersion}${apiRoutes.health.addinfo}`,
				payload
			);
			return data;
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const axiosError = error;
				if (axiosError.response) {
					return axiosError?.response?.data;
				}
			}
			// Handle other errors
			console.error("Error:", error.message);
			throw error;
		}
	};

	const updateHealthInfo = async (payload: IUpdateHealthInfo): Promise<any> => {
		try {
			const { data } = await axiosAuth.post(
				`${apiVersion}${apiRoutes.health.updateHealthInfo}`,
				payload
			);
			return data;
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const axiosError = error;
				if (axiosError.response) {
					return axiosError?.response?.data;
				}
			}
			// Handle other errors
			console.error("Error:", error.message);
			throw error;
		}
	};

	return {
		healthInfo,
		updateHealthInfo,
	};
}
