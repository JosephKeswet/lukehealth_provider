import {
	ActivityIndicator,
	Dimensions,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React from "react";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ThemedButton } from "@/components/ThemedButton";
import useMedicationController from "@/controllers/useMedicationController";
import { Controller } from "react-hook-form";

export default function AddMedStepThree() {
	const { height } = Dimensions.get("window");
	const { control, errors, handleSubmit, mutation, onSubmit } =
		useMedicationController();
	console.log("erros", errors);
	return (
		<SafeAreaView style={[styles.safeAreaView, { height }]}>
			<ThemedText
				style={{
					fontWeight: "500",
					color: Colors.primary.grey,
					fontSize: 18,
				}}
			>
				Medication Prescription Details{" "}
			</ThemedText>
			<View
				style={{
					paddingTop: 24,
				}}
			>
				<Controller
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
								style={{
									height: 160,
								}}
								isMultiline
							/>
							{errors.additionalDetails && (
								<ThemedText style={styles.errorText}>
									{errors.additionalDetails.message}
								</ThemedText>
							)}
						</>
					)}
				/>
			</View>

			{/* The themed button placed at the bottom */}
			<View style={styles.buttonContainer}>
				<ThemedButton
					title={
						mutation.isPending ? (
							<ActivityIndicator color="white" />
						) : (
							"Continue"
						)
					}
					onPress={handleSubmit(onSubmit)}
					lightColor="#3A8289" // Custom color for light theme
					darkColor="#1A4F55" // Custom color for dark theme
					style={styles.button}
					textStyle={styles.buttonText} // Custom text style
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeAreaView: {
		backgroundColor: "white",
		flex: 1, // This will make the SafeAreaView take the full screen height
	},
	buttonContainer: {
		marginTop: "auto", // Push the button to the bottom of the screen
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
});
