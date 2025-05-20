import React, { useState } from "react";
import {
	TextInput,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Platform,
	TextInputProps,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import RBSheet from "react-native-raw-bottom-sheet"; // Import RBSheet
import { Picker } from "@react-native-picker/picker"; // Use the new Picker component
import Icon from "react-native-vector-icons/Feather"; // Import Feather icon for eye icon

interface ThemedInputProps extends TextInputProps {
	lightColor?: string;
	darkColor?: string;
	placeholder: string;
	label?: string;
	onChangeText?: (text: string) => void;
	value?: string;
	isDateInput?: boolean;
	isTimeInput?: boolean; // ✅ Add this line
	isMultiline?: boolean;
	isSelect?: boolean;
	options?: string[];
	isPassword?: boolean;
	error?: string;
}

export function ThemedInput({
	lightColor,
	darkColor,
	placeholder,
	label,
	onChangeText,
	isDateInput = false,
	isMultiline = false,
	isSelect = false, // Default to false
	isTimeInput = false, // <-- add this line
	options = [], // Default to an empty array if no options are provided
	isPassword = false, // New prop for password visibility toggle
	error,
	...otherProps
}: ThemedInputProps) {
	const [isFocused, setIsFocused] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | undefined>();
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [selectedOption, setSelectedOption] = useState<string | undefined>("");
	const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
	const [selectedTime, setSelectedTime] = useState<Date | undefined>(); // ✅ Add this

	const borderColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		"border"
	);

	const bottomSheetRef = React.useRef<any>(null); // Bottom sheet reference

	const handleFocus = () => setIsFocused(true);
	const handleBlur = () => setIsFocused(false);

	// Handle date selection
	const handleDateChange = (event: any, date?: Date) => {
		if (Platform.OS !== "ios") setShowDatePicker(false); // Close picker on Android
		if (date) {
			setSelectedDate(date);
			onChangeText?.(date.toISOString());
		}
	};

	const handleTimeChange = (event: any, date?: Date) => {
		if (Platform.OS !== "ios") setShowDatePicker(false);
		if (date) {
			setSelectedTime(date);
			onChangeText?.(date.toISOString());
		}
	};

	// Handle select option change
	const handleSelectChange = (value: string) => {
		setSelectedOption(value);
		onChangeText?.(value);
		bottomSheetRef.current?.close(); // Close the bottom sheet after selection
	};
	// Handle password visibility toggle
	const togglePasswordVisibility = () => {
		setShowPassword((prevState) => !prevState);
	};

	return (
		<View style={styles.inputContainer}>
			{/* Label */}
			{label && (
				<Text
					style={[
						styles.label,
						{ color: isFocused ? Colors.primary.color : "#2D3648" },
					]}
				>
					{label}
				</Text>
			)}

			{/* Input Field */}
			{isPassword ? (
				<View style={styles.passwordContainer}>
					<TextInput
						{...otherProps}
						placeholder={placeholder}
						placeholderTextColor="#999999"
						secureTextEntry={!showPassword} // Toggle password visibility
						style={[
							styles.input,
							{
								borderColor: isFocused ? Colors.primary.color : "#F6F6F6",
								backgroundColor: isFocused ? "white" : "#F6F6F6",
							},
						]}
						onFocus={handleFocus}
						onBlur={handleBlur}
						onChangeText={onChangeText}
					/>
					<TouchableOpacity
						style={styles.eyeIcon}
						onPress={togglePasswordVisibility} // Toggle password visibility
					>
						<Icon
							name={!showPassword ? "eye-off" : "eye"}
							size={24}
							color="#999"
						/>
					</TouchableOpacity>
				</View>
			) : isDateInput ? (
				<>
					<TouchableOpacity
						style={[
							styles.input,
							{
								borderColor: isFocused ? Colors.primary.color : "#F6F6F6",
								backgroundColor: isFocused ? "white" : "#F6F6F6",
								justifyContent: "center",
							},
						]}
						onPress={() => bottomSheetRef.current?.open()} // Open bottom sheet when pressed
					>
						<Text style={{ color: selectedDate ? "#000" : "#999" }}>
							{selectedDate ? selectedDate.toLocaleDateString() : placeholder}
						</Text>
					</TouchableOpacity>

					{/* Date Picker Bottom Sheet */}
					<RBSheet
						ref={bottomSheetRef} // Use the ref for controlling the bottom sheet
						height={300} // Set the height of the bottom sheet
						openDuration={250} // Animation duration for opening
						customStyles={{
							container: styles.bottomSheetContainer, // Custom styles for the sheet container
						}}
					>
						<View style={styles.modalContent}>
							<RNDateTimePicker
								value={selectedDate || new Date()}
								mode="date"
								display="spinner"
								textColor="black"
								onChange={(event, date) => {
									handleDateChange(event, date);
								}}
							/>
						</View>
					</RBSheet>
				</>
			) : isSelect ? (
				<>
					<TouchableOpacity
						style={[
							styles.input,
							{
								borderColor: isFocused ? Colors.primary.color : "#F6F6F6",
								backgroundColor: isFocused ? "white" : "#F6F6F6",
								justifyContent: "center",
							},
						]}
						onPress={() => bottomSheetRef.current?.open()} // Open bottom sheet when pressed
					>
						<Text style={{ color: selectedOption ? "#000" : "#999" }}>
							{selectedOption || placeholder}
						</Text>
					</TouchableOpacity>

					{/* Select Dropdown Bottom Sheet */}
					<RBSheet
						ref={bottomSheetRef} // Use the ref for controlling the bottom sheet
						height={300} // Set the height of the bottom sheet
						openDuration={250} // Animation duration for opening
						customStyles={{
							container: styles.bottomSheetContainer, // Custom styles for the sheet container
						}}
					>
						<View style={styles.modalContent}>
							<Picker
								selectedValue={selectedOption}
								onValueChange={(itemValue) => handleSelectChange(itemValue)}
								style={styles.picker}
							>
								{options.map((option, index) => (
									<Picker.Item
										key={index}
										label={option}
										value={option}
									/>
								))}
							</Picker>
						</View>
					</RBSheet>
				</>
			) : isTimeInput ? (
				<>
					<TouchableOpacity
						style={[
							styles.input,
							{
								borderColor: isFocused ? Colors.primary.color : "#F6F6F6",
								backgroundColor: isFocused ? "white" : "#F6F6F6",
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								paddingHorizontal: 12,
							},
						]}
						onPress={() => bottomSheetRef.current?.open()}
					>
						<Text style={{ color: selectedTime ? "#000" : "#999" }}>
							{selectedTime
								? selectedTime.toLocaleTimeString([], {
										hour: "numeric",
										minute: "2-digit",
										hour12: true, // ✅ Enables AM/PM format
								  })
								: placeholder}
						</Text>
						<Icon
							name="clock"
							size={20}
							color="#999"
						/>
					</TouchableOpacity>

					<RBSheet
						ref={bottomSheetRef}
						height={300}
						openDuration={250}
						customStyles={{ container: styles.bottomSheetContainer }}
					>
						<View style={styles.modalContent}>
							<RNDateTimePicker
								value={selectedTime || new Date()}
								mode="time" // ✅ Use time mode
								display="spinner"
								textColor="black"
								onChange={(event, date) => {
									handleTimeChange(event, date);
								}}
							/>
						</View>
					</RBSheet>
				</>
			) : (
				<TextInput
					{...otherProps}
					placeholder={placeholder}
					placeholderTextColor="#999999"
					multiline={isMultiline} // Enable multiline for textarea
					numberOfLines={isMultiline ? 4 : 1} // Default height for textarea
					style={[
						styles.input,
						{
							borderColor: isFocused ? Colors.primary.color : "#F6F6F6",
							backgroundColor: isFocused ? "white" : "#F6F6F6",
							height: isMultiline ? 100 : 45, // Dynamic height based on whether it's a textarea or not
						},
					]}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onChangeText={onChangeText}
				/>
			)}
			{error ? <Text style={styles.errorText}>{error}</Text> : null}
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		width: "100%",
	},
	label: {
		fontSize: 14,
		fontWeight: "400",
		marginBottom: 6,
	},
	input: {
		height: 45,
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 12,
		fontSize: 16,
	},
	passwordContainer: {
		// flexDirection: "row",
		// alignItems: "center",
	},
	eyeIcon: {
		position: "absolute",
		right: 12,
		top: 10,
	},
	bottomSheetContainer: {
		padding: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: "white",
	},
	modalContent: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	picker: {
		height: 200,
		width: "100%",
	},
	errorText: {
		color: "red",
		fontSize: 12,
		marginTop: 4,
	},
});
