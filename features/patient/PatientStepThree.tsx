import {
	Dimensions,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	Image,
	Pressable,
} from "react-native";
import React, { useState } from "react";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { RadioButton } from "react-native-radio-buttons-group";
import { YesOrNoCategory } from "@/constants/enums";
import useHealthStore from "@/store";
import { ThemedInput } from "@/components/ThemedInput";
import { SelectList } from "react-native-dropdown-select-list";
import { CloseIcon, UploadFileIcon } from "@/constants/icons";
// import CustomInputWithSuggesstion from "../components/CustomInputWithSuggesstion";
import * as ImagePicker from "expo-image-picker"; // For image selection
import { router } from "expo-router";
import usePatientStore from "@/store";
import CustomInputWithSuggesstion from "@/components/CustomInputWithSuggestion";

export default function PatientStepThree() {
	const { height } = Dimensions.get("window");
	const [selectedId, setSelectedId] = useState<string>("");
	const [selected, setSelected] = useState("Nigeria");
	const [inputValue, setInputValue] = useState("");
	const [imageUri, setImageUri] = useState<string | null>(null); // State for storing the selected image
	const [permissionGranted, setPermissionGranted] = useState(false); // State for image picker permission

	const setPatientProgress = usePatientStore(
		(state) => state.setPatientProgress
	);

	const suggestionValues = ["Nuts", "Gluten"];
	const radioOptions = [
		{
			id: YesOrNoCategory.Yes,
			label: YesOrNoCategory.Yes,
		},
		{
			id: YesOrNoCategory.No,
			label: YesOrNoCategory.No,
		},
	];

	const handleInputChange = (text: string) => {
		setInputValue(text);
	};

	const handleChangeCategory = (id: string) => {
		setSelectedId(id);
	};

	const handlePress = () => {
		setPatientProgress(0.8); // Update progress to move to the next step
		// router.push("");
	};

	const handleImagePicker = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		setPermissionGranted(status === "granted");

		if (permissionGranted) {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});

			if (!result.canceled) {
				setImageUri(result.assets[0].uri); // Set the image URI to display the selected picture
			}
		} else {
			alert("Permission to access the media library is required!");
		}
	};

	return (
		<SafeAreaView style={[styles.safeAreaView, { height }]}>
			<View style={styles.container}>
				{/* Custom input fields */}
				<View style={styles.inputContainer}>
					<CustomInputWithSuggesstion
						label="Medical Condition"
						placeholder="E.g Diabetes"
						values={suggestionValues}
						inputValue={inputValue}
						onChange={handleInputChange}
					/>
					<CustomInputWithSuggesstion
						label="Current medications"
						placeholder="E.g Metformin"
						values={suggestionValues}
						inputValue={inputValue}
						onChange={handleInputChange}
					/>
					<CustomInputWithSuggesstion
						label="Allergies"
						placeholder="E.g Lactose"
						values={["Nuts"]}
						inputValue={inputValue}
						onChange={handleInputChange}
					/>
				</View>

				{/* Radio button section */}
				<View style={{ flexDirection: "column", gap: 8 }}>
					<ThemedText style={styles.questionText}>
						Have you taken any herbal medications?
					</ThemedText>
					<View style={styles.radioContainer}>
						{radioOptions.map((option) => (
							<View
								style={styles.radioOption}
								key={option.id}
							>
								<RadioButton
									id={option.id}
									containerStyle={styles.radioButtonContainer}
									borderColor="#3A8289"
									onPress={() => handleChangeCategory(option.id)}
									selected={selectedId === option.id}
									color={Colors.primary.color}
								/>
								<ThemedText style={styles.radioLabel}>
									{option.label}
								</ThemedText>
							</View>
						))}
					</View>
				</View>
				{/* Upload Picture Section */}

				<View style={styles.uploadSection}>
					<ThemedText style={styles.uploadText}>
						Upload Profile Picture
					</ThemedText>
					{imageUri ? (
						<Pressable onPress={handleImagePicker}>
							<Image
								source={{ uri: imageUri }}
								style={styles.uploadedImage}
							/>
						</Pressable>
					) : (
						<Pressable
							onPress={handleImagePicker}
							style={{
								backgroundColor: "#F9F9F9",
								height: 88,
								borderRadius: 6,
								padding: 24,
								flexDirection: "row",
								alignItems: "center",
								gap: 16,
							}}
						>
							<UploadFileIcon />
							<View>
								<ThemedText
									style={{
										fontSize: 12,
										fontWeight: "500",
									}}
								>
									Click here{" "}
									<ThemedText
										style={{
											color: Colors.primary.black,
											fontSize: 12,
										}}
									>
										to upload a picture of your prescription
									</ThemedText>
								</ThemedText>
								<ThemedText
									style={{
										fontSize: 12,
										color: Colors.primary.black,
									}}
								>
									Supported file type: Jpeg, Png Max file size 2mb
								</ThemedText>
							</View>
						</Pressable>
					)}
				</View>
			</View>

			{/* The themed button placed at the bottom */}
			<View style={styles.buttonContainer}>
				<ThemedButton
					title="Next"
					onPress={handlePress}
					lightColor="#3A8289"
					darkColor="#1A4F55"
					style={styles.button}
					textStyle={styles.buttonText}
				/>
			</View>
		</SafeAreaView>
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
		gap: 24,
		alignItems: "flex-start",
	},
	inputContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 16,
		paddingHorizontal: 20,
	},
	uploadSection: {
		width: "100%",
		paddingHorizontal: 20,
		gap: 12,
	},
	uploadText: {
		fontSize: 16,
		color: Colors.primary.black,
	},
	uploadButton: {
		backgroundColor: Colors.primary.hightLightGreen,
	},
	uploadedImage: {
		width: 120,
		height: 120,
		borderRadius: 8,
		marginTop: 12,
	},
	questionText: {
		paddingHorizontal: 20,
		color: Colors.primary.black,
		fontWeight: "400",
	},
	radioContainer: {
		paddingHorizontal: 10,
		flexDirection: "row",
		gap: 24,
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
		marginTop: "auto",
	},
	button: {
		marginBottom: 20,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "600",
	},
});
