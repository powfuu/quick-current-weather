import { Capacitor } from "@capacitor/core";
import GeolocationData from "../../data/geolocation-data/geolocation-data";
import { fetchApi } from "../../../../core/interceptors/interceptor";
import { Geolocation } from "@capacitor/geolocation";

interface GeolocationCoordinates {
	latitude: number;
	longitude: number;
}

const geolocationService = () => {
	const { getCurrentLocationData } = GeolocationData();
	const fetchData = fetchApi;

	const getCurrentPosition = () => {
		if (Capacitor.isNativePlatform()) {
			return handleNativePlatform();
		} else {
			return handleWebBrowserPlatform();
		}
	};

	const handleNativePlatform = async (): Promise<GeolocationCoordinates> => {
		try {
			const coordinates = await Geolocation.getCurrentPosition();
			const lat = coordinates.coords.latitude;
			const lng = coordinates.coords.longitude;
			return { latitude: lat, longitude: lng };
		} catch (error) {
			console.error("Error obteniendo la ubicación:", error);
			throw error;
		}
	};

	const handleWebBrowserPlatform = (): Promise<GeolocationCoordinates> => {
		return new Promise<GeolocationCoordinates>((resolve, reject) => {
			if (!navigator.geolocation) {
				reject("Geolocation is not supported by this browser.");
			} else {
				navigator.geolocation.getCurrentPosition(
					(position) => resolve(position.coords),
					(error) => reject(`Geolocation error: ${error.message}`)
				);
			}
		});
	};

	const getCityAndCountry = async (latitude: number, longitude: number) => {
		const queryParams = `reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`;
		const locationData = await getCurrentLocationData(queryParams);
		const city =
			locationData.name ||
			locationData.address.city ||
			locationData.address.town ||
			locationData.address.village;
		const country = locationData.address.country;
		return `${city}, ${country}`;
	};

	return { getCurrentPosition, getCityAndCountry };
};

export default geolocationService;
