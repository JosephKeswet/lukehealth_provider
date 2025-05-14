import {
	IAddPasswordResponse,
	ISignInResponse,
	ISignUpResponse,
	IVerifyEmailResponse,
} from "@/types/auth/responses";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { useStorage } from "../useStorage";
import {
	ICreatePassword,
	ISignIn,
	ISignUp,
	IVerifyEmail,
} from "@/types/auth/payload";
import { MutationAdapter } from "@/frameworks/adapters/mutationAdapter";
import { ResponseState } from "@/constants/enums";
import { useQueryClient } from "@tanstack/react-query";
import useToast from "../useToast";
import {
	IChangePasswordResponse,
	IUpdatePersonalInfoResponse,
} from "@/types/user/responses";
import { Alert } from "react-native";
import { IUpdatePassword, IUpdatePersonalInfo } from "@/types/user/payload";
import { apiRoutes } from "@/constants/api";

export default function useUser(mutationAdapter: MutationAdapter<any, any>) {
	const { saveCookie } = useStorage();
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const handleChangePassFailed = ({ message }: IChangePasswordResponse) => {
		toast({
			type: "error", // or 'error' or 'delete'
			text1: message,
		});
	};

	const handleChangePassSuccess = ({ message }: IChangePasswordResponse) => {
		toast({
			type: "success", // or 'error' or 'delete'
			text1: message,
		});
		// router.push(`/settings`);
	};

	const changeUserPassword = async (args: IUpdatePassword) => {
		Alert.alert(
			"Change Password",
			"Are you sure you want to change your password?",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Confirm",
					onPress: async () => {
						const response = await mutationAdapter.mutate(args);
						if (response.state === ResponseState.Success) {
							handleChangePassSuccess(response);
						} else {
							handleChangePassFailed(response);
						}
					},
					style: "destructive",
				},
			],
			{ cancelable: true }
		);
	};

	const handleUpdateUserPersonalInfoFailed = ({
		message,
	}: IUpdatePersonalInfoResponse) => {
		toast({
			type: "error", // or 'error' or 'delete'
			text1: message,
		});
	};

	const handleUpdateUserPersonalInfoSuccess = (
		{ message }: IUpdatePersonalInfoResponse,
		handleNextStep?: () => void
	) => {
		toast({
			type: "success", // or 'error' or 'delete'
			text1: message,
		});
		queryClient.invalidateQueries({
			queryKey: [apiRoutes.user.getUserInfo, apiRoutes.user.profileData],
		});

		setTimeout(() => {
			// router.push(`/profile`);
		}, 1000);
	};

	const updateUserPersonalInfo = async (
		args: IUpdatePersonalInfo,
		handleNextStep?: () => void
	) => {
		const confirmEditProfile = () => {
			Alert.alert(
				"Edit profile",
				"Are you sure you want to edit your profile",
				[
					{
						text: "Cancel",
						style: "cancel",
					},
					{
						text: "Confirm",
						onPress: () => {
							confirmMutation();
						},
						style: "destructive",
					},
				],
				{ cancelable: true }
			);
		};
		confirmEditProfile();
		async function confirmMutation() {
			const response = await mutationAdapter.mutate(args);
			if (response.state === ResponseState.Success) {
				handleUpdateUserPersonalInfoSuccess(response);
			} else {
				handleUpdateUserPersonalInfoFailed(response);
			}
		}
	};

	return { changeUserPassword, updateUserPersonalInfo };
}
