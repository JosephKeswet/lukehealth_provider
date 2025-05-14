// mutationAdapter.ts
export interface MutationAdapter<Args, Result> {
	mutate: (args: Args) => Promise<Result>;
	isPending: boolean;
	data: Result;
	isSuccess: boolean;
}
