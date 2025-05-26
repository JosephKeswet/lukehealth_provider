import { apiRoutes, apiVersion } from "@/constants/api";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { IVerifyEmail } from "@/types/auth/payload";
import { IVerifyEmailResponse } from "@/types/auth/responses";
import { ICreateNote } from "@/types/notes/payload";

import axios from "axios";

export default function useNoteService() {
	const axiosAuth = useAxiosAuth();
	const createNote = async (payload: ICreateNote): Promise<any> => {
		try {
			const { data } = await axiosAuth.post(
				`${apiVersion}${apiRoutes.notes.create}`,
				payload
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

	const getProviderNotes = async (): Promise<any> => {
		// if (checkAuthRoutes(pathname)) {
		//   return;
		// }

		try {
			const { data } = await axiosAuth.get(
				`${apiVersion}${apiRoutes.notes.get}`
			);
			return data;
		} catch (error: any) {
			console.log(error);
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
		createNote,
		getProviderNotes,
	};
}
