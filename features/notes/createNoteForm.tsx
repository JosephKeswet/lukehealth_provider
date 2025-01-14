import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { Image } from "expo-image";
import { SelectList } from "react-native-dropdown-select-list";
import { Colors } from "@/constants/Colors";
import { ThemedButton } from "@/components/ThemedButton";
import { AvatarIcon, PlusRoundedIcon, XIcon } from "@/constants/icons";
import { router } from "expo-router";

export default function CreateNoteForm() {
	const [selected, setSelected] = useState("OD (Once Daily)");

	const data = [
		{ key: "1", value: "OD (Once Daily)" },
		{ key: "2", value: "BD (Twice Daily)" },
		{ key: "3", value: "TDS (Thrice Daily)" },
		{ key: "4", value: "PRN (As Needed) " },
	];
	return (
		<View
			style={{
				backgroundColor: "white",
				paddingTop: 16,
				borderRadius: 8,
				marginBottom: 16,
				borderColor: "#DADADA",
				borderWidth: 1,
			}}
		>
			<ThemedText
				style={{
					textAlign: "center",
					fontSize: 16,
					color: "#111111",
				}}
			>
				Create New Note
			</ThemedText>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					paddingVertical: 20,
				}}
			>
				<Image
					source={require("@/assets/images/empty-note.png")}
					style={{
						width: 62,
						height: 62,
					}}
				/>
			</View>
			<View
				style={{
					flexDirection: "column",
					gap: 16,
					paddingHorizontal: 20,
				}}
			>
				<ThemedInput
					style={{
						backgroundColor: "#F8F8F8",
						padding: 10,
						borderRadius: 8,
						marginBottom: 8,
					}}
					placeholder="Enter a title for your note"
					label="Title/Reason for note"
				/>

				<View>
					<ThemedText style={styles.labelText}>Frequency of Usage</ThemedText>
					<SelectList
						setSelected={(val: any) => setSelected(val)}
						data={data}
						save="value"
						boxStyles={styles.selectBox}
						defaultOption={{ key: "1", value: "Oral" }}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: 16,
					}}
				>
					<ThemedButton
						onPress={() => {}}
						title="Collaborate"
						style={{
							width: 118,
							height: 36,
							backgroundColor: "#EBFBF4",
						}}
						textStyle={{
							fontSize: 12,
							color: Colors.primary.color,
						}}
						icon={<PlusRoundedIcon />}
					/>
					<View
						style={{
							width: 117,
							height: 36,
							backgroundColor: "#E7E7FF",
							borderRadius: 32,
							flexDirection: "row",
							justifyContent: "flex-start",
							alignItems: "center",
							paddingHorizontal: 5,
							gap: 5,
						}}
					>
						<View
							style={{
								width: 28,
								height: 28,
								backgroundColor: Colors.primary.color,
								borderRadius: 100,
							}}
						/>
						{/* <View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						> */}
						<ThemedText>James</ThemedText>
						<XIcon />
						{/* </View> */}
					</View>
				</View>
			</View>
			<View
				style={{
					backgroundColor: "#F8F8F8",
					height: 76,
					borderBottomRightRadius: 8,
					borderBottomLeftRadius: 8,
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					paddingHorizontal: 20,
					paddingVertical: 12,
					gap: 16,
				}}
			>
				<ThemedButton
					onPress={() => {}}
					title="Cancel"
					style={{
						width: "45%",
						height: 44,
						backgroundColor: "white",
						borderRadius: 32,
						justifyContent: "center",
						borderWidth: 1,
						borderColor: "#E8E8E8",
					}}
					textStyle={{
						fontSize: 16,
						color: Colors.primary.black,
					}}
				/>
				<ThemedButton
					onPress={() => router.push("/create/1")}
					title="Create note"
					style={{
						width: "45%",
						height: 44,
						backgroundColor: Colors.primary.color,
						borderRadius: 32,
						justifyContent: "center",
						alignItems: "center",
					}}
					textStyle={{
						fontSize: 16,
						color: "white",
					}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	labelText: {
		fontSize: 14,
		fontWeight: "400",
		marginBottom: 6,
		color: Colors.primary.black,
	},
	selectBox: {
		borderRadius: 8,
		borderColor: Colors.light.border,
		borderWidth: 1,
		backgroundColor: "transparent", // Set background color to transparent
	},
});
