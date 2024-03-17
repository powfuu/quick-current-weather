// ToastService.tsx
import { useIonToast } from "@ionic/react";

const toastService = () => {
	const [present] = useIonToast();

	const presentToast = (message: string, color: string) => {
		present({
			message: message,
			color: color,
			duration: 1500,
			position: "top"
		});
	};

	const error = (errorMessage: string) => {
		presentToast(errorMessage, "danger");
	};

	const success = (successMessage: string) => {
		presentToast(successMessage, "success");
	};

	return { error, success };
};

export default toastService;
