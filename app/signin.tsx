import React, { useEffect } from "react";
import {
	Dimensions,
	Keyboard,
	Pressable,
	SafeAreaView,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
	Alert,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedInput } from "@/components/ThemedInput";
import { Link, router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { useSignInController } from "@/controllers/useSignInController";
import Loader from "@/components/Loader";

export default function SignInScreen() {
	const { height } = Dimensions.get("window");
	const { control, errors, handleSubmit, mutation, onSubmit } =
		useSignInController();

	useEffect(() => {
		const triggerFaceID = async () => {
			const hasHardware = await LocalAuthentication.hasHardwareAsync();
			const isEnrolled = await LocalAuthentication.isEnrolledAsync();
			if (hasHardware && isEnrolled) {
				const result = await LocalAuthentication.authenticateAsync({
					promptMessage: "Authenticate with Face ID",
					disableDeviceFallback: true,
				});
				console.log(result);

				if (result.success) {
					// Navigate or auto-login logic here
					Alert.alert("Authentication Successful!");
				} else {
					Alert.alert("Authentication Failed", "Please try again.");
				}
			}
		};

		triggerFaceID();
	}, []);

	return (
		<TouchableWithoutFeedback
			onPress={Keyboard.dismiss}
			accessible={false}
		>
			<SafeAreaView style={[styles.safeAreaView, { height }]}>
				<View style={styles.container}>
					<View style={styles.headerContainer}>
						<ThemedText style={styles.headerText}>Welcome</ThemedText>
						<ThemedText style={styles.headerText}>Back.</ThemedText>
					</View>
					<View style={styles.inputContainer}>
						<Controller
							control={control}
							name="email"
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

						{/* Password Input */}
						<Controller
							control={control}
							name="password"
							render={({ field: { onChange, onBlur, value } }) => (
								<>
									<ThemedInput
										label="Password"
										placeholder=""
										lightColor="#FFFFFF"
										darkColor="#1A4F55"
										secureTextEntry
										isPassword
										value={value}
										onBlur={onBlur}
										onChangeText={onChange}
									/>
									{errors.password && (
										<ThemedText style={styles.errorText}>
											{errors.password.message}
										</ThemedText>
									)}
								</>
							)}
						/>
						{/* <Link href="/forgot-password"> */}
						<ThemedText style={styles.forgotPasswordText}>
							Forgot Password?
						</ThemedText>
						{/* </Link> */}
					</View>
				</View>

				{/* Themed button for submission */}
				<View style={styles.buttonContainer}>
					<ThemedButton
						title="Login"
						onPress={handleSubmit(onSubmit)}
						lightColor="#3A8289"
						darkColor="#1A4F55"
						style={styles.button}
						textStyle={styles.buttonText}
					/>
				</View>
				<Pressable onPress={() => router.push("/")}>
					<ThemedText style={{ color: "black", textAlign: "center" }}>
						Don't have an account?{" "}
						<ThemedText style={{ color: "#00A05B" }}>Sign up</ThemedText>
					</ThemedText>
				</Pressable>
				{mutation.isPending && <Loader />}
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	safeAreaView: {
		backgroundColor: "white",
		flex: 1,
	},
	container: {
		paddingTop: 24,
		flex: 1,
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
	buttonContainer: {
		paddingHorizontal: 20,
		marginTop: "auto",
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
	errorText: {
		color: Colors.error.red,
		fontSize: 12,
		marginTop: 4,
	},
	forgotPasswordText: {
		textDecorationLine: "underline",
		color: "#00A05B",
	},
});
