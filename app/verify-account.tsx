import React, { useState, useEffect } from "react";
import { SafeAreaView, View, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Image } from "expo-image";
import { Colors } from "@/constants/Colors";
import OtpInput from "@/components/OtpInput";
import { ThemedButton } from "@/components/ThemedButton";
import Loader from "@/components/Loader";
import { useCustomMutation } from "@/frameworks/useCustomMutation";
import {
	resendOtp,
	resetPasswordVerification,
	verifyEmail,
} from "@/services/authService";
import useAuth from "@/hooks/mutations/useAuth";
import { ResponseState } from "@/constants/enums";
import { router, useLocalSearchParams } from "expo-router";
import useUserService from "@/services/useUserService";
import useToast from "@/hooks/useToast";

export default function VerifyAccountScreen() {
	// const { verifyEmail } = useUserService();
	const mutation = useCustomMutation(resetPasswordVerification);
	const params = useLocalSearchParams();
	const { toast } = useToast();
	const email: any = params.email;
	// console.log("params", typeof params.email);
	const { verifyUserAccount } = useAuth(mutation);
	const [otp, setOtp] = useState<string>("");
	const [timer, setTimer] = useState<number>(30);

	// Countdown timer effect
	useEffect(() => {
		if (timer > 0) {
			const interval = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
			return () => clearInterval(interval); // Cleanup interval on unmount
		}
	}, [timer]);

	// Format timer into MM:SS
	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
			2,
			"0"
		)}`;
	};

	const handleOtpChange = (otp: string) => {
		setOtp(otp);
	};

	const handleOtpComplete = (otp: string) => {
		// router.push("/create-password");
		verifyUserAccount({ otp, email }, { route: "/reset-password" });
	};

	async function handleResendOtp() {
		const { message, state } = await resendOtp();
		const response = await resendOtp();
		console.log(response);

		if (state === ResponseState.Success) {
			toast({
				text1: message,
				type: "success",
			});
			setTimer(30); // Reset timer
		} else {
			toast({
				text1: message,
				type: "error",
			});
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					marginTop: 24,
				}}
			>
				<ThemedText style={styles.headerText}>Verify Your</ThemedText>
				<ThemedText style={styles.headerText}>Account</ThemedText>
			</View>

			<View style={styles.content}>
				<View style={styles.imageContainer}>
					<Image
						source={require("../assets/images/verify-mail.png")}
						contentFit="cover"
						transition={1000}
						style={styles.image}
					/>
				</View>

				<ThemedText style={styles.otpSentText}>OTP sent to mail</ThemedText>
				<ThemedText style={styles.instructionText}>
					Hi Sean, we’ve sent a One Time Password (OTP) to your registered
					email.
				</ThemedText>

				<View style={styles.otpInputContainer}>
					<OtpInput
						length={4}
						onChange={handleOtpChange}
						onComplete={handleOtpComplete}
					/>
				</View>

				{/* Display countdown timer */}
				<ThemedText style={styles.timer}>{formatTime(timer)}</ThemedText>

				<ThemedText style={styles.resendText}>
					Didn’t receive an email?
				</ThemedText>

				<View style={styles.resendButtonContainer}>
					<ThemedButton
						title="Resend OTP"
						style={styles.resendButton}
						onPress={handleResendOtp}
						disabled={timer > 0} // Disable button while timer is active
					/>
				</View>
			</View>

			{mutation.isPending && <Loader />}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	headerText: {
		textAlign: "center",
		fontSize: 30,
		fontWeight: "400",
		lineHeight: 33,
	},
	content: {
		paddingHorizontal: 20,
	},
	imageContainer: {
		flexDirection: "row",
		justifyContent: "center",
		paddingVertical: 20,
	},
	image: {
		width: 140,
		height: 140,
	},
	otpSentText: {
		textAlign: "center",
		fontSize: 20,
		fontWeight: "500",
		lineHeight: 28,
		marginTop: 10,
		color: Colors.primary.black,
	},
	instructionText: {
		textAlign: "center",
		fontSize: 15,
		fontWeight: "500",
		lineHeight: 22,
		marginTop: 10,
		color: "#666666",
	},
	otpInputContainer: {
		paddingVertical: 20,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	timer: {
		textAlign: "center",
		fontSize: 13,
		lineHeight: 18,
		color: "red", // Optional styling for the timer
	},
	resendText: {
		textAlign: "center",
		fontSize: 13,
		lineHeight: 18,
		color: "#666666",
		paddingVertical: 20,
	},
	resendButtonContainer: {
		flexDirection: "row",
		justifyContent: "center",
	},
	resendButton: {
		width: 200,
	},
});
