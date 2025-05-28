import { StyleSheet, View } from "react-native";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { medicationSchema } from "@/types/health/payload";
import useHealthStore from "@/store/useHealthStore";
import AddMedStepOne from "@/features/medication/AddMedStepOne";
import AddMedStepTwo from "@/features/medication/AddMedStepTwo";
import AddMedStepThree from "@/features/medication/AddMedStepThree";

export default function AddMedicationScreen() {
	const methods = useForm({
		resolver: zodResolver(medicationSchema),
		mode: "onChange",
		shouldUnregister: false, // 🔥 This keeps the values of unmounted fields
	});
	const addMedicationProgress = useHealthStore(
		(state) => state.addMedicationProgress
	);
	const setAddMedicationProgress = useHealthStore(
		(state) => state.setAddMedicationProgress
	);

	// Determine which component to render based on progress
	const CurrentStep =
		addMedicationProgress === 0 ? (
			<AddMedStepOne />
		) : addMedicationProgress === 0.5 ? (
			<AddMedStepTwo />
		) : (
			<AddMedStepThree />
		);

	// Handlers for navigating between steps
	const handleNextStep = () => {
		if (addMedicationProgress < 1) {
			setAddMedicationProgress(addMedicationProgress + 0.5);
		}
	};

	const handlePreviousStep = () => {
		if (addMedicationProgress > 0) {
			setAddMedicationProgress(addMedicationProgress - 0.5);
		}
	};

	return (
		<FormProvider {...methods}>
			<View style={styles.container}>{CurrentStep}</View>
		</FormProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		height: "100%",
		backgroundColor: "white",
		// flex: 1,
		// justifyContent: "center",
		// alignItems: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "80%",
		marginTop: 20,
	},
});
