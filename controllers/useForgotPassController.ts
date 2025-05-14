import { ResponseState } from "@/constants/enums";
import { queryKeys } from "@/constants/queryKeys";
import { useCustomMutation } from "@/frameworks/useCustomMutation";
import { useCustomQuery } from "@/frameworks/useCustomQuery";
import useAuth from "@/hooks/mutations/useAuth";
import useToast from "@/hooks/useToast";
import { forgotPassword } from "@/services/authService";
import useUserService from "@/services/useUserService";
import { forgotPasswordSchema, IForgotPassword } from "@/types/auth/payload";
import {
	IUpdatePersonalInfo,
	updatePersonalInfoSchema,
} from "@/types/user/payload";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function useForgotPassController() {
	// const mutation = useCustomMutation(forgotPassword);
	// const { userForgotPassword } = useAuth(mutation);
	const [isPending, setIsPending] = useState<boolean>(false);
	const { toast } = useToast();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IForgotPassword>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	async function handleForgotPassword(data: IForgotPassword) {
		setIsPending(true);
		const { message, state } = await forgotPassword(data);
		if (state === ResponseState.Success) {
			toast({
				type: "success", // or 'error' or 'delete'
				text1: message,
			});
			setIsPending(false);
			router.push({
				pathname: "/verify-account",
				params: {
					email: data.email,
				},
			});
		} else {
			toast({
				type: "error", // or 'error' or 'delete'
				text1: message,
			});
			setIsPending(false);
		}
	}

	function onSubmit(data: IForgotPassword) {
		handleForgotPassword(data);
	}

	return {
		control,
		handleSubmit,
		errors,
		onSubmit,
		isPending,
	};
}
