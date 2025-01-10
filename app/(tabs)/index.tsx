import React, { useRef } from "react";
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
import {
	ActivePatientIcon,
	CallIcon,
	CloseSheetIcon,
	InfoIcon,
	NotesIcon,
	PillIcon,
	PlusIcon,
	PrescriptionIcon,
} from "@/constants/icons";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import FloatingActionButton from "@/components/FloatingActionButton";

// Floating Action Button Component

// Call to Action Item Component
const CallToActionItem = ({
	icon,
	headerText,
	subText,
}: {
	icon: JSX.Element;
	headerText: string;
	subText: string;
}) => (
	<TouchableOpacity style={styles.sheetButton}>
		<View>{icon}</View>
		<View style={styles.callToActionDetails}>
			<ThemedText style={styles.sheetHeaderText}>{headerText}</ThemedText>
			<ThemedText style={styles.sheetSubText}>{subText}</ThemedText>
		</View>
	</TouchableOpacity>
);

// Card Component
const Card = ({
	icon,
	title,
	value,
}: {
	icon: JSX.Element;
	title: string;
	value: string | number;
}) => (
	<View style={styles.card}>
		<View style={styles.cardContent}>
			{icon}
			<View>
				<ThemedText style={styles.cardTitle}>{title}</ThemedText>
				<ThemedText style={styles.cardValue}>{value}</ThemedText>
			</View>
		</View>
	</View>
);

// LukeHealth Horizontal Card Component
const HorizontalCard = ({
	backgroundColor,
	title,
}: {
	backgroundColor: string;
	title: string;
}) => (
	<View style={styles.horizontalCardContainer}>
		<View style={[styles.horizontalCard, { backgroundColor }]} />
		<ThemedText style={styles.horizontalCardTitle}>{title}</ThemedText>
	</View>
);

// HomeScreen Component
export default function HomeScreen() {
	const bottomSheetRef = useRef<any>(null);

	const openBottomSheet = () => bottomSheetRef.current?.open();
	const closeBottomSheet = () => bottomSheetRef.current?.close();

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				{/* Active Patients Section */}
				<View style={styles.section}>
					<Card
						icon={<ActivePatientIcon />}
						title="Active Patients"
						value={7}
					/>
				</View>

				{/* Info Banner Section */}
				<View style={styles.section}>
					<View style={styles.infoBanner}>
						<InfoIcon />
						<ThemedText style={styles.infoText}>
							While waiting for your license to be verified you can go through
							the videos below (*)
						</ThemedText>
					</View>
				</View>

				{/* Learn How LukeHealth Works Section */}
				<View style={[styles.section, { flexDirection: "column", gap: 20 }]}>
					<ThemedText style={styles.sectionTitle}>
						Learn How LukeHealth Works
					</ThemedText>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.horizontalScroll}
					>
						<HorizontalCard
							backgroundColor="#A0CEDD"
							title="Basics of Medication Therapy Management"
						/>
						<HorizontalCard
							backgroundColor={Colors.primary.color}
							title="Preparing to meet with your first patient"
						/>
					</ScrollView>
				</View>

				{/* Bottom Sheet */}
				{/* <RBSheet
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
								<PillIcon
									width="32"
									height="32"
								/>
							}
							headerText="Add New Medication"
							subText="Hang on and get a call from one of our doctors in 5-10 minutes."
						/>
						<CallToActionItem
							icon={<PrescriptionIcon />}
							headerText="Request Refill"
							subText="Pick a time that’s convenient for you to get care."
						/>
					</View>
				</RBSheet> */}
			</ScrollView>

			{/* Floating Action Button */}
			<FloatingActionButton />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	section: {
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	sectionTitle: {
		color: Colors.primary.black,
		fontSize: 20,
		fontWeight: "400",
	},
	card: {
		width: 293,
		height: 144,
		backgroundColor: Colors.primary.color,
		borderRadius: 8,
		padding: 24,
	},
	cardContent: {
		flexDirection: "row",
		gap: 16,
	},
	cardTitle: {
		color: "white",
	},
	cardValue: {
		color: "white",
		fontSize: 20,
		fontWeight: "600",
	},
	infoBanner: {
		width: "100%",
		minHeight: 72,
		backgroundColor: "#FFF7EB",
		borderColor: "#FF9F00",
		borderWidth: 1,
		borderRadius: 8,
		padding: 10,
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 8,
	},
	infoText: {
		flex: 1,
		fontSize: 14,
		color: Colors.primary.black,
		fontWeight: "300",
		lineHeight: 20,
	},
	horizontalScroll: {
		gap: 16,
	},
	horizontalCardContainer: {
		width: 235,
	},
	horizontalCard: {
		width: 235,
		height: 163,
		borderRadius: 8,
	},
	horizontalCardTitle: {
		color: Colors.primary.black,
		marginTop: 10,
		lineHeight: 20,
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
