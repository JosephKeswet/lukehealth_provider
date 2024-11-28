import React, { useRef, useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	StyleSheet,
	Pressable,
	ScrollView,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import ProgressCircle from "@/components/ProgressCircle";
import {
	CallIcon,
	ClockIcon,
	CloseSheetIcon,
	NotesIcon,
	PillIcon,
	PlusIcon,
	PrescriptionIcon,
} from "@/constants/icons";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { RadioButton } from "react-native-radio-buttons-group";
import { DoseType } from "@/constants/enums";
import DoseItem from "@/components/DoseItem";

// CallToAction Component
const CallToAction = ({ icon, text }: { text: string; icon: JSX.Element }) => {
	return (
		<View style={styles.callToAction}>
			<View>{icon}</View>
			<ThemedText
				type="default"
				style={styles.callToActionText}
			>
				{text}
			</ThemedText>
		</View>
	);
};

const SheetCallToAction = ({
	icon,
	headerText,
	subText,
}: {
	headerText: string;
	subText: string;
	icon: JSX.Element;
}) => {
	return (
		<TouchableOpacity style={styles.sheetButton}>
			<View>{icon}</View>
			<View
				style={{
					flexDirection: "column",
					width: 285,
				}}
			>
				<ThemedText style={styles.sheetheaderText}>{headerText}</ThemedText>
				<ThemedText style={styles.sheetsubText}>{subText}</ThemedText>
			</View>
		</TouchableOpacity>
	);
};

// HomeScreen Component
export default function HomeScreen() {
	const bottomSheetRef = useRef<any>(null);

	const openBottomSheet = () => bottomSheetRef.current?.open();
	const closeBottomSheet = () => bottomSheetRef.current?.close();

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				{/* Bottom Sheet */}
				<RBSheet
					ref={bottomSheetRef}
					height={300}
					openDuration={250}
					customStyles={{
						container: styles.bottomSheetContainer,
					}}
				>
					<View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "flex-end",
								paddingBottom: 10,
							}}
						>
							<Pressable onPress={closeBottomSheet}>
								<CloseSheetIcon />
							</Pressable>
						</View>
						<SheetCallToAction
							headerText="Add New Medication"
							subText="Hang on and get a call from one of our doctors in 5-10 minutes."
							icon={
								<PillIcon
									width="32"
									height="32"
								/>
							}
						/>
						<SheetCallToAction
							headerText="Request Refill"
							subText="Pick a time that’s convenient for you to get care."
							icon={<PrescriptionIcon />}
						/>
					</View>
				</RBSheet>
			</ScrollView>
			{/* Floating Action Button */}
			<TouchableOpacity
				style={styles.fab}
				onPress={openBottomSheet}
			>
				<PlusIcon />
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	statsContainer: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingTop: 30,
	},
	stat: {
		alignItems: "center",
	},
	statValue: {
		fontSize: 18,
	},
	statLabel: {
		fontSize: 10,
		color: Colors.primary.black,
		lineHeight: 12,
	},
	actionsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingTop: 40,
	},
	callToAction: {
		height: 40,
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		borderColor: "#3A8289",
		borderWidth: 1,
		padding: 10,
		borderRadius: 100,
	},
	callToActionText: {
		fontSize: 14,
		lineHeight: 22,
	},
	fab: {
		position: "absolute",
		bottom: 10,
		right: 10,
		backgroundColor: Colors.primary.color,
		width: 50,
		height: 50,
		borderRadius: 28,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 5,
		elevation: 5,
	},
	fabText: {
		color: "#fff",
		fontSize: 24,
		fontWeight: "bold",
	},
	bottomSheetContainer: {
		padding: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: "white",
	},
	sheetTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 20,
	},
	sheetButton: {
		backgroundColor: "#FFFFFF",
		// paddingVertical: 12,
		padding: 16,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#E8E8E8",
		marginTop: 16,
		height: 68,
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	sheetheaderText: {
		color: Colors.primary.color,
		textAlign: "left",
		fontSize: 14,
		fontWeight: "500",
	},
	sheetsubText: {
		color: "#667085",
		textAlign: "left",
		fontSize: 10,
		fontWeight: "400",
		lineHeight: 16,
	},
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
