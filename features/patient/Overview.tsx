import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

function ProfileItem({ title, mainText }: { title: string; mainText: string }) {
	return (
		<View style={styles.profileItemContainer}>
			<ThemedText style={styles.profileItemTitle}>{title}</ThemedText>
			<ThemedText style={styles.profileItemMainText}>{mainText}</ThemedText>
		</View>
	);
}

export default function Overview() {
	return (
		<View style={styles.container}>
			<View style={styles.profileDetails}>
				<ProfileItem
					title="Name"
					mainText="Eddie Opara"
				/>
				<ProfileItem
					title="Mobile"
					mainText="08097359075"
				/>
				<ProfileItem
					title="Address"
					mainText="1001 Lekki Street, Island way"
				/>
				<ProfileItem
					title="Date Of Birth"
					mainText="May 10, 1963"
				/>
				<ProfileItem
					title="Gender"
					mainText="Male"
				/>
				<View style={styles.profileItemContainer}>
					<ThemedText style={styles.profileItemTitle}>
						Care Plan Summary
					</ThemedText>
					<View
						style={{
							borderWidth: 1,
							borderColor: Colors.light.border,
							padding: 16,
							borderRadius: 4,
							backgroundColor: "white",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<ThemedText style={styles.profileItemMainText}>
							Goals and Desired Outcomes: educe HbA1c levels by 1% in three
							months(ST) & maintain blood pressure below 130/80 mm Hg (LT)
						</ThemedText>
					</View>
				</View>
				<ProfileItem
					title="Emergecny Contact *"
					mainText="07043187952"
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	profileDetails: {
		flexDirection: "column",
		gap: 8,
	},
	profileItemContainer: {
		marginBottom: 16,
	},
	profileItemTitle: {
		color: "#999999",
	},
	profileItemMainText: {
		color: "#111111",
	},
});
