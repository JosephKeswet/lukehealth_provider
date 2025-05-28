import {
	ActivityIndicator,
	Dimensions,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useState } from "react";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { RadioButton } from "react-native-radio-buttons-group";
import { router } from "expo-router";
import { GenderCategory } from "@/constants/enums";
import { ThemedInput } from "@/components/ThemedInput";
import { SelectList } from "react-native-dropdown-select-list";
import { useAddPatientStore } from "@/store/usAddPatientStore";
import {
	bloodGroupData,
	genotypeData,
	statesInNigeria,
} from "@/constants/patient";
import { z } from "zod";
import usePatientService from "@/services/usePatientService";
import { useCustomQuery } from "@/frameworks/useCustomQuery";
import { apiRoutes } from "@/constants/api";
import { useCustomMutation } from "@/frameworks/useCustomMutation";
import usePatient from "@/hooks/mutations/usePatient";
import Loader from "@/components/Loader";
import usePatientStore from "@/store/usePatientStore";

// Define the Zod schema for validation
const patientSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email address"),
	stateOfResidence: z.string().min(1, "State of residence is required"),
	address: z.string().min(1, "Address is required"),
	gender: z.enum([GenderCategory.Male, GenderCategory.Female], {
		errorMap: () => ({ message: "Gender must be selected" }),
	}),
	dateOfBirth: z
		.string()
		.min(1, "Date of birth is required")
		.refine(
			(date) => {
				// Basic YYYY-MM-DD validation with regex
				return /^\d{4}-\d{2}-\d{2}$/.test(date);
			},
			{ message: "Date of birth must be in YYYY-MM-DD format" }
		),
	prescribingDoctorContact: z.string().optional(),
	emergencyContact: z.string().optional(),

	// .regex(/^(?:\+234|0)[789][01]\d{8}$/, "Invalid Nigerian contact number"),
	// weight: z
	// 	.string()
	// 	.min(1, "Weight is required")
	// 	.refine((w) => !isNaN(Number(w)) && Number(w) > 0, {
	// 		message: "Weight must be a positive number",
	// 	}),
	// bloodGroup: z.string().min(1, "Blood group is required"),
	// genoType: z.string().min(1, "Genotype is required"),
});

