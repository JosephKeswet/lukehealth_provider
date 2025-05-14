import {
	QueryObserverResult,
	RefetchOptions,
	useQuery,
} from "@tanstack/react-query";
import { QueryAdapter } from "./adapters/queryAdapter";

export function useCustomQuery<Result>({
	queryFn,
	queryKey,
	enabled,
	refetchOnWindowFocus,
	staleTime,
}: {
	queryKey: string[];
	queryFn: () => Promise<Result>;
	enabled?: boolean;
	refetchOnWindowFocus?: boolean;
	staleTime?: number;
}): QueryAdapter<Result> {
	const { data, isPending, refetch, isRefetching, isError, isSuccess } =
		useQuery({
			queryKey,
			queryFn,
			enabled: enabled ? enabled : true,
			refetchOnWindowFocus: refetchOnWindowFocus ? refetchOnWindowFocus : true,
			staleTime: staleTime ? staleTime : 10 * (60 * 1000), // 10 mins
		});
	return {
		query: () => Promise.resolve(data as Result),
		data: data as Result,
		isPending: isPending,
		refetch,
		isRefetching,
		isError,
		isSuccess,
	};
}
