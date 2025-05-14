import { queryKeys } from "@/constants/queryKeys";
import { useCustomMutation } from "@/frameworks/useCustomMutation";
import { useCustomQuery } from "@/frameworks/useCustomQuery";
import useHealth from "@/hooks/mutations/useHealth";
import useUserService from "@/services/useUserService";
import {
	IUpdateHealthInfo,
	updateHealthInfoSchema,
} from "@/types/health/payload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { apiRoutes } from "@/constants/api";

export default function useEditHealthController() {
	const { updateHealthInfo, getHealthData } = useUserService();
	const mutation = useCustomMutation(updateHealthInfo);
	const { getProfileData, getProfileInfo } = useUserService();
	const { updateUserHealthInfo } = useHealth(mutation);

	// Local state using useState for managing health data
	// const [otherMedicalConditions, setOtherMedicalConditions] = useState<
	// 	string[]
	// >([]);
	// const [allergies, setAllergies] = useState<string[]>([]);
	// const [lifestyleConditions, setLifestyleConditions] = useState<string[]>([]);
	// const [weight, setWeight] = useState<string>("");

	// Fetch profile data for pre-fill purposes
	const { data, isPending } = useCustomQuery({
		queryKey: [apiRoutes.health.healthData],
		queryFn: getHealthData,
		enabled: true,
	});

	const healthData = data?.data;

	// Pre-fill form with fetched health data
	// useEffect(() => {
	// 	if (healthData) {
	// 		setOtherMedicalConditions(healthData?.otherMedicalConditions || []);
	// 		setAllergies(healthData?.allergies || []);
	// 		setLifestyleConditions(healthData?.lifestyleConditions || []);
	// 		setWeight(healthData?.weight || "55");
	// 	}
	// }, [healthData]);

	// React Hook Form to manage form data and validation
	const {
		control,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<IUpdateHealthInfo>({
		resolver: zodResolver(updateHealthInfoSchema),
		defaultValues: {
			bloodGroup: healthData?.bloodGroup || "",
			genoType: healthData?.genoType || "",
			allergies: healthData?.allergies || [],
			otherMedicalConditions: healthData?.otherMedicalConditions || [],
			weight: healthData?.weight || "55",
			lifestyleConditions: healthData?.lifestyleConditions || [],
		},
	});

	// On form submit, use the local state values
	function onSubmit(data: IUpdateHealthInfo) {
		if (!data.bloodGroup || !data.genoType || !data.weight) {
			return;
		}

		// Perform mutation or API call with updated state
		updateUserHealthInfo({
			...data,
			allergies: data.allergies,
			lifestyleConditions: data.lifestyleConditions,
			otherMedicalConditions: data.otherMedicalConditions,
		});
	}

	return {
		control,
		handleSubmit,
		errors,
		onSubmit,
		mutation,
		isPending,
		healthData,
		getValues,
	};
}
