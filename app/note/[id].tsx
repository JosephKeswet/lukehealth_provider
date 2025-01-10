import FloatingActionButton from "@/components/FloatingActionButton";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet, SafeAreaView } from "react-native";

export default function NoteScreen() {
	const { id } = useLocalSearchParams();

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<View style={styles.headerRow}>
					<View style={styles.avatarContainer}>
						<View style={styles.nameBadge}>
							<ThemedText style={styles.nameBadgeText}>
								From: Pharm. Edna
							</ThemedText>
						</View>
						<Image
							source={require("../../assets/images/avatar-note.png")}
							contentFit="cover"
							transition={1000}
							style={styles.avatarImage}
						/>
					</View>
					<ThemedText style={styles.date}>Dec 25, 2024</ThemedText>
				</View>
				<ThemedText style={styles.title}>
					On current prescription outcomes & effects. {id}
				</ThemedText>
				<ThemedText style={styles.body}>
					This side effect could worsen if Oliver continues taking his current
					medication regimen. From my last consultation with him, he kept
					complaining about persistent dizziness and fatigue, which he
					associates with his antihypertensive medication. He mentioned that
					these symptoms have been affecting his daily activities and overall
					quality of life. During our discussion, I reviewed his medication
					history and noted that he is currently taking Lisinopril 10mg daily
					and Hydrochlorothiazide 12.5mg daily. I advised him on the importance
					of monitoring his blood pressure regularly and encouraged him to keep
					a log of his symptoms. Additionally, @Dr. Ama, I suggest we consult
					with his prescribing physician to explore alternative treatment
					options that may better suit his needs without compromising his
					therapeutic goals.
				</ThemedText>
				<View style={styles.buttonRow}>
					<ThemedButton
						title="Contact Pharmacist"
						onPress={() => {}}
						style={{
							width: "45%",
							borderRadius: 32,
						}}
						textStyle={{
							fontWeight: "500",
							fontSize: 14,
						}}
					/>
					<ThemedButton
						title="Contact Doctor"
						onPress={() => {}}
						style={{
							width: "45%",
							borderRadius: 32,
							backgroundColor: "white",
							borderColor: Colors.primary.color,
							borderWidth: 1,
						}}
						textStyle={{
							color: Colors.primary.color,
							fontWeight: "500",
							fontSize: 14,
						}}
					/>
				</View>
			</View>
			<FloatingActionButton />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	avatarContainer: {
		position: "relative",
		width: 125,
	},
	nameBadge: {
		backgroundColor: "#DDE9E6",
		width: 111,
		height: 26,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1,
	},
	nameBadgeText: {
		fontSize: 10,
		fontWeight: "500",
		color: "#255A4E",
	},
	avatarImage: {
		width: 26,
		height: 24,
		position: "absolute",
		right: 0,
	},
	date: {
		fontSize: 10,
		color: "#828282",
		lineHeight: 13.5,
		fontWeight: "400",
	},
	title: {
		fontSize: 24,
		color: "#404040",
		fontWeight: "500",
		lineHeight: 32,
		paddingTop: 10,
	},
	body: {
		fontSize: 12,
		lineHeight: 18,
		color: "#6F6F6F",
		fontWeight: "400",
		paddingTop: 10,
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 16,
		marginTop: "auto",
	},
});
