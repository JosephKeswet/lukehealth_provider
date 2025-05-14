import React, { useState, useEffect } from "react";
import {
	SafeAreaView,
	View,
	StyleSheet,
	Pressable,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Image } from "expo-image";
import { Colors } from "@/constants/Colors";
import { ThemedButton } from "@/components/ThemedButton";
import Loader from "@/components/Loader";
import { useCustomMutation } from "@/frameworks/useCustomMutation";
import { resendOtp, verifyEmail } from "@/services/authService";
import useAuth from "@/hooks/mutations/useAuth";
import Toast from "react-native-toast-message";
import { ResponseState } from "@/constants/enums";
import { router } from "expo-router";
import useUserService from "@/services/useUserService";
import useToast from "@/hooks/useToast";
import { useStorage } from "@/hooks/useStorage";
import OtpInput from "@/components/OtpInput";

export default function VerifyEmailScreen() {
	// const { verifyEmail } = useUserService();
	const mutation = useCustomMutation(verifyEmail);
	const { toast } = useToast();
	const { getCookie } = useStorage();
	const { verifyUserEmail } = useAuth(mutation);
	const [otp, setOtp] = useState<string>("");
	const [timer, setTimer] = useState<number>(30);
	const [isCounting, setIsCounting] = useState<boolean>(false); // Controls countdown start
	const [firstName, setFirstName] = useState<string>("");
	async function getName() {
		const firstName = await getCookie("firstName");
		return firstName ? firstName : undefined;
	}
	useEffect(() => {
		async function fetchEmail() {
			const firstName = await getName();
			if (firstName) {
				setFirstName(firstName);
			}
		}
		fetchEmail();
	}, []);

	// Countdown timer effect

	// Countdown effect
	useEffect(() => {
		if (isCounting && timer > 0) {
			const interval = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);

			return () => clearInterval(interval); // Cleanup on unmount
		} else if (timer === 0) {
			setIsCounting(false); // Stop countdown when timer reaches 0
		}
	}, [timer, isCounting]);

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
		verifyUserEmail({ otp });
	};

	async function handleResendOtp() {
		const { message, state } = await resendOtp();

		if (state === ResponseState.Success) {
			toast({
				text1: message,
				type: "success",
			});

			setTimer(30); // Reset timer to 30
			setIsCounting(true); // Start countdown
		} else {
			toast({
				text1: message,
				type: "error",
			});
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<TouchableWithoutFeedback
				onPress={Keyboard.dismiss}
				accessible={false}
			>
				<View>
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
							Hi {firstName}, we’ve sent a One Time Password (OTP) to your
							registered email.
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
								disabled={isCounting} // Disabled only while countdown is active
							/>
						</View>
					</View>

					{mutation.isPending && <Loader />}
				</View>
			</TouchableWithoutFeedback>
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
