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
import { ThemedInput } from "@/components/ThemedInput";
import { SelectList } from "react-native-dropdown-select-list";
import { CloseIcon, UploadFileIcon } from "@/constants/icons";
// import CustomInputWithSuggesstion from "../components/CustomInputWithSuggesstion";
import * as ImagePicker from "expo-image-picker"; // For image selection
import { router } from "expo-router";
import CustomInputWithSuggesstion from "@/components/CustomInputWithSuggestion";
import { z } from "zod";
import { useAddPatientStore } from "@/store/usAddPatientStore";
import {
	bloodGroupData,
	genotypeData,
	lifeStyleConditionsData,
} from "@/constants/patient";
import { useCustomMutation } from "@/frameworks/useCustomMutation";
import usePatientService from "@/services/usePatientService";
import usePatient from "@/hooks/mutations/usePatient";
import Loader from "@/components/Loader";
import usePatientStore from "@/store/usePatientStore";

// Define the Zod schema for validation
const patientSchema = z.object({
	weight: z
		.string()
		.min(1, "Weight is required")
		.refine((w) => !isNaN(Number(w)) && Number(w) > 0, {
			message: "Weight must be a positive number",
		}),
	bloodGroup: z.string().min(1, "Blood group is required"),
	genoType: z.string().min(1, "Genotype is required"),
	lifestyleConditions: z.string().min(1, "Lifestyle condition is required"),
	takenHerbalMedications: z.boolean({
		required_error: "Please indicate if you've taken herbal medications",
	}),
	dailyExercise: z.boolean({
		required_error: "Please indicate if you exercise daily",
	}),
	// Uncomment these if CustomInputWithSuggestion fields are added back
	// medicalCondition: z.string().optional(),
	// currentMedications: z.string().optional(),
	// allergies: z.string().optional(),
});

