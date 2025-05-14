import React, { useEffect, useState } from "react";
import {
	Dimensions,
	Keyboard,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedInput } from "@/components/ThemedInput";
import { GoogleLogoIcon } from "@/constants/icons";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { ISignUp, signUpSchema } from "@/types/auth/payload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCustomMutation } from "@/frameworks/useCustomMutation";
import { signUp } from "@/services/authService";
import useAuth from "@/hooks/mutations/useAuth";
import Loader from "@/components/Loader";
import Toast from "react-native-toast-message";
import * as Google from "expo-auth-session/providers/google";
import { ResponseState } from "@/constants/enums";
import useToast from "@/hooks/useToast";

const GOOGLE_CLIENT_ID = "<YOUR_GOOGLE_CLIENT_ID>"; // Replace with your actual client ID from Google Cloud Console
export default function SignUpScreen() {
	const [request, response, promptAsync] = Google.useAuthRequest({
		clientId: GOOGLE_CLIENT_ID,
	});
	const { toast } = useToast();
	// useEffect(() => {
	// 	handleSignUpWithGoogle();
	// }, [response]);

	// async function handleSignUpWithGoogle() {
	// 	if (response?.type === "success") {
	// 		const { message, state } = await googleAuthSignUp({
	// 			token: response.authentication?.accessToken!,
	// 		});
	// 		if (ResponseState.Success === state) {
	// 			toast({
	// 				text1: message,
	// 				type: "success",
	// 			});
	// 			router.push("/(tabs)");
	// 		}
	// 	} else {
	// 		throw new Error("An error occurred");
	// 	}
	// }
	const { height } = Dimensions.get("window");
	const mutation = useCustomMutation(signUp);
	const { signUpUser } = useAuth(mutation);
	// Initialize react-hook-form with resolver
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ISignUp>({
		resolver: zodResolver(signUpSchema),
	});

	// Form submission handler
	const onSubmit = (data: ISignUp) => {
		// router.push("/verify-email");
		signUpUser(data);
	};

	return (
		<TouchableWithoutFeedback
			onPress={Keyboard.dismiss}
			accessible={false}
		>
			<SafeAreaView style={[styles.safeAreaView, { height }]}>
				<View style={styles.container}>
					<View style={styles.headerContainer}>
						<ThemedText style={styles.headerText}>Create your</ThemedText>
						<ThemedText style={styles.headerText}>Account.</ThemedText>
					</View>

					{/* Input Fields */}
					<View style={styles.inputContainer}>
						{/* First Name */}
						<Controller
							control={control}
							name="firstName"
							defaultValue=""
							render={({ field: { onChange, onBlur, value } }) => (
								<>
									<ThemedInput
										label="First Name"
										placeholder="Enter your first name"
										lightColor="#FFFFFF"
										darkColor="#1A4F55"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
									/>
									{errors.firstName && (
										<ThemedText style={styles.errorText}>
											{errors.firstName.message}
										</ThemedText>
									)}
								</>
							)}
						/>

						{/* Last Name */}
						<Controller
							control={control}
							name="lastName"
							defaultValue=""
							render={({ field: { onChange, onBlur, value } }) => (
								<>
									<ThemedInput
										label="Last Name"
										placeholder="Enter your last name"
										lightColor="#FFFFFF"
										darkColor="#1A4F55"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
									/>
									{errors.lastName && (
										<ThemedText style={styles.errorText}>
											{errors.lastName.message}
										</ThemedText>
									)}
								</>
							)}
						/>

						{/* Email */}
						<Controller
							control={control}
							name="email"
							defaultValue=""
							render={({ field: { onChange, onBlur, value } }) => (
								<>
									<ThemedInput
										label="Email"
										placeholder="Enter your email"
										lightColor="#FFFFFF"
										darkColor="#1A4F55"
										keyboardType="email-address"
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
					</View>

					{/* Separator */}
					{/* <View style={styles.separatorContainer}>
						<View style={styles.line} />
						<Text style={styles.textSeparator}>OR</Text>
						<View style={styles.line} />
					</View> */}

					{/* Google Signup */}
					{/* <View style={styles.googleButtonContainer}>
						<Pressable
							onPress={() => promptAsync()}
							style={styles.googleButton}
						>
							<GoogleLogoIcon />
							<ThemedText style={styles.googleButtonText}>
								Sign up with Google
							</ThemedText>
						</Pressable>
					</View> */}
				</View>

				{/* Register Button */}
				<View style={styles.buttonContainer}>
					<ThemedButton
						title="Register"
						onPress={handleSubmit(onSubmit)}
						lightColor="#3A8289"
						darkColor="#1A4F55"
						style={styles.button}
						textStyle={styles.buttonText}
					/>
				</View>

				{/* Login Redirect */}
				<Pressable onPress={() => router.push("/signin")}>
					<ThemedText style={{ color: "black", textAlign: "center" }}>
						Already have an account?{" "}
						<ThemedText style={{ color: "#00A05B" }}>Login</ThemedText>
					</ThemedText>
				</Pressable>
				{mutation.isPending && <Loader />}
				<Toast />
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
		alignItems: "flex-start",
	},
	headerContainer: {
		paddingHorizontal: 20,
	},
	headerText: {
		fontSize: 30,
		fontWeight: "400",
		lineHeight: 33,
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
		color: "red",
		fontSize: 12,
		marginTop: 4,
	},
	googleButtonContainer: {
		paddingHorizontal: 20,
		width: "100%",
	},
	googleButton: {
		borderWidth: 1,
		borderColor: Colors.light.border,
		height: 48,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 16,
		borderRadius: 32,
	},
	googleButtonText: {
		color: "#111111",
		fontSize: 15,
	},
});
