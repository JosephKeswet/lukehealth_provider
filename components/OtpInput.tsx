import { Colors } from "@/constants/Colors";
import React, { useState, useRef } from "react";
import {
	View,
	TextInput,
	StyleSheet,
	TextInputProps,
	Keyboard,
} from "react-native";

interface OtpInputProps {
	length: number; // Length of OTP (e.g., 6)
	onChange: (otp: string) => void; // Callback when OTP changes
	onComplete: (otp: string) => void; // Callback when OTP is fully entered
}

const OtpInput: React.FC<OtpInputProps> = ({
	length,
	onChange,
	onComplete,
}) => {
	const [otp, setOtp] = useState(Array(length).fill("")); // Store OTP value
	const [activeIndex, setActiveIndex] = useState<number | null>(null); // Track the active input field
	const [focusedIndex, setFocusedIndex] = useState<number | null>(null); // Track the focused input field
	const inputs = useRef<Array<TextInput | null>>([]); // Store references to TextInputs

	const handleChangeText = (value: string, index: number) => {
		if (value.length > 1) {
			handlePaste(value); // Handle paste if user pastes the OTP
			return;
		}
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		// Call onChange callback with updated OTP
		const otpString = newOtp.join("");
		onChange(otpString);

		// Move to next input automatically if the input is filled
		if (value && index < length - 1) {
			inputs.current[index + 1]?.focus();
		}

		// Move to previous input if empty
		if (!value && index > 0) {
			inputs.current[index - 1]?.focus();
		}

		// If OTP is fully entered, call onComplete
		if (newOtp.every((digit) => digit !== "") && otpString.length === length) {
			onComplete(otpString);
		}
	};

	const handleKeyPress = (event: any, index: number) => {
		if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
			inputs.current[index - 1]?.focus(); // Focus previous input
		}
	};

	const handlePaste = (value: string) => {
		const pastedOtp = value.split("").slice(0, length); // Handle paste for OTP length
		const newOtp = [...otp];
		for (let i = 0; i < pastedOtp.length; i++) {
			newOtp[i] = pastedOtp[i];
		}
		setOtp(newOtp);

		// Call onChange callback with updated OTP
		const otpString = newOtp.join("");
		onChange(otpString);

		// Focus the last filled input
		const lastIndex = pastedOtp.length - 1;
		if (lastIndex < length) {
			inputs.current[lastIndex]?.focus();
		}

		// If OTP is fully entered, call onComplete
		if (newOtp.every((digit) => digit !== "") && otpString.length === length) {
			onComplete(otpString);
		}
	};

	const handleFocus = (index: number) => {
		setFocusedIndex(index); // Set focused index to remove dot on focus

		// Set active state if the input contains a digit
		if (otp[index] !== "") {
			setActiveIndex(index); // Keep active state if digit exists
		} else {
			setActiveIndex(index); // If empty, set active state as well
		}
	};

	const handleBlur = () => {
		// Reset active state only if the field is empty and unfocused
		if (otp[focusedIndex || 0] === "") {
			setActiveIndex(null); // Reset active index when input loses focus and is empty
		}
		setFocusedIndex(null); // Reset focused index
	};

	const renderDot = (index: number) => {
		// Only render a dot if the input is empty and not focused
		if (otp[index] === "" && focusedIndex !== index) {
			return <View style={styles.dot} />;
		}
		return null;
	};

	return (
		<View style={styles.container}>
			{otp.map((value, index) => (
				<View
					key={index}
					style={styles.inputContainer}
				>
					<TextInput
						style={[
							styles.input,
							{
								borderColor:
									otp[index] !== "" || focusedIndex === index
										? Colors.primary.color // Active border if input has digit or is focused
										: "#ccc", // Default border color
							},
						]}
						value={value}
						onChangeText={(text) => handleChangeText(text, index)}
						onKeyPress={(event) => handleKeyPress(event, index)}
						keyboardType="number-pad"
						maxLength={1}
						ref={(ref) => {
							inputs.current[index] = ref;
						}}
						// Store the input reference
						onFocus={() => handleFocus(index)} // Handle focus
						onBlur={handleBlur} // Handle blur
					/>
					{renderDot(index)}
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		// justifyContent: "space-between",
		gap: 8,
	},
	inputContainer: {
		position: "relative",
	},
	input: {
		width: 50,
		height: 50,
		borderWidth: 1,
		borderRadius: 8,
		textAlign: "center",
		fontSize: 18,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
	},
	dot: {
		position: "absolute",
		top: "50%", // Center the dot vertically
		left: "50%", // Center the dot horizontally
		width: 12, // Smaller dot size
		height: 12, // Smaller dot size
		borderRadius: 6, // Make it circular
		backgroundColor: "#D3D3D3", // Lighter dot color
		transform: [{ translateX: -6 }, { translateY: -6 }], // Offset to truly center the dot
	},
});

export default OtpInput;
