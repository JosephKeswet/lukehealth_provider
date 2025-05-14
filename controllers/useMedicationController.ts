import { queryKeys } from "@/constants/queryKeys";
import { useCustomMutation } from "@/frameworks/useCustomMutation";
import { useCustomQuery } from "@/frameworks/useCustomQuery";
import usePrescription from "@/hooks/mutations/usePrescription";
import useUser from "@/hooks/mutations/useUser";
import useMedicationService from "@/services/useMedicationService";
import useUserService from "@/services/useUserService";
import useHealthStore from "@/store";
import { IAddMedication, medicationSchema } from "@/types/health/payload";

import {
	IUpdatePersonalInfo,
	updatePersonalInfoSchema,
} from "@/types/user/payload";
import { formatDateOfBirth, formatDateToDMY } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useMedicationController() {
	const { addMedication } = useMedicationService();
	const mutation = useCustomMutation(addMedication);
	const { addPrescriptionDetails } = usePrescription(mutation);
	const addMedicationProgress = useHealthStore(
		(state) => state.addMedicationProgress
	);
	const setAddMedicationProgress = useHealthStore(
		(state) => state.setAddMedicationProgress
	);

	const handleNextStep = () => {
		if (addMedicationProgress < 1) {
			setAddMedicationProgress(addMedicationProgress + 0.5);
		}
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IAddMedication>({
		resolver: zodResolver(medicationSchema),
		defaultValues: {
			additionalDetails: "",
			brandName: "",
			administrationRoute: "",
			prescribingClinic: "",
			diagnosis: "",
			endDate: "",
			frequencyOfUsage: "as-needed",
			startDate: "",
			prescriptionUrl: "",
			doseWeightUnit: "",
		},
	});

	function onSubmit(data: IAddMedication) {
		const dose = data.dose?.toString() + " " + data.doseWeightUnit;
		addPrescriptionDetails({
			additionalDetails: data.additionalDetails!,
			brandName: data.brandName,
			dose: dose,
			administrationRoute: data.administrationRoute,
			prescribingClinic: data.prescribingClinic,
			diagnosis: data.diagnosis,
			endDate: new Date(data.endDate).toISOString().split("T")[0], // Ensures YYYY-MM-DD
			frequencyOfUsage: data.frequencyOfUsage,
			startDate: new Date(data.startDate).toISOString().split("T")[0], // Ensures YYYY-MM-DD
			prescriptionUrl: data.prescriptionUrl,
		});
	}

	return {
		control,
		handleSubmit,
		errors,
		onSubmit,
		mutation,
	};
}
