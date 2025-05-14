import { GenderCategory } from "@/constants/enums";
import { z } from "zod";

export interface ISignUp {
	firstName: string;
	lastName: string;
	email: string;
}

export interface IVerifyEmail {
	otp: string;
}

export interface IAddPassword {
	password: string;
}

export interface ISignIn {
	email: string;
	password: string;
}

export const signUpSchema = z.object({
	firstName: z
		.string()
		.min(2, { message: "Last name must be at least 2 characters long" }),
	lastName: z
		.string()
		.min(2, { message: "Last name must be at least 2 characters long" }),
	email: z.string().email({ message: "Invalid email address" }),
});

export const verifySchema = z.object({
	otp: z.string(),
});

export const createPasswordSchema = z
	.object({
		password: z
			.string()
			.min(3, "Password must be at least 8 characters long")
			.regex(
				/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/,
				"Password must contain at least one uppercase letter, one lowercase letter, a number, and a special character"
			),
		confirmPassword: z
			.string()
			.min(3, "Confirm password must be at least 8 characters long")
			.optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords must match",
		path: ["confirmPassword"], // Add error to confirmPassword
	});

export const signInSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export interface ICreatePassword {
	password: string;
	confirmPassword?: string;
}

export interface IForgotPassword {
	email: string;
}

export const forgotPasswordSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
});

export interface IResetPasssword {
	password: string;
	confirmPassword?: string;
}

export const resetPasswordSchema = z.object({
	password: z
		.string()
		.min(4, "Password must be at least 8 characters long")
		.regex(
			/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/,
			"Password must contain at least one uppercase letter, one lowercase letter, a number, and a special character"
		),
	confirmPassword: z
		.string()
		.min(4, "Confirm password must be at least 8 characters long")
		.optional(),
});

export interface IResetPassVerify {
	email: string;
	otp: string;
}
