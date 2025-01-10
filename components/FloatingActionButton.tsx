import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import {
	CloseSheetIcon,
	NoteIcon,
	PatientIcon,
	PlusIcon,
	PrescriptionIcon,
	ProfileIcon,
} from "@/constants/icons";
import { Colors } from "@/constants/Colors";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import RBSheet from "react-native-raw-bottom-sheet";
import { ThemedText } from "./ThemedText";
import { router } from "expo-router";

export default function FloatingActionButton() {
	const CallToActionItem = ({
		icon,
		headerText,
		subText,
		onPress,
	}: {
		icon: JSX.Element;
		headerText: string;
		subText: string;
		onPress: () => void;
	}) => (
		<TouchableOpacity
			onPress={onPress}
			style={styles.sheetButton}
		>
			<View>{icon}</View>
			<View style={styles.callToActionDetails}>
				<ThemedText style={styles.sheetHeaderText}>{headerText}</ThemedText>
				<ThemedText style={styles.sheetSubText}>{subText}</ThemedText>
			</View>
		</TouchableOpacity>
	);
	const {
		sheetRef: bottomSheetRef,
		openSheet: openBottomSheet,
		closeSheet: closeBottomSheet,
	} = useBottomSheet();
	return (
		<View>
			{/* Floating Action Button */}
			<TouchableOpacity
				style={styles.fab}
				onPress={openBottomSheet}
			>
				<PlusIcon />
			</TouchableOpacity>
			{/* Bottom Sheet */}
			<RBSheet
				ref={bottomSheetRef}
				height={300}
				openDuration={250}
				customStyles={{ container: styles.bottomSheetContainer }}
			>
				<View>
					<View style={styles.sheetHeader}>
						<Pressable onPress={closeBottomSheet}>
							<CloseSheetIcon />
						</Pressable>
					</View>
					<CallToActionItem
						icon={
							<PatientIcon
							// width="32"
							// height="32"
							/>
						}
						onPress={() => {
							router.push("/add-patient");
							closeBottomSheet();
						}}
						headerText="Add Patient"
						subText="Hang on and get a call from one of our doctors in 5-10 minutes."
					/>
					<CallToActionItem
						icon={<NoteIcon />}
						headerText="Create Note"
						onPress={() => {
							router.push("/create-note");
							closeBottomSheet();
						}}
						subText="Pick a time that’s convinient for you to get care."
					/>
				</View>
			</RBSheet>
		</View>
	);
}

const styles = StyleSheet.create({
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

	sheetHeader: {
		flexDirection: "row",
		justifyContent: "flex-end",
		paddingBottom: 10,
	},
	sheetButton: {
		backgroundColor: "#FFFFFF",
		padding: 16,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#E8E8E8",
		marginTop: 16,
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		height: 68,
	},
	callToActionDetails: {
		width: 285,
	},
	sheetHeaderText: {
		color: Colors.primary.color,
		fontSize: 14,
		fontWeight: "500",
	},
	sheetSubText: {
		color: "#667085",
		fontSize: 10,
		fontWeight: "400",
		lineHeight: 16,
	},
});
