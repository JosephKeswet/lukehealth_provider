import { z } from "zod";

export interface IUpdatePersonalInfo {
	firstName: string;
	lastName: string;
	email?: string;
	phone: string;
	dateOfBirth: string;
	address: string;
}

export const updatePersonalInfoSchema = z.object({
	firstName: z.string().min(2, "First name must be at least 2 characters long"),
	lastName: z.string().min(2, "Last name must be at least 2 characters long"),
	// email: z.string().email(),
	phone: z.string().min(10, "Phone number must be at least 10 digits long"),
	dateOfBirth: z.string(),
	address: z.string(),
});

export interface IUpdatePassword {
	password: string;
	newPassword: string;
	confirmPassword?: string;
}

export const updatePasswordSchema = z
	.object({
		password: z.string().min(8, "Password must be at least 8 characters long"),
		newPassword: z
			.string()
			.min(8, "New password must be at least 8 characters long"),
		confirmPassword: z
			.string()
			.min(8, "Confirm password must be at least 8 characters long"),
	})
	.refine(
		(data) => data.newPassword === data.confirmPassword,
		{ message: "Passwords must match", path: ["confirmPassword"] } // Add error to confirmPassword
	);

export interface IToggleNotifications {
	emailNotifications: boolean;
	pushNotifications: boolean;
}
