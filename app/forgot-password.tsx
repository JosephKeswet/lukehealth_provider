import React, { useState } from "react";
import {
	Dimensions,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { RadioButton } from "react-native-radio-buttons-group";
import { Colors } from "@/constants/Colors";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedInput } from "@/components/ThemedInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GoogleLogoIcon } from "@/constants/icons";
import { Link, router } from "expo-router";
import useForgotPassController from "@/controllers/useForgotPassController";
import { Controller } from "react-hook-form";
import Loader from "@/components/Loader";

export default function ForgotPasswordScreen() {
	const { height } = Dimensions.get("window");
	const { control, handleSubmit, errors, onSubmit, isPending } =
		useForgotPassController();

	return (
		<SafeAreaView style={[styles.safeAreaView, { height }]}>
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<ThemedText
						type="defaultSemiBold"
						style={styles.headerText}
					>
						Forgot Password?
					</ThemedText>
					<ThemedText style={styles.instructionText}>
						We will send a one time password to your email and phone number to
						help you reset your password.
					</ThemedText>
				</View>
				<View style={styles.inputContainer}>
					<Controller
						control={control}
						name="email"
						defaultValue=""
						render={({ field: { onChange, onBlur, value } }) => (
							<>
								<ThemedInput
									label="Email Address"
									placeholder=""
									lightColor="#FFFFFF"
									darkColor="#1A4F55"
									keyboardType="default"
									autoCapitalize="none"
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
								/>
								{errors.email && (
									<ThemedText style={styles.errorText}>
										{errors.email.message}
									</ThemedText>
								)}
							</>
						)}
					/>
					{/* The themed button placed at the bottom */}
					<View style={[styles.buttonContainer]}>
						<ThemedButton
							title="Submit"
							onPress={handleSubmit(onSubmit)}
							lightColor="#3A8289" // Custom color for light theme
							darkColor="#1A4F55" // Custom color for dark theme
							style={styles.button}
							textStyle={styles.buttonText} // Custom text style
						/>
					</View>
					<Pressable>
						<ThemedText style={{ color: "black", textAlign: "center" }}>
							Remember password?{" "}
							<ThemedText
								style={{
									color: "#00A861",
								}}
							>
								<Link href="/signin">Login</Link>
							</ThemedText>
						</ThemedText>
					</Pressable>
				</View>
			</View>

			{isPending && <Loader />}
		</SafeAreaView>
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
		// alignItems: "center",
	},
	headerText: {
		fontSize: 20,
		fontWeight: "500",
		lineHeight: 22,
		textAlign: "center",
	},
	instructionText: {
		textAlign: "center",
		fontSize: 15,
		fontWeight: "400",
		lineHeight: 22,
		marginTop: 10,
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
		// paddingHorizontal: 20,
		// marginTop: "auto", // Push the button to the bottom of the screen
		marginTop: 20,
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

	disabledButton: {
		backgroundColor: "#A0A0A0",
	},
});
