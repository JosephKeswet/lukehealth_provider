import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCustomMutation } from "@/frameworks/useCustomMutation";
import { signIn } from "@/services/authService";
import { ISignIn, signInSchema } from "@/types/auth/payload";
import { router } from "expo-router";
import useAuth from "@/hooks/mutations/useAuth";

export const useSignInController = () => {
	const mutation = useCustomMutation(signIn);
	const { signInUser } = useAuth(mutation);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ISignIn>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (data: ISignIn) => {
		signInUser(data);
		// router.push("/(tabs)");
		// signInUser(data); // Uncomment this line when using the actual signIn function from authService.ts
	};

	return {
		control,
		handleSubmit,
		errors,
		onSubmit,
		mutation,
	};
};
