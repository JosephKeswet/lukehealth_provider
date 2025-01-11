import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { CloseSheetIcon, PillIcon, PrescriptionIcon } from "@/constants/icons";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { Colors } from "@/constants/Colors";

type Props = {
	closeBottomSheet: () => void;
};
export default function ContactOptionSheet({ closeBottomSheet }: Props) {
	return (
		<View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "flex-end",
					paddingBottom: 10,
					alignItems: "center",
					gap: 90,
				}}
			>
				<ThemedText
					style={{
						textAlign: "center",
						fontSize: 16,
						fontWeight: "500",
					}}
				>
					Contact Options
				</ThemedText>
				<Pressable onPress={closeBottomSheet}>
					<CloseSheetIcon />
				</Pressable>
			</View>
			<View
				style={{
					flexDirection: "column",
					gap: 16,
					paddingTop: 24,
				}}
			>
				<ThemedButton
					onPress={() => {
						// router.push("/voice");
						closeBottomSheet();
					}}
					title="Call In-App"
					style={{
						borderRadius: 100,
					}}
				/>
				<ThemedButton
					onPress={() => closeBottomSheet}
					title="Call by Phone"
					textStyle={{
						color: Colors.primary.color,
					}}
					style={{
						borderRadius: 100,
						backgroundColor: "white",
						borderColor: Colors.light.border,
						borderWidth: 1,
					}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({});
