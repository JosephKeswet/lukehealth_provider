import { apiRoutes, apiVersion } from "@/constants/api";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { BaseResponse } from "@/types";
import {
	IAddMedication,
	IHealthInfo,
	ILogVitals,
	IMarkCompliance,
	IUpdateHealthInfo,
} from "@/types/health/payload";
import {
	IGetCompletedMedicationsResponse,
	IGetMedicationsResponse,
	IHealthInfoResponse,
	IMarkComplianceResponse,
	IVitalsResponse,
} from "@/types/health/responses";
import axios from "axios";

export default function useMedicationService() {
	const axiosAuth = useAxiosAuth();

	const addMedication = async (payload: IAddMedication): Promise<any> => {
		// if (checkAuthRoutes(pathname)) {
		//   return;
		// }

		try {
			const { data } = await axiosAuth.post(
				`${apiVersion}${apiRoutes.medication.add1}`,
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

	const getMedication = async (): Promise<IGetMedicationsResponse> => {
		// if (checkAuthRoutes(pathname)) {
		//   return;
		// }

		try {
			const { data } = await axiosAuth.get(
				`${apiVersion}${apiRoutes.medication.getMedications}`
			);
			return data;
		} catch (error: any) {
			console.error("Error:", error.message);
			throw error;
		}
	};

	const getCompletedMedication =
		async (): Promise<IGetCompletedMedicationsResponse> => {
			// if (checkAuthRoutes(pathname)) {
			//   return;
			// }

			try {
				const { data } = await axiosAuth.get(
					`${apiVersion}${apiRoutes.medication.get_completed_medication}`
				);
				return data;
			} catch (error: any) {
				console.error("Error:", error.message);
				throw error;
			}
		};

	const markCompliance = async (
		payload: IMarkCompliance
	): Promise<IMarkComplianceResponse> => {
		// if (checkAuthRoutes(pathname)) {
		//   return;
		// }

		try {
			const { data } = await axiosAuth.post(
				`${apiVersion}${apiRoutes.medication.mark_compliance}`,
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

	const logVitals = async (payload: ILogVitals): Promise<BaseResponse> => {
		try {
			const { data } = await axiosAuth.post(
				`${apiVersion}${apiRoutes.medication.log_vitals}`,
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

	const getVitals = async (): Promise<IVitalsResponse> => {
		try {
			const { data } = await axiosAuth.get(
				`${apiVersion}${apiRoutes.medication.get_vitals}`
			);
			return data;
		} catch (error: any) {
			console.error("Error:", error.message);
			throw error;
		}
	};

	return {
		updateHealthInfo,
		addMedication,
		getMedication,
		markCompliance,
		getCompletedMedication,
		logVitals,
		getVitals,
	};
}
