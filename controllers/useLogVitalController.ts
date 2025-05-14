import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCustomMutation } from "@/frameworks/useCustomMutation";
import { ILogVitals, logVitalSchema } from "@/types/health/payload";
import useMedicationService from "@/services/useMedicationService";
import useLogVital from "@/hooks/mutations/useLogVital";

export default function useLogVitalController() {
	const { logVitals } = useMedicationService();
	const mutation = useCustomMutation(logVitals);
	const { handleLogVital } = useLogVital(mutation);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ILogVitals>({
		resolver: zodResolver(logVitalSchema),
		defaultValues: {
			bloodPressure: "",
			bloodSugar: "",
		},
	});

	const onSubmit = (data: ILogVitals) => {
		handleLogVital(data);
	};

	return {
		control,
		handleSubmit,
		errors,
		onSubmit,
		mutation,
	};
}
