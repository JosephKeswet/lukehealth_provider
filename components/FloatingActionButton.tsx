import { Colors } from "@/constants/Colors";
import { PlusIcon } from "@/constants/icons";
import { StyleSheet, TouchableOpacity } from "react-native";

export const FloatingActionButton = ({ onPress }: { onPress: () => void }) => (
	<TouchableOpacity
		style={styles.fab}
		onPress={onPress}
	>
		<PlusIcon />
	</TouchableOpacity>
);

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
});
