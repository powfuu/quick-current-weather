import { partlySunny, rainy, sunny, thunderstorm } from "ionicons/icons";
import { darkTheme, lightTheme } from "../../../theme/themes";

// UtilService.tsx
const utilService = () => {
	const switchDarkTheme = () => {
		applyTheme(darkTheme.properties);
	};

	const switchLightTheme = () => {
		applyTheme(lightTheme.properties);
	};

	const applyTheme = (theme: { [key: string]: string }) => {
		Object.keys(theme).forEach((key) => {
			document.documentElement.style.setProperty(`${key}`, theme[key]);
		});
	};

	const generateId = (): number => {
		const min = 10000;
		const max = 99999;
		const id = Math.floor(Math.random() * (max - min + 1)) + min;
		return id;
	};

	const getWeatherQueryParams = (
		latitude: number,
		longitude: number
	): string => {
		return `forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`;
	};

	const getCurrentWeatherIc = (code: number): string => {
		if (code >= 1 && code <= 2) {
			return sunny;
		} else if (code >= 3 && code <= 4) {
			return partlySunny;
		} else if (code >= 5 && code <= 11) {
			return rainy;
		} else if (code >= 12) {
			return thunderstorm;
		}
		return partlySunny;
	};

	return {
		getWeatherQueryParams,
		generateId,
		switchLightTheme,
		switchDarkTheme,
		getCurrentWeatherIc
	};
};

export default utilService;
