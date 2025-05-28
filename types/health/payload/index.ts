import { GenderCategory } from "@/constants/enums";
import { z } from "zod";

export interface IHealthInfo {
	gender: GenderCategory;
	dateOfBirth: string;
	medicalCondition: string;
	allergies: string[];
	emergencyContact: string;
}

export const healthInfoSchema = z.object({
	gender: z.enum(["male", "female"]),
	dateOfBirth: z.string(),
	medicalCondition: z.string(),
	allergies: z.array(z.string()).min(1),
	emergencyContact: z.string(),
});

export interface IAddMedication {
	userId: string;
	brandName: string;
	dose: any;
	frequencyOfUsage: "once-daily" | "twice-daily" | "thrice-daily" | "as-needed"; // Adjust if needed
	administrationRoute: string;
	prescribingClinic: string;
	diagnosis: string;
	startDate: string; // ISO date format (YYYY-MM-DD)
	endDate: string; // ISO date format (YYYY-MM-DD)
	prescriptionUrl?: string;
	additionalDetails?: string; // Optional field
	doseWeightUnit?: string; // Adjust if needed
	medicationTimes?: string[];
}

export const medicationSchema = z.object({
	userId: z.string(),
	brandName: z.string().min(1, { message: "Brand name is required" }),
	dose: z.string().min(1, { message: "Dose is required" }),
	doseWeightUnit: z.string().optional(),
	frequencyOfUsage: z.enum([
		"once-daily",
		"twice-daily",
		"thrice-daily",
		"as-needed",
	]),

	administrationRoute: z
		.string()
		.min(1, { message: "Administration route is required" }),
	prescribingClinic: z
		.string()
		.min(1, { message: "Prescribing clinic is required" }),
	diagnosis: z.string().min(1, { message: "Diagnosis is required" }),
	startDate: z.string().min(1, { message: "Start date is required" }),
	endDate: z.string().min(1, { message: "End date is required" }),
	prescriptionUrl: z.string().optional(),
	additionalDetails: z.string().optional(),
	medicationTimes: z
		.array(z.string().min(1, { message: "Medication time is required" }))
		.optional(),
});

export interface IUpdateHealthInfo {
	bloodGroup: string;
	genoType: string;
	allergies: string[];
	otherMedicalConditions: string[];
	weight: string;
	lifestyleConditions: string[];
}

export const updateHealthInfoSchema = z.object({
	bloodGroup: z.string().min(1, { message: "Blood group is required" }),
	genoType: z.string().min(1, { message: "Genotype is required" }),
	allergies: z
		.array(z.string().transform((val) => val.toLowerCase()))
		.default([]),
	otherMedicalConditions: z
		.array(z.string().transform((val) => val.toLowerCase()))
		.default([]),
	weight: z
		.string()
		.min(1, { message: "Weight is required" })
		.refine(
			(val) => {
				const num = parseFloat(val);
				return !isNaN(num) && num > 0 && num <= 500;
			},
			{ message: "Weight must be between 0 and 500 kg" }
		),
	lifestyleConditions: z
		.array(z.string().transform((val) => val.toLowerCase()))
		.default([]),
});

export interface IMarkCompliance {
	medicationId: string;
	date: string;
	doseTime: string;
}

export interface ILogVitals {
	bloodPressure: string;
	bloodSugar: string;
	pulse: string;
}

export const logVitalSchema = z.object({
	bloodPressure: z.string().min(1, {
		message: "Please enter a blood pressure",
	}),
	bloodSugar: z.string().min(1, {
		message: "Please enter a blood sugar",
	}),
});
