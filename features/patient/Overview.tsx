import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { formatIsoDateString } from "@/utils";
import { IPatientOverviewData } from "@/types/patient/responses";

function ProfileItem({ title, mainText }: { title: string; mainText: string }) {
	return (
		<View style={styles.profileItemContainer}>
			<ThemedText style={styles.profileItemTitle}>{title}</ThemedText>
			<ThemedText style={styles.profileItemMainText}>{mainText}</ThemedText>
		</View>
	);
}

export default function Overview({
	data,
}: {
	data: IPatientOverviewData | null;
}) {
	if (!data || Object.keys(data).length === 0) {
		return (
			<View style={styles.fallbackContainer}>
				<ThemedText style={styles.fallbackText}>
					No overview data available.
				</ThemedText>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.profileDetails}>
				<ProfileItem
					title="Name"
					mainText={data?.fullName ?? "N/A"}
				/>
				<ProfileItem
					title="Mobile"
					mainText={data?.phone ?? "N/A"}
				/>
				<ProfileItem
					title="Address"
					mainText={"N/A"}
				/>
				<ProfileItem
					title="Age"
					mainText={data?.age ? `${data.age} years` : "N/A"}
				/>
				<ProfileItem
					title="Date Of Birth"
					mainText={
						data?.dateOfBirth ? formatIsoDateString(data.dateOfBirth) : "N/A"
					}
				/>
				<ProfileItem
					title="Gender"
					mainText="N/A"
				/>
				<View style={styles.profileItemContainer}>
					<ThemedText style={styles.profileItemTitle}>
						Care Plan Summary
					</ThemedText>
					<View style={styles.carePlanBox}>
						<ThemedText style={styles.profileItemMainText}>
							Goals and Desired Outcomes: reduce HbA1c levels by 1% in three
							months (ST) & maintain blood pressure below 130/80 mm Hg (LT)
						</ThemedText>
					</View>
				</View>
				<ProfileItem
					title="Emergency Contact *"
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
	carePlanBox: {
		borderWidth: 1,
		borderColor: Colors.light.border,
		padding: 16,
		borderRadius: 4,
		backgroundColor: "white",
		flexDirection: "row",
		alignItems: "center",
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
});
