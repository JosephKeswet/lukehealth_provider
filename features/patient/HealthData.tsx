import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { IPatientHealthData } from "@/types/patient/responses";

function ProfileItem({ title, mainText }: { title: string; mainText: string }) {
	return (
		<View style={styles.profileItemContainer}>
			<ThemedText style={styles.profileItemTitle}>{title}</ThemedText>
			<ThemedText style={styles.profileItemMainText}>{mainText}</ThemedText>
		</View>
	);
}

export default function HealthData({
	data,
}: {
	data: IPatientHealthData | null;
}) {
	if (!data) {
		return (
			<View style={styles.fallbackContainer}>
				<ThemedText style={styles.fallbackText}>
					No health data available.
				</ThemedText>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.profileDetails}>
				<ProfileItem
					title="Blood group"
					mainText={data?.bloodGroup ?? "N/A"}
				/>
				<ProfileItem
					title="Genotype"
					mainText={data?.genoType ?? "N/A"}
				/>
				<ProfileItem
					title="Weight"
					mainText={data?.weight ? `${data.weight} kg` : "N/A"}
				/>
				<ProfileItem
					title="Medical Condition"
					mainText={data?.medicalCondition ?? "N/A"}
				/>
				<ProfileItem
					title="Emergency Contact *"
					mainText="N/A"
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
	fallbackContainer: {
		paddingBottom: 20,
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	fallbackText: {
		color: "#999999",
		fontSize: 16,
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
