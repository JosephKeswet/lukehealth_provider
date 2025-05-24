import { apiRoutes, apiVersion } from "@/constants/api";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { IPatient, ISearchPatient } from "@/types/patient/payload";
import {
	IPatientHealthDataResponse,
	IPatientMedicationResponse,
	IPatientOverviewResponse,
} from "@/types/patient/responses";
import axios from "axios";

export default function usePatientService() {
	const axiosAuth = useAxiosAuth();

	const getPatients = async (): Promise<any> => {
		// if (checkAuthRoutes(pathname)) {
		//   return;
		// }

		try {
			const { data } = await axiosAuth.get(
				`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.patients.get_provider_patients}`
			);
			return data;
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const axiosError = error;
				if (axiosError.response) {
					return axiosError?.response?.data;
				}
			}
			console.error("Error:", error.message);
			throw error;
		}
	};

	const searchPatient = async (
		payload: ISearchPatient
	): Promise<IPatientHealthDataResponse> => {
		try {
			const { data } = await axiosAuth.get(
				`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.patients.search_patient}?fullName=${payload.fullName}&email=${payload.email}`
			);
			return data;
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const axiosError = error;
				if (axiosError.response) {
					return axiosError?.response?.data;
				}
			}
			console.error("Error:", error.message);
			throw error;
		}
	};

	const onboardPatient = async (payload: IPatient): Promise<any> => {
		try {
			const { data } = await axiosAuth.post(
				`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.patients.onboard_patient}`,
				{
					...payload,
					gender: payload.gender.toLowerCase(),
					lifestyleConditions: [payload.lifestyleConditions],
				}
			);

			return data;
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const axiosError = error;
				if (axiosError.response) {
					const errorMessage = axiosError?.response?.data?.message;
					return axiosError?.response?.data;
				}
			}
			console.error("Error:", error.message);
			throw error;
		}
	};

	const getPatientOverview = async (payload: {
		patientId: string;
	}): Promise<IPatientOverviewResponse> => {
		// if (checkAuthRoutes(pathname)) {
		//   return;
		// }

		try {
			const { data } = await axiosAuth.get(
				`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.patients.get_patient_overview}?userId=${payload.patientId}`
			);
			return data;
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const axiosError = error;
				if (axiosError.response) {
					return axiosError?.response?.data;
				}
			}
			console.error("Error:", error.message);
			throw error;
		}
	};

	const getPatientMedication = async (payload: {
		patientId: string;
	}): Promise<IPatientMedicationResponse> => {
		// if (checkAuthRoutes(pathname)) {
		//   return;
		// }

		try {
			const { data } = await axiosAuth.get(
				`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.patients.get_patient_medication}?userId=${payload.patientId}`
			);
			return data;
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const axiosError = error;
				if (axiosError.response) {
					return axiosError?.response?.data;
				}
			}
			console.error("Error:", error.message);
			throw error;
		}
	};
	const getPatientHealthData = async (payload: {
		patientId: string;
	}): Promise<IPatientHealthDataResponse> => {
		// if (checkAuthRoutes(pathname)) {
		//   return;
		// }

		try {
			const { data } = await axiosAuth.get(
				`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.patients.get_patient_health_data}?userId=${payload.patientId}`
			);
			return data;
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const axiosError = error;
				if (axiosError.response) {
					return axiosError?.response?.data;
				}
			}
			console.error("Error:", error.message);
			throw error;
		}
	};

	return {
		getPatients,
		onboardPatient,
		getPatientOverview,
		getPatientMedication,
		getPatientHealthData,
		searchPatient,
	};
}
