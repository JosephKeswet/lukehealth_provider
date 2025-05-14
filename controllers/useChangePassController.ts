import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCustomMutation } from "@/frameworks/useCustomMutation";
import { changePassword, signIn } from "@/services/authService";
import { ISignIn, signInSchema } from "@/types/auth/payload";
import { router } from "expo-router";
import useAuth from "@/hooks/mutations/useAuth";
import useUser from "@/hooks/mutations/useUser";
import { IUpdatePassword, updatePasswordSchema } from "@/types/user/payload";

export const useChangePassController = () => {
	const mutation = useCustomMutation(changePassword);
	const { changeUserPassword } = useUser(mutation);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IUpdatePassword>({
		resolver: zodResolver(updatePasswordSchema),
		defaultValues: {
			newPassword: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = (data: IUpdatePassword) => {
		changeUserPassword(data);
	};

	return {
		control,
		handleSubmit,
		errors,
		onSubmit,
		mutation,
	};
};