export default function PatientStepOne() {
	const { height } = Dimensions.get("window");
	const [selectedId, setSelectedId] = useState<string>("");
	const [selected, setSelected] = useState("Nigeria");
	const { patient, updateField } = useAddPatientStore();
	const { searchPatient, addPatient } = usePatientService();
	const { data, isPending: isSearchingPatient } = useCustomQuery({
		queryFn: () =>
			searchPatient({ fullName: patient.fullName, email: patient.email }),
		queryKey: [apiRoutes.patients.search_patient, patient.firstName],
		enabled: patient.fullName.length > 0 && patient.email.length > 0, // Only run when both are available
	});

	const mutation = useCustomMutation(addPatient);
	const { addNewPatient } = usePatient(mutation);

	const searchedPatient = data?.data ?? undefined;
	const setPatientProgress = usePatientStore(
		(state) => state.setPatientProgress
	);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleInputChange = (field: keyof typeof patient, value: string) => {
		if (field === "dateOfBirth") {
			// Try to parse the date and convert to YYYY-MM-DD format
			const date = new Date(value);

			if (!isNaN(date.getTime())) {
				// Format date as YYYY-MM-DD
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
				const day = String(date.getDate()).padStart(2, "0");

				value = `${year}-${month}-${day}`;
			} else {
				// If invalid date, keep as is or clear
				value = "";
			}
		}
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

	const handleChangeCategory = (id: string) => {
		setSelectedId(id);
		updateField("gender", id);
		setErrors((prevErrors) => {
			if (prevErrors.gender) {
				const newErrors = { ...prevErrors };
				delete newErrors.gender;
				return newErrors;
			}
			return prevErrors;
		});
	};

	const handlePress = () => {
		// Validate patient object on submit
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
		setPatientProgress(0.8); // move to next step
	};

	const radioOptions = [
		{
			id: GenderCategory.Male,
			label: GenderCategory.Male,
		},
		{
			id: GenderCategory.Female,
			label: GenderCategory.Female,
		},
	];

	return (
		<SafeAreaView style={[styles.safeAreaView, { height }]}>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.container}>
					<View style={styles.inputContainer}>
						<ThemedInput
							label="First Name"
							placeholder=""
							lightColor="#FFFFFF"
							darkColor="#1A4F55"
							keyboardType="default"
							value={patient.firstName}
							onChangeText={(text) => handleInputChange("firstName", text)}
							error={errors.firstName}
						/>
						<ThemedInput
							label="Last Name"
							placeholder=""
							lightColor="#FFFFFF"
							darkColor="#1A4F55"
							keyboardType="default"
							value={patient.lastName}
							onChangeText={(text) => handleInputChange("lastName", text)}
							error={errors.lastName}
						/>
						<ThemedInput
							label="Email"
							placeholder=""
							lightColor="#FFFFFF"
							darkColor="#1A4F55"
							keyboardType="email-address"
							value={patient.email}
							onChangeText={(text) => handleInputChange("email", text)}
							error={errors.email}
						/>

						{isSearchingPatient ? (
							<View
								style={{
									padding: 20,
									justifyContent: "center",
									alignItems: "center",
									borderColor: "#F5F5F5",
									borderWidth: 1,
									borderRadius: 8,
								}}
							>
								<Loader size="small" />
							</View>
						) : searchedPatient ? (
							<View
								style={{
									padding: 20,
									borderColor: "#F5F5F5",
									borderWidth: 1,
									borderRadius: 8,
								}}
							>
								{/* Existing content rendering searchedPatient */}
								<View style={{ flexDirection: "row" }}>
									<View>
										<ThemedText
											style={{
												fontSize: 16,
												color: "#717171",
												fontWeight: "500",
											}}
										>
											{searchedPatient.fullName}
										</ThemedText>
										<View style={{ flexDirection: "row", gap: 20 }}>
											<ThemedText
												style={{
													fontSize: 11,
													color: "#808080",
													fontWeight: "500",
												}}
											>
												{searchedPatient.email}
											</ThemedText>
											<View
												style={{
													alignItems: "center",
													justifyContent: "center",
													height: 20,
													width: 50,
													backgroundColor: "#ECFCE5",
													borderRadius: 32,
												}}
											>
												<ThemedText
													style={{
														fontSize: 9,
														color: "#198155",
														fontWeight: "400",
													}}
												>
													Active
												</ThemedText>
											</View>
										</View>
									</View>
								</View>

								<View
									style={{
										justifyContent: "center",
										alignItems: "center",
										width: "100%",
									}}
								>
									<ThemedButton
										title="Add Patient"
										onPress={() =>
											addNewPatient({ userId: searchedPatient.id })
										}
										lightColor="#3A8289"
										darkColor="#1A4F55"
										style={{
											width: 125,
											height: 44,
											borderRadius: 32,
											marginTop: 20,
										}}
										textStyle={{
											fontSize: 14,
											fontWeight: "500",
										}}
									/>
								</View>
							</View>
						) : null}

						<ThemedInput
							label="Medical Condition"
							placeholder=""
							lightColor="#FFFFFF"
							darkColor="#1A4F55"
							keyboardType="default"
							value={patient.medicalCondition}
							onChangeText={(text) =>
								handleInputChange("medicalCondition", text)
							}
							error={errors.medicalCondition}
						/>
						<ThemedInput
							label="Patient Phone"
							placeholder=""
							lightColor="#FFFFFF"
							darkColor="#1A4F55"
							keyboardType="phone-pad"
							value={patient.phone}
							onChangeText={(text) => handleInputChange("phone", text)}
							error={errors.phone}
						/>
						{/* <View style={styles.inputContainer}> */}
						<ThemedInput
							label="Date Of Birth"
							placeholder="YYYY-MM-DD"
							lightColor="#FFFFFF"
							darkColor="#1A4F55"
							keyboardType="default"
							isDateInput={true}
							onChangeText={(text) => handleInputChange("dateOfBirth", text)}
							value={patient.dateOfBirth}
							error={errors.dateOfBirth}
						/>
						{/* </View> */}
						<View>
							<ThemedText style={styles.labelText}>
								State of Residence
							</ThemedText>
							<SelectList
								setSelected={(val: any) => {
									setSelected(val);
									updateField("stateOfResidence", val);
									setErrors((prevErrors) => {
										if (prevErrors.stateOfResidence) {
											const newErrors = { ...prevErrors };
											delete newErrors.stateOfResidence;
											return newErrors;
										}
										return prevErrors;
									});
								}}
								data={statesInNigeria}
								save="value"
								boxStyles={styles.selectBox}
								defaultOption={statesInNigeria[0]}
							/>
							{errors.stateOfResidence && (
								<ThemedText style={styles.errorText}>
									{errors.stateOfResidence}
								</ThemedText>
							)}
						</View>

						<ThemedInput
							label="Home address"
							placeholder=""
							lightColor="#FFFFFF"
							darkColor="#1A4F55"
							keyboardType="default"
							value={patient.address}
							onChangeText={(text) => handleInputChange("address", text)}
							error={errors.address}
						/>
						<ThemedInput
							label="Contact of prescribing doctor (optional)"
							placeholder=""
							lightColor="#FFFFFF"
							darkColor="#1A4F55"
							keyboardType="phone-pad"
							value={patient.prescribingDoctorContact}
							onChangeText={(text) =>
								handleInputChange("prescribingDoctorContact", text)
							}
							error={errors.prescribingDoctorContact}
						/>
						<ThemedInput
							label="Emergency contact (optional)"
							placeholder=""
							lightColor="#FFFFFF"
							darkColor="#1A4F55"
							keyboardType="phone-pad"
							value={patient.emergencyContact}
							onChangeText={(text) =>
								handleInputChange("emergencyContact", text)
							}
							error={errors.emergencyContact}
						/>
					</View>
					<View style={{ flexDirection: "column", gap: 8 }}>
						<ThemedText style={styles.genderText}>Gender</ThemedText>
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
										selected={selectedId === option.id}
										onPress={() => handleChangeCategory(option.id)}
										color={Colors.primary.color}
									/>
									<ThemedText style={styles.radioLabel}>
										{option.label}
									</ThemedText>
								</View>
							))}
						</View>
						{errors.gender && (
							<ThemedText style={styles.errorText}>{errors.gender}</ThemedText>
						)}
					</View>
				</View>
			</ScrollView>

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
	scrollContent: {
		paddingBottom: 20,
	},
	container: {
		paddingTop: 24,
		flex: 1,
		flexDirection: "column",
		gap: 24,
		alignItems: "flex-start",
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
	inputContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 16,
		paddingHorizontal: 20,
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
	genderText: {
		paddingHorizontal: 20,
		color: Colors.primary.black,
		fontWeight: "400",
	},
	errorText: {
		color: "red",
		fontSize: 12,
		paddingHorizontal: 20,
		marginTop: 4,
	},
});
