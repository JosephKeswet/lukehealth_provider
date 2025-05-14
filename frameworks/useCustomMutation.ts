import { useMutation } from "@tanstack/react-query";
import { MutationAdapter } from "./adapters/mutationAdapter";

export function useCustomMutation<Args, Result>(
	mutationFn: (args: Args) => Promise<Result>
): MutationAdapter<Args, Result> {
	const { mutateAsync, isPending, data, isSuccess } = useMutation({
		mutationFn,
	});

	return {
		mutate: mutateAsync,
		isPending: isPending,
		data: data as Result,
		isSuccess: isSuccess,
	};
}
