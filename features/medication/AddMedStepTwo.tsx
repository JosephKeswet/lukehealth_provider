import {
	ActivityIndicator,
	Dimensions,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedButton } from "@/components/ThemedButton";
import { Controller, useFieldArray } from "react-hook-form";
import useMedicationController from "@/controllers/useMedicationController";
import { X } from "lucide-react-native"; // or any icon library you prefernpm i
import useHealthStore from "@/store/useHealthStore";

export default function AddMedStepTwo() {
	const { height } = Dimensions.get("window");
	const { control, errors, mutation, trigger } = useMedicationController();
	const { fields, append, remove } = useFieldArray({
		control,
		name: "medicationTimes",
	});

	const addMedicationProgress = useHealthStore(
		(state) => state.addMedicationProgress
	);
	const setAddMedicationProgress = useHealthStore(
		(state) => state.setAddMedicationProgress
	);

	const step2Fields: Parameters<typeof trigger>[0] = [
		"startDate",
		"endDate",
		"prescribingClinic",
	];

	const handleNextStep = () => {
		if (addMedicationProgress < 1) {
			setAddMedicationProgress(addMedicationProgress + 0.5);
		}
	};

	const handleStep2Next = async () => {
		const isStepValid = await trigger(step2Fields);
		if (isStepValid) {
			handleNextStep();
		}
	};

	const handlePreviousStep = () => {
		if (addMedicationProgress > 0) {
			setAddMedicationProgress(addMedicationProgress - 0.5);
		}
	};

	return (
		<TouchableWithoutFeedback
			onPress={Keyboard.dismiss}
			accessible={false}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{ flex: 1 }}
			>
				<ScrollView
					style={styles.container}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ flexGrow: 1, paddingBottom: 400 }}
				>
					<SafeAreaView style={[styles.safeAreaView, { height }]}>
						<ThemedText
							style={{
								fontWeight: "500",
								color: Colors.primary.grey,
								fontSize: 18,
							}}
						>
							Medication Prescription Details
						</ThemedText>
						<View
							style={{
								paddingTop: 24,
								flexDirection: "column",
								gap: 16,
							}}
						>
							<Controller
								control={control}
								name="diagnosis"
								defaultValue=""
								render={({ field: { onChange, onBlur, value } }) => (
									<>
										<ThemedInput
											label="Diagnosis"
											placeholder="E.g Hypertension"
											onBlur={onBlur}
											onChangeText={onChange}
											value={value}
										/>
										{errors.diagnosis && (
											<ThemedText style={styles.errorText}>
												{errors.diagnosis.message}
											</ThemedText>
										)}
									</>
								)}
							/>

							<View
								style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
							>
								{fields.map((field, index) => (
									<View
										key={field.id}
										style={{ marginBottom: 16, position: "relative" }}
									>
										<Controller
											control={control}
											name={`medicationTimes.${index}`}
											render={({ field: { onChange, value } }) => (
												<View style={{ position: "relative" }}>
													<ThemedInput
														label={`Dose Time #${index + 1}`}
														placeholder="HH:MM"
														isTimeInput
														onChangeText={onChange}
														value={value}
													/>

													{fields.length > 1 && (
														<X
															size={16}
															color="#888"
															onPress={() => remove(index)}
															style={{
																position: "absolute",
																top: 20,
																right: -4,
																backgroundColor: "#eee",
																borderRadius: 10,
																padding: 4,
															}}
														/>
													)}
												</View>
											)}
										/>

										{errors.medicationTimes?.[index] && (
											<ThemedText style={styles.errorText}>
												{errors.medicationTimes[index]?.message}
											</ThemedText>
										)}
									</View>
								))}

								<ThemedButton
									title="Add Dose Time"
									onPress={() => append("")}
									style={{ height: "auto" }}
								/>
							</View>

							<Controller
								control={control}
								name="startDate"
								defaultValue=""
								render={({ field: { onChange, onBlur, value } }) => (
									<>
										<ThemedInput
											label="Medication Start Date"
											placeholder="DD/MM/YYYY"
											lightColor="#FFFFFF"
											darkColor="#1A4F55"
											keyboardType="default"
											isDateInput={true}
											onBlur={onBlur}
											onChangeText={onChange}
											value={value}
										/>
										{errors.startDate && (
											<ThemedText style={styles.errorText}>
												{errors.startDate.message}
											</ThemedText>
										)}
									</>
								)}
							/>
							<Controller
								control={control}
								name="endDate"
								defaultValue=""
								render={({ field: { onChange, value } }) => (
									<>
										<ThemedInput
											placeholder="DD/MM/YYYY"
											label="Medication End Date"
											isDateInput
											onChangeText={onChange}
											value={value}
										/>
										{errors.endDate && (
											<ThemedText style={styles.errorText}>
												{errors.endDate.message}
											</ThemedText>
										)}
									</>
								)}
							/>
							<Controller
								control={control}
								name="prescriptionUrl"
								defaultValue=""
								render={({ field: { onChange, onBlur, value } }) => (
									<>
										<ThemedInput
											label="Prescription URL(optional)"
											placeholder="E.g Hypertension"
											onBlur={onBlur}
											onChangeText={onChange}
											keyboardType="url"
											value={value}
										/>
										{errors.prescriptionUrl && (
											<ThemedText style={styles.errorText}>
												{errors.prescriptionUrl.message}
											</ThemedText>
										)}
									</>
								)}
							/>
							<Controller
								control={control}
								name="prescribingClinic"
								defaultValue=""
								render={({ field: { onChange, onBlur, value } }) => (
									<>
										<ThemedInput
											label="Name of prescribing clinic/hospital"
											placeholder="E.g Hypertension"
											onBlur={onBlur}
											onChangeText={onChange}
											value={value}
										/>
										{errors.prescribingClinic && (
											<ThemedText style={styles.errorText}>
												{errors.prescribingClinic.message}
											</ThemedText>
										)}
									</>
								)}
							/>
							{/* <Controller
								control={control}
								name="additionalDetails"
								defaultValue=""
								render={({ field: { onChange, onBlur, value } }) => (
									<>
										<ThemedInput
											label="Additional Details"
											placeholder="E.g Hypertension"
											onBlur={onBlur}
											onChangeText={onChange}
											value={value}
										/>
										{errors.additionalDetails && (
											<ThemedText style={styles.errorText}>
												{errors.additionalDetails.message}
											</ThemedText>
										)}
									</>
								)}
							/> */}
						</View>
						{/* The themed button placed at the bottom */}
						<View style={styles.buttonContainer}>
							<ThemedButton
								title={
									mutation.isPending ? (
										<ActivityIndicator color="white" />
									) : (
										"Next"
									)
								}
								onPress={handleStep2Next}
								lightColor="#3A8289" // Custom color for light theme
								darkColor="#1A4F55" // Custom color for dark theme
								style={styles.button}
								textStyle={styles.buttonText} // Custom text style
							/>
						</View>
						{/* {mutation.isPending && <Loader />} */}
					</SafeAreaView>
				</ScrollView>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	safeAreaView: {
		backgroundColor: "white",
		flex: 1, // This will make the SafeAreaView take the full screen height
	},
	buttonContainer: {
		marginTop: 60, // Added margin to prevent squishing
	},

	button: {
		marginBottom: 20,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "600",
	},
	errorText: {
		color: Colors.error.red,
		fontSize: 12,
	},
	selectBox: {
		borderRadius: 8,
		borderColor: Colors.light.border,
		borderWidth: 1,
		backgroundColor: "transparent", // Set background color to transparent
	},
	labelText: {
		fontSize: 14,
		fontWeight: "400",
		marginBottom: 6,
		color: "black",
	},
});
