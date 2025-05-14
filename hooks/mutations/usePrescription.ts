import { MutationAdapter } from "@/frameworks/adapters/mutationAdapter";
import { useStorage } from "../useStorage";
import { useQueryClient } from "@tanstack/react-query";
import useToast from "../useToast";
import {
	ICompliance,
	IHealthInfoResponse,
	IMarkComplianceResponse,
} from "@/types/health/responses";
import { router } from "expo-router";
import {
	IAddMedication,
	IHealthInfo,
	IMarkCompliance,
} from "@/types/health/payload";
import { ResponseState } from "@/constants/enums";
import { apiRoutes } from "@/constants/api";

export default function usePrescription(
	mutationAdapter: MutationAdapter<any, any>
) {
	const { saveCookie } = useStorage();
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const handlePrescriptionFailed = ({ message, technicalMessage }: any) => {
		if (technicalMessage) {
			toast({
				type: "error", // or 'error' or 'delete'
				text1: technicalMessage,
			});
		}
		toast({
			type: "error", // or 'error' or 'delete'
			text1: message,
		});
	};
	const handlePrescriptionSuccess = ({ message }: any) => {
		toast({
			type: "success", // or 'error' or 'delete'
			text1: message,
		});
		queryClient.invalidateQueries({
			queryKey: [apiRoutes.medication.getMedications],
		});
		router.push("/(tabs)/medications");
	};
	const addPrescriptionOne = async (args: IAddMedication) => {
		const response = await mutationAdapter.mutate(args);
		if (response.state === ResponseState.Success) {
			handlePrescriptionSuccess(response);
		} else {
			handlePrescriptionFailed(response);
		}
	};

	const addPrescriptionTwo = async (args: IAddMedication) => {
		const response = await mutationAdapter.mutate(args);
		if (response.state === ResponseState.Success) {
			handlePrescriptionSuccess(response);
		} else {
			handlePrescriptionFailed(response);
		}
	};

	const addPrescriptionDetails = async (
		args: IAddMedication,
		handleNextStep?: any
	) => {
		const response = await mutationAdapter.mutate(args);
		toast({
			type: "error", // or 'error' or 'delete'
			text1: response.technicalMessage,
		});
		if (response.state === ResponseState.Success) {
			handlePrescriptionSuccess(response);
		} else {
			handlePrescriptionFailed(response);
		}
	};

	const handleMarkComplianceSuccess = ({
		message,
	}: IMarkComplianceResponse) => {
		queryClient.invalidateQueries({
			queryKey: [apiRoutes.medication.get_completed_medication],
		});
		queryClient.invalidateQueries({
			queryKey: [apiRoutes.medication.getMedications],
		});
		toast({
			type: "success", // or 'error' or 'delete'
			text1: message,
		});
	};

	const handleMarkComplianceFailed = ({ message }: IMarkComplianceResponse) => {
		toast({
			type: "error", // or 'error' or 'delete'
			text1: message,
		});
		queryClient.invalidateQueries({
			queryKey: [apiRoutes.medication.getMedications],
		});
	};

	const markPrescriptionCompliance = async (args: IMarkCompliance) => {
		const response = await mutationAdapter.mutate(args);
		if (response.state === ResponseState.Success) {
			handleMarkComplianceSuccess(response);
		} else {
			handleMarkComplianceFailed(response);
		}
	};

	return {
		addPrescriptionOne,
		addPrescriptionTwo,
		addPrescriptionDetails,
		markPrescriptionCompliance,
	};
}
