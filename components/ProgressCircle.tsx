import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";

const ProgressCircle = ({ value = 75, max = 100, label = "Progress" }) => {
	const size = 224; // Width and height of the circle
	const strokeWidth = 10; // Width of the progress stroke
	const radius = (size - strokeWidth) / 2; // Radius of the circle
	const circumference = 2 * Math.PI * radius; // Circumference of the circle
	const progress = (value / max) * 100; // Calculate progress as a percentage

	return (
		<View style={styles.container}>
			<Svg
				width={size}
				height={size}
			>
				{/* Background Circle */}
				<Circle
					stroke="#DADADA"
					fill="none"
					cx={size / 2}
					cy={size / 2}
					r={radius}
					strokeWidth={strokeWidth}
				/>
				{/* Progress Circle */}
				<Circle
					stroke="#3A8289"
					fill="none"
					cx={size / 2}
					cy={size / 2}
					r={radius}
					strokeWidth={strokeWidth}
					strokeDasharray={`${circumference} ${circumference}`}
					strokeDashoffset={(1 - value / max) * circumference}
					strokeLinecap="round"
					rotation="-90"
					origin={`${size / 2}, ${size / 2}`}
				/>
				{/* Center Text */}
				<SvgText
					x="50%"
					y="50%"
					textAnchor="middle"
					alignmentBaseline="middle"
					fontSize="64"
					fill="#3A8289"
					fontWeight="300"
				>
					{`${Math.round(progress)}`}
				</SvgText>
				<SvgText
					x="50%"
					y="70%"
					textAnchor="middle"
					alignmentBaseline="middle"
					fontSize="10"
					fill="#555555"
					fontWeight="400"
				>
					{label}
				</SvgText>
			</Svg>
			{/* Bottom Label */}
			{/* <Text style={styles.label}>{label}</Text> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	label: {
		marginTop: 16,
		fontSize: 18,
		color: "#6200ea",
		fontWeight: "bold",
	},
});

export default ProgressCircle;
