import { ResponseState } from "@/constants/enums";
import { useCustomMutation } from "@/frameworks/useCustomMutation";
import { useCustomQuery } from "@/frameworks/useCustomQuery";
import useAuth from "@/hooks/mutations/useAuth";
import useToast from "@/hooks/useToast";
import { forgotPassword, resetPassword } from "@/services/authService";
import useUserService from "@/services/useUserService";
import {
	forgotPasswordSchema,
	IForgotPassword,
	IResetPasssword,
	resetPasswordSchema,
} from "@/types/auth/payload";
import {
	IUpdatePersonalInfo,
	updatePersonalInfoSchema,
} from "@/types/user/payload";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function useResetPassController() {
	//     {
	// 	email,
	// 	otp,
	// }: {
	// 	otp: string;
	// 	email: string;
	// }
	// const mutation = useCustomMutation(forgotPassword);
	// const { userForgotPassword } = useAuth(mutation);
	const [isPending, setIsPending] = useState<boolean>(false);
	const { toast } = useToast();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IResetPasssword>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	async function handleResetPassword(data: IResetPasssword) {
		setIsPending(true);
		const { message, state } = await resetPassword({
			password: data.password,
		});
		if (state === ResponseState.Success) {
			toast({
				type: "success", // or 'error' or 'delete'
				text1: message,
			});
			setIsPending(false);
			router.push("/(tabs)");
		} else {
			toast({
				type: "error", // or 'error' or 'delete'
				text1: message,
			});
			setIsPending(false);
		}
	}

	function onSubmit(data: IResetPasssword) {
		handleResetPassword(data);
	}

	return {
		control,
		handleSubmit,
		errors,
		onSubmit,
		isPending,
	};
}
