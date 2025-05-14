import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

export interface QueryAdapter<Result> {
	query: () => Promise<Result>;
	data: Result | undefined;
	isPending: boolean;
	refetch: (
		options?: RefetchOptions
	) => Promise<QueryObserverResult<Result, Error>>;
	isRefetching: boolean;
	isError: boolean;
	isSuccess: boolean;
}
