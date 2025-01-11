import {
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
import useHealthStore from "@/store";
import { ThemedInput } from "@/components/ThemedInput";
import { SelectList } from "react-native-dropdown-select-list";

export default function PatientStepOne() {
	const { height } = Dimensions.get("window");
	const [selectedId, setSelectedId] = useState<string>("");
	const [selected, setSelected] = useState("Nigeria");

	const setPatientProgress = useHealthStore(
		(state) => state.setPatientProgress
	);
	const [inputValue, setInputValue] = useState("");
	const data = [
		{ key: "1", value: "AA" },
		{ key: "2", value: "AS" },
		{ key: "3", value: "SS" },
		{ key: "4", value: "AC" },
		{ key: "5", value: "SC" },
		{ key: "6", value: "CC" },
	];

	const handleInputChange = (text: string) => {
		setInputValue(text);
	};

	const handleChangeCategory = (id: string) => {
		setSelectedId(id);
	};

	const handlePress = () => {
		setPatientProgress(0.4); // Update progress to move to the next step
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
							label="Full Name"
							placeholder=""
							lightColor="#FFFFFF"
							darkColor="#1A4F55"
							keyboardType="number-pad"
							value={inputValue}
							onChangeText={handleInputChange}
						/>
						<View>
							<ThemedText style={styles.labelText}>
								State of Residence
							</ThemedText>
							<SelectList
								setSelected={(val: any) => setSelected(val)}
								data={data}
								save="value"
								boxStyles={styles.selectBox}
								defaultOption={{ key: "1", value: "Group A" }}
							/>
						</View>
						<ThemedInput
							label="Home address"
							placeholder=""
							lightColor="#FFFFFF"
							darkColor="#1A4F55"
							keyboardType="number-pad"
							value={inputValue}
							onChangeText={handleInputChange}
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
					<View style={styles.inputContainer}>
						<ThemedInput
							label="Age"
							placeholder=""
							lightColor="#FFFFFF"
							darkColor="#1A4F55"
							keyboardType="number-pad"
							value={inputValue}
							onChangeText={handleInputChange}
						/>
						<ThemedInput
							label="Weight"
							placeholder="In Pounds(lbs)"
							lightColor="#FFFFFF"
							darkColor="#1A4F55"
							keyboardType="number-pad"
							value={inputValue}
							onChangeText={handleInputChange}
						/>
						<View>
							<ThemedText style={styles.labelText}>Blood group</ThemedText>
							<SelectList
								setSelected={(val: any) => setSelected(val)}
								data={data}
								save="value"
								boxStyles={styles.selectBox}
								defaultOption={{ key: "1", value: "Group A" }}
							/>
						</View>
						<View>
							<ThemedText style={styles.labelText}>Genotype</ThemedText>
							<SelectList
								setSelected={(val: any) => setSelected(val)}
								data={data}
								save="value"
								boxStyles={styles.selectBox}
								defaultOption={{ key: "1", value: "AA" }}
							/>
						</View>
					</View>
				</View>
			</ScrollView>

			{/* Themed button placed at the bottom */}
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
		paddingBottom: 20, // Avoid overlapping with the button
	},
	container: {
		paddingTop: 24,
		flex: 1, // Take up remaining space between header and button
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
		backgroundColor: "transparent", // Set background color to transparent
	},
	genderText: {
		paddingHorizontal: 20,
		color: Colors.primary.black,
		fontWeight: "400",
	},
});
