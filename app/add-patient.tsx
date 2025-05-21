import React from "react";
import { StyleSheet, View } from "react-native";
import usePatientStore from "@/store";
import PatientStepOne from "@/features/patient/PatientStepOne";
import PatientStepTwo from "@/features/patient/PatientStepTwo";
export default function PatientInfoScreen() {
	const patientProgress = usePatientStore((state) => state.patientProgress);

	// Render the appropriate step based on patient progress
	const renderStep = () => {
		switch (patientProgress) {
			case 0.2:
				return <PatientStepOne />;
			case 0.8:
				return <PatientStepTwo />;
			// case 0.6:
			// 	return <PatientStepThree />;
			// case 0.8:
			// 	return <PatientStepFour />;
			default:
				return <PatientStepOne />;
		}
	};

	return <View style={styles.container}>{renderStep()}</View>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	scrollView: {
		flexGrow: 1,
	},
});
