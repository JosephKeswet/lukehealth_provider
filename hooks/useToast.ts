import Toast from "react-native-toast-message";

// Define the type for the toast options
type ToastOptions = {
	type?: "success" | "error" | "info" | "delete"; // Supported toast types
	text1: string; // Main message (required)
	text2?: string; // Optional subtext
	duration?: number; // Duration in milliseconds (optional, default: 4000)
};

const useToast = () => {
	/**
	 * Show a toast notification.
	 *
	 * @param {ToastOptions} options - The options for the toast.
	 */
	const toast = ({
		type = "success",
		text1,
		text2 = "",
		duration = 4000,
	}: ToastOptions) => {
		Toast.show({
			type,
			text1,
			text2,
			visibilityTime: duration,
		});
	};

	return { toast };
};

export default useToast;
