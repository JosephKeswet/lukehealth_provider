import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors"; // Adjust the import path to your project structure
import { BlurView } from "expo-blur"; // Import BlurView

interface LoaderProps {
	size?: "small" | "large"; // Optional size prop (defaults to 'large')
	color?: string; // Optional color prop (defaults to primary color)
}

const Loader: React.FC<LoaderProps> = ({
	size = "large",
	color = Colors.primary.color,
}) => {
	return (
		<View style={styles.loaderContainer}>
			{/* Background blur effect */}
			<BlurView
				intensity={10}
				style={styles.blurBackground}
			>
				<ActivityIndicator
					size={size}
					color={color}
				/>
			</BlurView>
		</View>
	);
};

const styles = StyleSheet.create({
	loaderContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 100,
	},
	blurBackground: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Loader;
