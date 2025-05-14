import React, { useState } from "react";
import {
	Dimensions,
	Keyboard,
	SafeAreaView,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedInput } from "@/components/ThemedInput";
import { router, useLocalSearchParams } from "expo-router";
import useResetPassController from "@/controllers/useResetPassController";
import { Controller } from "react-hook-form";
import Loader from "@/components/Loader";

export default function ResetPasswordScreen() {
	const { height } = Dimensions.get("window");

	// Handle the change of input value
	const { control, handleSubmit, errors, onSubmit, isPending } =
		useResetPassController();

	return (
		<TouchableWithoutFeedback
			onPress={Keyboard.dismiss}
			accessible={false}
		>
			<SafeAreaView style={[styles.safeAreaView, { height }]}>
				<View style={styles.container}>
					<View style={styles.headerContainer}>
						<ThemedText
							type="defaultSemiBold"
							style={styles.headerText}
						>
							Reset Password
						</ThemedText>
						<ThemedText style={styles.instructionText}>
							Select a new password
						</ThemedText>
					</View>
					<View style={styles.inputContainer}>
						<Controller
							control={control}
							name="password"
							defaultValue=""
							render={({ field: { onChange, onBlur, value } }) => (
								<>
									<ThemedInput
										label="New password"
										placeholder=""
										lightColor="#FFFFFF"
										darkColor="#1A4F55"
										keyboardType="default"
										secureTextEntry
										isPassword
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
									/>
									{errors.password && (
										<ThemedText style={styles.errorText}>
											{errors.password.message}
										</ThemedText>
									)}
								</>
							)}
						/>
					</View>
					<View style={styles.inputContainer}>
						<Controller
							control={control}
							name="confirmPassword"
							defaultValue=""
							render={({ field: { onChange, onBlur, value } }) => (
								<>
									<ThemedInput
										label="Confirm password"
										placeholder=""
										lightColor="#FFFFFF"
										darkColor="#1A4F55"
										keyboardType="default"
										secureTextEntry
										isPassword
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
									/>
									{errors.confirmPassword && (
										<ThemedText style={styles.errorText}>
											{errors.confirmPassword.message}
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
						title="Submit"
						onPress={handleSubmit(onSubmit)}
						lightColor="#3A8289" // Custom color for light theme
						darkColor="#1A4F55" // Custom color for dark theme
						style={styles.button}
						textStyle={styles.buttonText} // Custom text style
					/>
				</View>
				{isPending && <Loader />}
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	safeAreaView: {
		backgroundColor: "white",
		flex: 1, // This will make the SafeAreaView take the full screen height
	},
	container: {
		paddingTop: 24,
		flex: 1, // Take up remaining space between header and button
		flexDirection: "column",
		gap: 32,
		alignItems: "center",
	},
	headerContainer: {
		paddingHorizontal: 20,
	},
	headerText: {
		fontSize: 20,
		fontWeight: "500",
		lineHeight: 28,
		textAlign: "center",
	},
	instructionText: {
		textAlign: "center",
		fontSize: 15,
		fontWeight: "400",
		lineHeight: 22,
		marginTop: 5,
		color: "#666666",
		paddingHorizontal: 20,
	},
	radioContainer: {
		paddingHorizontal: 10,
		flexDirection: "column",
		gap: 6,
	},
	radioOption: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
	},
	radioButtonContainer: {
		padding: 0,
		margin: 0,
	},
	radioLabel: {
		fontSize: 16,
		fontWeight: "400",
		lineHeight: 20,
	},
	buttonContainer: {
		paddingHorizontal: 20,
		marginTop: "auto", // Push the button to the bottom of the screen
	},
	button: {
		marginBottom: 20,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "600",
	},
	inputContainer: {
		width: "100%",
		paddingHorizontal: 20,
		flexDirection: "column",
		gap: 16,
	},
	separatorContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 10,
		paddingHorizontal: 20,
	},
	line: {
		flex: 1,
		height: 1,
		backgroundColor: "#E8E8E8", // Light gray line
	},
	textSeparator: {
		marginHorizontal: 10,
		fontSize: 13,
		color: "#999999", // Color for the "OR" text
		fontWeight: "600",
	},
	errorText: {
		color: Colors.error.red,
		fontSize: 12,
	},
});