export default function PatientStepTwo() {
	const { height } = Dimensions.get("window");
	const [selectedId, setSelectedId] = useState<string>("");
	const [selected, setSelected] = useState("Nigeria");
	const [inputValue, setInputValue] = useState("");
	const [imageUri, setImageUri] = useState<string | null>(null); // State for storing the selected image
	const [permissionGranted, setPermissionGranted] = useState(false); // State for image picker permission
	const [errors, setErrors] = useState<Record<string, string>>({});
	const { onboardPatient } = usePatientService();
	const mutation = useCustomMutation(onboardPatient);
	const { onboardNewPatient } = usePatient(mutation);

	const { patient, updateField } = useAddPatientStore();

	const setPatientProgress = usePatientStore(
		(state) => state.setPatientProgress
	);

	const suggestionValues = ["Nuts", "Gluten"];
	const radioOptionsHerbalMed = [
		{
			id: YesOrNoCategory.Yes,
			label: YesOrNoCategory.Yes,
		},
		{
			id: YesOrNoCategory.No,
			label: YesOrNoCategory.No,
		},
	];

	const radioOptionsDailyExercise = [
		{
			id: YesOrNoCategory.Yes,
			label: YesOrNoCategory.Yes,
		},
		{
			id: YesOrNoCategory.No,
			label: YesOrNoCategory.No,
		},
	];

	const [selectedHerbalMed, setSelectedHerbalMed] = useState<string>("");
	const [selectedDailyExercise, setSelectedDailyExercise] =
		useState<string>("");

	const handleHerbalMedChange = (id: string) => {
		setSelectedHerbalMed(id);
		if (id === "Yes") {
			updateField("takenHerbalMedications", true); // Update correct field in your store
		} else {
			updateField("takenHerbalMedications", false); // Update correct field in your store
		}
		setErrors((prevErrors) => {
			if (prevErrors.herbalMedication) {
				const newErrors = { ...prevErrors };
				delete newErrors.herbalMedication;
				return newErrors;
			}
			return prevErrors;
		});
	};

	const handleDailyExerciseChange = (id: string) => {
		setSelectedDailyExercise(id);
		if (id === "Yes") {
			updateField("dailyExercise", true); // Update correct field in your store
		} else {
			updateField("dailyExercise", false); // Update correct field in your store
		}
		setErrors((prevErrors) => {
			if (prevErrors.dailyExercise) {
				const newErrors = { ...prevErrors };
				delete newErrors.dailyExercise;
				return newErrors;
			}
			return prevErrors;
		});
	};

	const handlePress = () => {
		const result = patientSchema.safeParse(patient);
		if (!result.success) {
			// Map errors to display
			const fieldErrors: Record<string, string> = {};
			for (const err of result.error.errors) {
				if (err.path.length > 0) {
					fieldErrors[err.path[0]] = err.message;
				}
			}
			setErrors(fieldErrors);
			return; // Stop progress
		}

		// Clear errors if valid
		setErrors({});
		onboardNewPatient(patient);
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

	const handleInputChange = (field: keyof typeof patient, value: string) => {
		updateField(field, value);
		setErrors((prevErrors) => {
			if (prevErrors[field]) {
				const newErrors = { ...prevErrors };
				delete newErrors[field]; // Remove error for this field
				return newErrors;
			}
			return prevErrors;
		});
	};

	return (
		<SafeAreaView style={[styles.safeAreaView, { height }]}>
			<View style={styles.container}>
				{/* Custom input fields */}
				<View style={styles.inputContainer}>
					<ThemedInput
						label="Weight"
						placeholder="In Kilograms(kg)"
						lightColor="#FFFFFF"
						darkColor="#1A4F55"
						keyboardType="number-pad"
						value={patient.weight}
						onChangeText={(text) => handleInputChange("weight", text)}
						error={errors.weight}
					/>
					<View>
						<ThemedText style={styles.labelText}>Blood group</ThemedText>
						<SelectList
							setSelected={(val: any) => {
								setSelected(val);
								updateField("bloodGroup", val);
							}}
							data={bloodGroupData}
							save="value"
							boxStyles={styles.selectBox}
							defaultOption={{ key: "1", value: "Group A" }}
						/>
						{errors.bloodGroup && (
							<ThemedText style={styles.errorText}>
								{errors.bloodGroup}
							</ThemedText>
						)}
					</View>

					<View>
						<ThemedText style={styles.labelText}>Genotype</ThemedText>
						<SelectList
							setSelected={(val: any) => {
								setSelected(val);
								updateField("genoType", val);
							}}
							data={genotypeData}
							save="value"
							boxStyles={styles.selectBox}
							defaultOption={{ key: "1", value: "AA" }}
						/>
						{errors.genoType && (
							<ThemedText style={styles.errorText}>
								{errors.genoType}
							</ThemedText>
						)}
					</View>
					<View>
						<ThemedText style={styles.labelText}>
							Lifestyle Conditions
						</ThemedText>
						<SelectList
							setSelected={(val: any) => {
								setSelected(val);
								updateField("lifestyleConditions", val);
							}}
							data={lifeStyleConditionsData}
							save="value"
							boxStyles={styles.selectBox}
							defaultOption={{
								key: lifeStyleConditionsData[0].label,
								value: lifeStyleConditionsData[0].value,
							}}
						/>
						{errors.lifeStyleConditionsData && (
							<ThemedText style={styles.errorText}>
								{errors.lifeStyleConditionsData}
							</ThemedText>
						)}
					</View>

					{/* <CustomInputWithSuggesstion
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
					/> */}
				</View>

				{/* Radio button section */}
				<View style={{ flexDirection: "column", gap: 8 }}>
					<ThemedText style={styles.questionText}>
						Have you taken any herbal medications?
					</ThemedText>
					<View style={styles.radioContainer}>
						{radioOptionsHerbalMed.map((option) => (
							<View
								style={styles.radioOption}
								key={option.id}
							>
								<RadioButton
									id={option.id}
									containerStyle={styles.radioButtonContainer}
									borderColor="#3A8289"
									onPress={() => handleHerbalMedChange(option.id)}
									selected={selectedHerbalMed === option.id}
									color={Colors.primary.color}
								/>
								<ThemedText style={styles.radioLabel}>
									{option.label}
								</ThemedText>
							</View>
						))}
					</View>
				</View>
				<View style={{ flexDirection: "column", gap: 8 }}>
					<ThemedText style={styles.questionText}>Daily Exercise?</ThemedText>
					<View style={styles.radioContainer}>
						{radioOptionsDailyExercise.map((option) => (
							<View
								style={styles.radioOption}
								key={option.id}
							>
								<RadioButton
									id={option.id}
									containerStyle={styles.radioButtonContainer}
									borderColor="#3A8289"
									onPress={() => handleDailyExerciseChange(option.id)}
									selected={selectedDailyExercise === option.id}
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

				{/* <View style={styles.uploadSection}>
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
				</View> */}
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
			{mutation.isPending && <Loader />}
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
	labelText: {
		fontSize: 14,
		fontWeight: "400",
		marginBottom: 6,
	},
	selectBox: {
		borderRadius: 8,
		borderColor: Colors.light.border,
		borderWidth: 1,
		backgroundColor: "transparent",
	},
	errorText: {
		color: "red",
		fontSize: 12,
		paddingHorizontal: 20,
		marginTop: 4,
	},
});
