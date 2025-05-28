import { useCustomMutation } from "@/frameworks/useCustomMutation";
import usePrescription from "@/hooks/mutations/usePrescription";
import useMedicationService from "@/services/useMedicationService";
import useAddMedicationStore from "@/store/useAddMedication";
import { IAddMedication, medicationSchema } from "@/types/health/payload";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

export default function useMedicationController() {
	const { addMedication } = useMedicationService();
	const mutation = useCustomMutation(addMedication);
	const { addPrescriptionDetails } = usePrescription(mutation);
	const { patientId } = useAddMedicationStore();

	// Get persisted data
	const medicationFormData = useAddMedicationStore(
		(state) => state.medicationFormData
	);
	const setMedicationFormData = useAddMedicationStore(
		(state) => state.setMedicationFormData
	);

	const {
		control,
		handleSubmit,
		formState: { errors },
		trigger,
		watch,
	} = useForm<IAddMedication>({
		resolver: zodResolver(medicationSchema),
		defaultValues: {
			userId: "",
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
			medicationTimes: [""],
			dose: 0,

			// override with persisted data if any
			...medicationFormData,
		},
		mode: "onChange",
		shouldUnregister: false,
	});

	// Persist form data on each change
	React.useEffect(() => {
		const subscription = watch((value) => {
			setMedicationFormData({
				...value,
				medicationTimes:
					value.medicationTimes?.filter((time): time is string => !!time) || [],
			});
		});
		return () => subscription.unsubscribe();
	}, [watch, setMedicationFormData]);

	// onSubmit remains same, calls addPrescriptionDetails etc
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
			medicationTimes: data.medicationTimes,
			userId: patientId,
		});
	}
	return {
		control,
		handleSubmit,
		errors,
		onSubmit,
		mutation,
		trigger,
	};
}
