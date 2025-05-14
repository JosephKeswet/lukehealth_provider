import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Alert } from "react-native";

type IconName = "camera" | "image" | "videocam" | "mic" | "document" | "attach";

interface UseAttachmentOptionsProps {
	setMessages: any;
	setShowAttachmentMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useAttachmentOptions({
	setMessages,
	setShowAttachmentMenu,
}: UseAttachmentOptionsProps) {
	const addMessage = (text: string) => {
		setMessages((prev: any) => [
			...prev,
			{ id: Date.now().toString(), text, isUser: true },
		]);
		setShowAttachmentMenu(false);
	};

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
		});
		if (!result.canceled) {
			addMessage("📷 Image shared");
		}
	};

	const pickVideo = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Videos,
			allowsEditing: true,
			quality: 1,
		});
		if (!result.canceled) {
			addMessage("📹 Video shared");
		}
	};

	const openCamera = async () => {
		const { status } = await ImagePicker.requestCameraPermissionsAsync();
		if (status !== "granted") {
			Alert.alert("Permission Required", "Camera access is needed.");
			return;
		}
		let result = await ImagePicker.launchCameraAsync({
			quality: 1,
			mediaTypes: ImagePicker.MediaTypeOptions.All,
		});
		if (!result.canceled) {
			const type = result.assets[0].type;
			addMessage(type === "video" ? "📹 Video captured" : "📸 Photo captured");
		}
	};

	const pickDocument = async () => {
		const result = await DocumentPicker.getDocumentAsync({
			type: "*/*",
			copyToCacheDirectory: false,
		});
		if (!result.canceled) {
			const file = result.assets[0];
			addMessage(`📎 ${file.name} shared`);
		}
	};

	const pickAudio = async () => {
		const result = await DocumentPicker.getDocumentAsync({
			type: "audio/*",
			copyToCacheDirectory: false,
		});
		if (!result.canceled) {
			const file = result.assets[0];
			addMessage(`🎵 ${file.name} shared`);
		}
	};

	const attachmentOptions: {
		icon: IconName;
		label: string;
		action: () => void;
	}[] = [
		{ icon: "camera", label: "Camera", action: openCamera },
		{ icon: "image", label: "Photo", action: pickImage },
		{ icon: "videocam", label: "Video", action: pickVideo },
		{ icon: "mic", label: "Audio", action: pickAudio },
		{ icon: "document", label: "File", action: pickDocument },
	];

	return { attachmentOptions };
}
