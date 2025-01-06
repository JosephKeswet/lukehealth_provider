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

export default function HealthData() {
	return (
		<View style={styles.container}>
			<View style={styles.profileDetails}>
				<ProfileItem
					title="Blood group"
					mainText="AB+"
				/>
				<ProfileItem
					title="Genotype"
					mainText="AA"
				/>
				<ProfileItem
					title="Weight"
					mainText="54kg"
				/>
				<View style={styles.profileItemContainer}>
					<ThemedText style={styles.profileItemTitle}>
						Family Medical History
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
							Join our community and connect with us on Whatsapp for quick
							responses
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
