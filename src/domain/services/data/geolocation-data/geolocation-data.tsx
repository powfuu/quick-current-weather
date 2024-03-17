// geolocation-data apis
import { fetchApi } from "../../../../core/interceptors/interceptor";
import { WeatherDataModel } from "../../../../core/models/weather-data-response.model";

const geolocationData = () => {
	const geolocationContextApi = "https://nominatim.openstreetmap.org/";
	const fetchData = fetchApi;

	const getCurrentLocationData = async (
		queryParams: string
	): Promise<any> => {
		const response = await fetchData(
			`${geolocationContextApi}/${queryParams}`
		);
		return response;
	};

	return { getCurrentLocationData };
};

export default geolocationData;
