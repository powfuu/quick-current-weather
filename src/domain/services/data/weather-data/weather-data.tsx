// weather-data apis
import { fetchApi } from "../../../../core/interceptors/interceptor";
import { WeatherDataModel } from "../../../../core/models/weather-data-response.model";

const weatherData = () => {
	const weatherContextApiV1 = "https://api.open-meteo.com/v1";
	const fetchData = fetchApi;

	const getCurrentWeatherData = async (
		queryParams: string
	): Promise<WeatherDataModel> => {
		const response = await fetchData(
			`${weatherContextApiV1}/${queryParams}`
		);
		return response as WeatherDataModel;
	};

	return { getCurrentWeatherData };
};

export default weatherData;
