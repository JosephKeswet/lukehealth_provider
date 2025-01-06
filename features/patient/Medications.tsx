import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import React from "react";
import { Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { doseDetails } from "@/constants/enums";
import { CheckMark } from "@/constants/icons";

export default function Medications() {
	return (
		<View
			style={{
				paddingHorizontal: 20,
			}}
		>
			{Object.entries(doseDetails).map(([key, details]) => (
				<Card key={key}>
					<View style={styles.header}>
						<ThemedText style={styles.issuedText}>ISSUED: 7TH JULY</ThemedText>
						<Tag
							style={styles.incompleteTag}
							textStyle={styles.incompleteTagText}
						>
							Completed 🥳
						</Tag>
					</View>
					<View>
						<ThemedText style={styles.title}>{key}</ThemedText>
						<View style={styles.statusRow}>
							<ThemedText style={styles.label}>Status:</ThemedText>
							<Tag
								style={styles.modifiedTag}
								textStyle={styles.modifiedTagText}
							>
								Modified
							</Tag>
						</View>
						<Divider />
					</View>
					<View style={styles.dosageSection}>
						<View style={styles.doseRow}>
							<ThemedText style={styles.label}>Dose 6/6</ThemedText>
							<VerticalDivider />
							<View style={styles.circleRow}>
								<View style={styles.circle}>
									<CheckMark />
								</View>
							</View>
						</View>
					</View>
					{/* <Divider /> */}
					{/* <View style={styles.footer}>
						<ThemedText>View Notes</ThemedText>
						<ArrowRightIcon />
					</View> */}
				</Card>
			))}
		</View>
	);
}

type CardProps = {
	children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ children }) => (
	<View style={styles.card}>{children}</View>
);

type TagProps = {
	children: React.ReactNode;
	style?: ViewStyle;
	textStyle?: TextStyle;
};

const Tag: React.FC<TagProps> = ({ children, style, textStyle }) => (
	<Pressable style={[styles.tag, style]}>
		<ThemedText style={[styles.tagText, textStyle]}>{children}</ThemedText>
	</Pressable>
);

const Divider: React.FC = () => <View style={styles.divider} />;

const VerticalDivider: React.FC = () => (
	<View style={[styles.divider, styles.verticalDivider]} />
);

const styles = StyleSheet.create({
	scene: {
		// flex: 1,
		// justifyContent: "center",
		// alignItems: "center",
		paddingHorizontal: 20,
		gap: 30,
	},
	card: {
		width: "100%",
		height: "auto",
		borderColor: Colors.light.border,
		borderWidth: 1,
		borderRadius: 16,
		paddingVertical: 10,
		marginVertical: 20,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	issuedText: {
		color: "#8C8C8C",
		fontWeight: "500",
	},
	tag: {
		height: 32,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 16,
		paddingHorizontal: 12,
		paddingVertical: 4,
	},
	tagText: {
		color: "#8C8C8C", // Define a default text style for tags.
	},
	incompleteTag: {
		backgroundColor: "#C2F2E6",
		width: 120,
	},
	incompleteTagText: {
		color: Colors.primary.green,
	},
	title: {
		color: "#344054",
		fontSize: 16,
		fontWeight: "500",
		paddingHorizontal: 20,
	},
	statusRow: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 8,
		paddingHorizontal: 20,
	},
	label: {
		color: "#999999",
	},
	modifiedTag: {
		backgroundColor: "#00A8610F",
		width: 80,
	},
	modifiedTagText: {
		color: Colors.primary.green,
	},
	divider: {
		height: 1,
		backgroundColor: Colors.light.border,
		marginVertical: 10,
	},
	verticalDivider: {
		width: 25,
		transform: [{ rotate: "90deg" }],
	},
	dosageSection: {
		flexDirection: "column",
		gap: 8,
		paddingHorizontal: 20,
	},
	doseRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
	},
	circle: {
		width: 36,
		height: 36,
		borderColor: "#C2F2E6",
		borderWidth: 1,
		borderRadius: 18,
		backgroundColor: "#C2F2E6",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	circleRow: {
		flexDirection: "row",
		gap: 8,
		marginLeft: 10,
	},
	footer: {
		paddingHorizontal: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
