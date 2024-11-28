import { doseDetails, DoseType } from "@/constants/enums";
import { ClockIcon } from "@/constants/icons";
import { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Pressable } from "react-native";
import { ThemedText } from "./ThemedText";
import { RadioButton } from "react-native-radio-buttons-group";
import { Colors } from "@/constants/Colors";

const DoseItem = ({ doseType }: { doseType: DoseType }) => {
	const [selectedId, setSelectedId] = useState<string | null>(null);

	// Handle toggling the radio button (uncheck if already checked)
	const handleRadioChange = (id: string) => {
		// If the same radio button is clicked, uncheck it (set to null)
		setSelectedId((prevSelectedId) => (prevSelectedId === id ? null : id));
	};

	const { time, dose } = doseDetails[doseType];

	return (
		<Pressable
			style={styles.doseContainer}
			onPress={() => handleRadioChange(doseType)}
		>
			<View style={styles.doseDetails}>
				<ClockIcon />
				<View style={styles.doseTextContainer}>
					<ThemedText style={styles.doseText}>{doseType}</ThemedText>
					<ThemedText style={styles.timeText}>
						{time} {dose}
					</ThemedText>
				</View>
			</View>

			{/* Radio Button for Dose Item */}
			<View style={styles.radioOption}>
				<RadioButton
					id={doseType}
					containerStyle={styles.radioButtonContainer}
					borderColor="#3A8289"
					onPress={() => handleRadioChange(doseType)}
					selected={selectedId === doseType}
					color={Colors.primary.color}
				/>
			</View>
		</Pressable>
	);
};

export default DoseItem;

const styles = StyleSheet.create({
	doseContainer: {
		height: 76,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 16,
	},
	doseDetails: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	doseTextContainer: {
		flexDirection: "column",
	},
	doseText: {
		fontSize: 14,
		fontWeight: "500",
		color: "#000",
	},
	timeText: {
		fontSize: 12,
		fontWeight: "400",
		color: "#999999",
		lineHeight: 16,
	},
	radioOption: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		gap: 8,
		marginLeft: 16, // Add space between the dose item and radio button
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
});
