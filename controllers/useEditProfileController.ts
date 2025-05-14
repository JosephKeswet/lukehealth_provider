import { apiRoutes } from "@/constants/api";
import { queryKeys } from "@/constants/queryKeys";
import { useCustomMutation } from "@/frameworks/useCustomMutation";
import { useCustomQuery } from "@/frameworks/useCustomQuery";
import useUser from "@/hooks/mutations/useUser";
import useUserService from "@/services/useUserService";
import {
	IUpdatePersonalInfo,
	updatePersonalInfoSchema,
} from "@/types/user/payload";
import { formatDateOfBirth, formatDateToDMY } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function useEditProfileController() {
	const { updateProfileInfo } = useUserService();
	const mutation = useCustomMutation(updateProfileInfo);
	const { getProfileData, getProfileInfo } = useUserService();
	const { updateUserPersonalInfo } = useUser(mutation);
	// const { data, isPending } = useCustomQuery({
	// 	queryKey: [queryKeys.user_profile],
	// 	queryFn: getProfileData,
	// 	enabled: true,
	// 	refetchOnWindowFocus: true,
	// 	staleTime: 60 * 1000, // 1 minute stale time
	// });
	const { data, isPending } = useCustomQuery({
		queryKey: [apiRoutes.user.getUserInfo],
		queryFn: getProfileInfo,
		enabled: true,
		refetchOnWindowFocus: true,
		staleTime: 60 * 1000, // 1 minute stale time
	});

	const { data: profile, isPending: isProfileLoading } = useCustomQuery({
		queryKey: [apiRoutes.user.profileData],
		queryFn: getProfileData,
		enabled: true,
		refetchOnWindowFocus: true,
		staleTime: 60 * 1000, // 1 minute stale time
	});
	const profileData = profile?.data;
	const userInfo = data?.data;
	const formattedDateOfBirth = formatDateToDMY(profileData?.dateOfBirth!);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IUpdatePersonalInfo>({
		resolver: zodResolver(updatePersonalInfoSchema),
		defaultValues: {
			firstName: userInfo ? userInfo?.firstName : "",
			lastName: userInfo ? userInfo?.lastName : "",
			phone: userInfo ? userInfo?.phone : "",
			// email: userInfo?.email,
			dateOfBirth: profileData ? profileData?.dateOfBirth : undefined,
			address: profileData ? profileData?.address! : "",
		},
	});

	function onSubmit(data: IUpdatePersonalInfo) {
		// console.log(data);
		updateUserPersonalInfo(data);
	}

	return {
		control,
		handleSubmit,
		errors,
		onSubmit,
		mutation,
		userInfo,
		profileData,
		isPending,
		isProfileLoading,
		formattedDateOfBirth,
	};
}
