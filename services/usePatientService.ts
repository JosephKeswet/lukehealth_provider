import { apiRoutes, apiVersion } from "@/constants/api";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { IPatient } from "@/types/patient/payload";
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

	return {
		getPatients,
		onboardPatient,
	};
}
