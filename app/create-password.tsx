import React from "react";
import {
	Dimensions,
	SafeAreaView,
	StyleSheet,
	View,
	Pressable,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedInput } from "@/components/ThemedInput";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Loader from "@/components/Loader";
import { createPasswordSchema, ICreatePassword } from "@/types/auth/payload";
import { useCustomMutation } from "@/frameworks/useCustomMutation";
import { addPassword } from "@/services/authService";
import useAuth from "@/hooks/mutations/useAuth";

export default function CreatePasswordScreen() {
	const { height } = Dimensions.get("window");
	const mutation = useCustomMutation(addPassword);
	const { addUserPassword } = useAuth(mutation);

	// Initialize react-hook-form with validation schema
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ICreatePassword>({
		resolver: zodResolver(createPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	// Form submission handler
	const onSubmit = (data: ICreatePassword) => {
		// router.push("/push-notification");
		addUserPassword({ password: data.password });
		// Perform additional actions like API calls here
	};

	return (
		<TouchableWithoutFeedback
			onPress={Keyboard.dismiss}
			accessible={false}
		>
			<SafeAreaView style={[styles.safeAreaView, { height }]}>
				<View style={styles.container}>
					<View style={styles.headerContainer}>
						<ThemedText style={styles.headerText}>Choose</ThemedText>
						<ThemedText style={styles.headerText}>Password</ThemedText>
					</View>

					<View style={styles.inputContainer}>
						{/* Password Input */}
						<Controller
							control={control}
							name="password"
							defaultValue=""
							render={({ field: { onChange, onBlur, value } }) => (
								<>
									<ThemedInput
										label="Choose your password"
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

						{/* Confirm Password Input */}
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
						title="Proceed"
						onPress={handleSubmit(onSubmit)}
						lightColor="#3A8289"
						darkColor="#1A4F55"
						style={styles.button}
						textStyle={styles.buttonText}
					/>
				</View>

				<Pressable onPress={() => router.push("/signin")}>
					<ThemedText style={{ color: "black", textAlign: "center" }}>
						Already have an account?{" "}
						<ThemedText style={{ color: "#00A05B" }}>Login</ThemedText>
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
	inputContainer: {
		width: "100%",
		paddingHorizontal: 20,
		flexDirection: "column",
		gap: 16,
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
	errorText: {
		color: Colors.error.red,
		fontSize: 12,
	},
});
