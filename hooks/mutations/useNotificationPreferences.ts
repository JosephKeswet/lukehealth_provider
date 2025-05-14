import { MutationAdapter } from "@/frameworks/adapters/mutationAdapter";
import { useStorage } from "../useStorage";
import { useQueryClient } from "@tanstack/react-query";
import useToast from "../useToast";
import { ResponseState } from "@/constants/enums";
import { IToggleNotificationsResponse } from "@/types/user/responses";
import { IToggleNotifications } from "@/types/user/payload";
import { apiRoutes } from "@/constants/api";

export default function useNotificationPreferences(
	mutationAdapter: MutationAdapter<any, any>
) {
	const { saveCookie } = useStorage();
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const handleToggleNotificationFailed = ({
		message,
	}: IToggleNotificationsResponse) => {
		toast({
			type: "error", // or 'error' or 'delete'
			text1: message,
		});
	};
	const handleToggleNotificationSuccess = ({
		message,
	}: IToggleNotificationsResponse) => {
		queryClient.invalidateQueries({
			queryKey: [apiRoutes.user.getUserInfo],
		});
		toast({
			type: "success", // or 'error' or 'delete'
			text1: message,
		});
	};
	const handleToggleNotificationPreference = async (
		args: IToggleNotifications
	) => {
		const response = await mutationAdapter.mutate(args);

		if (response.state === ResponseState.Success) {
			handleToggleNotificationSuccess(response);
		} else {
			handleToggleNotificationFailed(response);
		}
	};

	return {
		handleToggleNotificationPreference,
	};
}
