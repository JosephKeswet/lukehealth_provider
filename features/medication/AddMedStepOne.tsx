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
import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedButton } from "@/components/ThemedButton";
import { Controller } from "react-hook-form";
import useMedicationController from "@/controllers/useMedicationController";
import { SelectList } from "react-native-dropdown-select-list";
import {
	administrationRoutesOptions,
	doseWeightUnits,
	frequencyOfUsageOptions,
} from "@/constants/add-medication";
import useHealthStore from "@/store/useHealthStore";

export default function AddMedStepOne() {
	const { height } = Dimensions.get("window");
	const { control, errors, handleSubmit, mutation, onSubmit, trigger } =
		useMedicationController();

	const addMedicationProgress = useHealthStore(
		(state) => state.addMedicationProgress
	);
	const setAddMedicationProgress = useHealthStore(
		(state) => state.setAddMedicationProgress
	);
	const step1Fields: Parameters<typeof trigger>[0] = [
		"brandName",
		"dose",
		"doseWeightUnit",
		"frequencyOfUsage",
	];

	const handleNextStep = () => {
		if (addMedicationProgress < 1) {
			setAddMedicationProgress(addMedicationProgress + 0.5);
		}
	};
	const handleStep1Next = async () => {
		const isStepValid = await trigger(step1Fields); // ✅ Only validate step 1 fields
		if (isStepValid) {
			handleNextStep(); // ✅ Go to step 2
		} else {
			console.log("Validation failed for step 1");
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
								name="brandName"
								defaultValue=""
								render={({ field: { onChange, onBlur, value } }) => (
									<>
										<ThemedInput
											label="Drug Name (Brand)"
											placeholder="E.g Amartem Softgel"
											keyboardType="default"
											onBlur={onBlur}
											onChangeText={onChange}
											value={value}
										/>
										{errors.brandName && (
											<ThemedText style={styles.errorText}>
												{errors.brandName.message}
											</ThemedText>
										)}
									</>
								)}
							/>
							<Controller
								control={control}
								name="dose"
								defaultValue={0}
								render={({ field: { onChange, onBlur, value } }) => (
									<>
										<ThemedInput
											label="Dose"
											placeholder="E.g Hypertension"
											onBlur={onBlur}
											keyboardType="numeric"
											onChangeText={(text) =>
												onChange(text ? text.toString() : 0)
											}
											value={value ? value.toString() : ""}
										/>
										{errors.dose && (
											<ThemedText style={styles.errorText}>
												{errors.dose.message?.toString()}
											</ThemedText>
										)}
									</>
								)}
							/>
							<View>
								<ThemedText style={styles.labelText}>
									Dose weight unit
								</ThemedText>

								<Controller
									control={control}
									name="doseWeightUnit"
									render={({ field: { onChange, onBlur, value } }) => (
										<>
											<SelectList
												setSelected={(val: any) => {
													onChange(val);
												}}
												data={doseWeightUnits}
												save="value"
												boxStyles={styles.selectBox}
												defaultOption={{
													key: doseWeightUnits[0].key,
													value: doseWeightUnits[0].value,
												}}
											/>
											{errors.doseWeightUnit && (
												<ThemedText style={styles.errorText}>
													{errors.doseWeightUnit.message}
												</ThemedText>
											)}
										</>
									)}
								/>
							</View>
							<View>
								<ThemedText style={styles.labelText}>
									Frequency of Usage
								</ThemedText>

								<Controller
									control={control}
									name="frequencyOfUsage"
									render={({ field: { onChange, onBlur, value } }) => (
										<>
											<SelectList
												setSelected={(val: any) => {
													onChange(val);
												}}
												data={frequencyOfUsageOptions}
												save="value"
												boxStyles={styles.selectBox}
												defaultOption={{
													key: frequencyOfUsageOptions[0].key,
													value: frequencyOfUsageOptions[0].value,
												}}
											/>
											{errors.frequencyOfUsage && (
												<ThemedText style={styles.errorText}>
													{errors.frequencyOfUsage.message}
												</ThemedText>
											)}
										</>
									)}
								/>
							</View>
							<View>
								<ThemedText style={styles.labelText}>
									Administration Route
								</ThemedText>

								<Controller
									control={control}
									name="administrationRoute"
									render={({ field: { onChange, onBlur, value } }) => (
										<>
											<SelectList
												setSelected={(val: any) => {
													onChange(val);
												}}
												data={administrationRoutesOptions}
												save="value"
												boxStyles={styles.selectBox}
												defaultOption={{
													key: administrationRoutesOptions[0].key,
													value: administrationRoutesOptions[0].value,
												}}
											/>
											{errors.administrationRoute && (
												<ThemedText style={styles.errorText}>
													{errors.administrationRoute.message}
												</ThemedText>
											)}
										</>
									)}
								/>
							</View>
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
								onPress={handleStep1Next}
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
		marginTop: 100, // Added margin to prevent squishing
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
