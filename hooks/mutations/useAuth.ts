import {
	IAddPasswordResponse,
	IForgotPasswordResponse,
	IResetPassVerifyResponse,
	ISignInResponse,
	ISignUpResponse,
	IVerifyEmailResponse,
} from "@/types/auth/responses";
import { Href, router } from "expo-router";
import Toast from "react-native-toast-message";
import { useStorage } from "../useStorage";
import {
	ICreatePassword,
	IForgotPassword,
	IResetPassVerify,
	ISignIn,
	ISignUp,
	IVerifyEmail,
} from "@/types/auth/payload";
import { MutationAdapter } from "@/frameworks/adapters/mutationAdapter";
import { ResponseState } from "@/constants/enums";
import { useQueryClient } from "@tanstack/react-query";
import useToast from "../useToast";

export default function useAuth(mutationAdapter: MutationAdapter<any, any>) {
	const { saveCookie } = useStorage();
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const handleSignUpFailed = ({ message }: ISignUpResponse) => {
		toast({
			type: "error", // or 'error' or 'delete'
			text1: message,
		});
	};

	const handleSignUpSuccess = (
		{ token, message, refreshToken }: ISignUpResponse,
		firstName: string
	) => {
		saveCookie("token", token);

		saveCookie("firstName", firstName);
		router.push(`/verify-email`);
		toast({
			type: "success", // or 'error' or 'delete'
			text1: message,
		});
	};

	const signUpUser = async (args: ISignUp) => {
		const payload = {
			fullName: args.firstName + args.lastName,
			email: args.email,
		};
		const response = await mutationAdapter.mutate(payload);
		console.log(response);
		if (response.state === ResponseState.Success) {
			handleSignUpSuccess(response, args?.firstName);
		} else {
			handleSignUpFailed(response);
		}
	};

	const handleVerifyFailed = ({ message }: IVerifyEmailResponse) => {
		toast({
			type: "error", // or 'error' or 'delete'
			text1: message,
		});
	};

	const handleVerifySuccess = (
		{ token, message, refreshToken }: IVerifyEmailResponse,
		route?: Href
	) => {
		toast({
			type: "success", // or 'error' or 'delete'
			text1: message,
		});
		saveCookie("token", token!);
		saveCookie("refreshToken", refreshToken!);
		if (route) {
			router.push(route);
		} else {
			router.push(`/create-password`);
		}
	};

	const verifyUserEmail = async (args: IVerifyEmail, route?: Href) => {
		const response = await mutationAdapter.mutate(args);
		if (response.state === ResponseState.Success) {
			console.log("verify email response", response);
			handleVerifySuccess(response, route);
		} else {
			handleVerifyFailed(response);
		}
	};

	const handleVerifyAccountFailed = ({ message }: IResetPassVerifyResponse) => {
		toast({
			type: "error", // or 'error' or 'delete'
			text1: message,
		});
	};

	const handleVerifyAccountSuccess = (
		{ token, message, refreshToken }: IResetPassVerifyResponse,
		route?: Href
	) => {
		saveCookie("token", token!);
		saveCookie("refreshToken", refreshToken!);
		if (route) {
			router.push(route);
		} else {
			router.push(`/signin`);
		}
		toast({
			type: "success", // or 'error' or 'delete'
			text1: message,
		});
	};

	const verifyUserAccount = async (
		args: IResetPassVerify,
		{ route }: { route?: Href }
	) => {
		const response = await mutationAdapter.mutate(args);
		if (response.state === ResponseState.Success) {
			handleVerifyAccountSuccess(response, route);
		} else {
			handleVerifyAccountFailed(response);
		}
	};

	const handleSignInFailed = ({ message }: ISignInResponse) => {
		toast({
			type: "error", // or 'error' or 'delete'
			text1: message,
		});
	};

	const handleSignInSuccess = (
		{ token, message, refreshToken }: ISignInResponse,
		email: string
	) => {
		saveCookie("token", token!);
		saveCookie("refreshToken", refreshToken!);

		saveCookie("email", email);
		toast({
			type: "success", // or 'error' or 'delete'
			text1: message,
		});
		router.dismissAll();
		router.replace("/(tabs)");
	};

	const signInUser = async (args: ISignIn) => {
		const response = await mutationAdapter.mutate(args);
		console.log(response);
		if (response.state === ResponseState.Success) {
			handleSignInSuccess(response, args?.email);
		} else {
			handleSignInFailed(response);
		}
	};

	const handleAddPasswordFailed = ({ message }: IAddPasswordResponse) => {
		toast({
			type: "error", // or 'error' or 'delete'
			text1: message,
		});
	};

	const handleAddPasswordSuccess = ({
		token,
		message,
		refreshToken,
	}: IAddPasswordResponse) => {
		saveCookie("token", token);
		saveCookie("refreshToken", refreshToken);

		toast({
			type: "success", // or 'error' or 'delete'
			text1: message,
		});
		router.push(`/push-notification`);
	};

	const addUserPassword = async (args: ICreatePassword) => {
		const response = await mutationAdapter.mutate(args);
		if (response.state === ResponseState.Success) {
			handleAddPasswordSuccess(response);
		} else {
			handleAddPasswordFailed(response);
		}
	};

	const handleForgotPasswordFailed = ({ message }: IForgotPasswordResponse) => {
		toast({
			type: "error", // or 'error' or 'delete'
			text1: message,
		});
	};

	const handleForgotPasswordSuccess = ({
		message,
	}: IForgotPasswordResponse) => {
		toast({
			type: "success", // or 'error' or 'delete'
			text1: message,
		});
		router.push(`/verify-account`);
	};

	const userForgotPassword = async (args: IForgotPassword) => {
		const response = await mutationAdapter.mutate(args);
		if (response.state === ResponseState.Success) {
			handleForgotPasswordSuccess(response);
		} else {
			handleForgotPasswordFailed(response);
		}
	};

	return {
		signUpUser,
		verifyUserEmail,
		addUserPassword,
		signInUser,
		userForgotPassword,
		verifyUserAccount,
	};
}
