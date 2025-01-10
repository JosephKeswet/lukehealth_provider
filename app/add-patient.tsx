import { StyleSheet } from "react-native";
import React from "react";
import PatientStepOne from "@/features/patient/PatientStepOne";
import usePatientStore from "@/store";
import PatientStepTwo from "@/features/patient/PatientStepTwo";

export default function PatientInfoScreen() {
	const patientProgress = usePatientStore((state) => state.patientProgress);

	return (
		<>{patientProgress === 0.5 ? <PatientStepOne /> : <PatientStepTwo />}</>
	);
}

const styles = StyleSheet.create({});
