import { IonContent, IonText, IonIcon, IonSkeletonText } from "@ionic/react";
import "./Home.css";
import ToastService from "../../../core/services/toast/toast";
import WeatherData from "../../services/data/weather-data/weather-data";
import React, { useEffect, useState } from "react";
import { WeatherDataModel } from "../../../core/models/weather-data-response.model";
import Loading from "../loading/Loading";
import GeolocationService from "../../services/helpers/geolocation/geolocation";
import UtilService from "../../../core/services/util/util";
import { moon, sunny } from "ionicons/icons";
import WeatherCodes from "../../constants/constants";
import { format } from "date-fns";
import { ForecastModel } from "../../../core/models/forecast.model";

const Home: React.FC = () => {
	const { error } = ToastService();
	const { getCurrentWeatherData } = WeatherData();
	const { getCurrentPosition, getCityAndCountry } = GeolocationService();
	const {
		getWeatherQueryParams,
		switchDarkTheme,
		switchLightTheme,
		getCurrentWeatherIc
	} = UtilService();
	const [weatherData, setWeatherData] = useState<WeatherDataModel>();
	const [forecastDays, setForecastDays] = useState<ForecastModel[]>();
	const [currentLocationData, setCurrentLocationData] = useState<string>();
	const [darkMode, setDarkMode] = useState<boolean>(false);

	useEffect(() => {
		toggleTheme();
		const fetchCurrentPosition = async () => {
			try {
				const coords = await getCurrentPosition();
				const weatherQueryParams = getWeatherQueryParams(
					coords.latitude,
					coords.longitude
				);
				const cityAndCountry = await getCityAndCountry(
					coords.latitude,
					coords.longitude
				);
				setCurrentLocationData(cityAndCountry);
				const currentWeatherData =
					await getCurrentWeatherData(weatherQueryParams);
				setForecastDaysData(currentWeatherData);
				setWeatherData(currentWeatherData);
			} catch {
				error("Error while fetching weather data");
			}
		};
		fetchCurrentPosition();
	}, []);

	const setForecastDaysData = (wdta: WeatherDataModel) => {
		const daysData: ForecastModel[] = [];
		wdta?.daily?.temperature_2m_min.forEach((wd, index) => {
			daysData.push({
				temperature: wd,
				date: wdta?.daily?.time[index],
				code: wdta?.daily?.weather_code[index]
			});
		});
		setForecastDays(daysData);
	};

	const transformTextWeather = (): string | undefined => {
		const code = weatherData?.current?.weather_code;
		return WeatherCodes.find((weather) => weather.code === code)?.state;
	};

	const toggleTheme = () => {
		setDarkMode(!darkMode);
		if (darkMode) {
			switchDarkTheme();
		} else {
			switchLightTheme();
		}
	};

	const currentWeatherIc = (): string => {
		if (weatherData) {
			const code = weatherData.current.weather_code;
			return getCurrentWeatherIc(code);
		}
		return "";
	};

	const renderGuard = (component: any, opts?: string) => {
		if (weatherData) {
			return component;
		}
		if (opts === "circle") {
			return (
				<IonSkeletonText
					animated={false}
					className="circle-skeleton"
				/>
			);
		} else {
			return (
				<IonSkeletonText
					animated={false}
					className="skeleton-text"
				/>
			);
		}
	};

	return (
		<IonContent
			scrollY={false}
			fullscreen>
			<>
				{!weatherData ? (
					<Loading message="Loading weather data..." />
				) : null}
				<svg
					className="background"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1440 320">
					<path d="M0,0L80,16C160,32,320,64,480,106.7C640,149,800,203,960,234.7C1120,267,1280,277,1360,282.7L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
				</svg>
				<div className="content">
					<div className="header">
						<IonText className="currentDate">
							{format(Date.now(), "MMMM, dd - HH:mm")}
						</IonText>
						<IonIcon
							onClick={toggleTheme}
							aria-hidden="true"
							icon={darkMode ? sunny : moon}
							className="icon-weather"
						/>
					</div>
					<div className="location-container">
						{renderGuard(
							<IonText className="current-location">
								{currentLocationData}
							</IonText>
						)}
						{renderGuard(
							<IonIcon
								aria-hidden="true"
								icon={currentWeatherIc()}
								className="icon-current-weather"
							/>,
							"circle"
						)}
						{renderGuard(
							<IonText className="weather-temperature">
								{weatherData?.current.temperature_2m}{" "}
								<span className="small-text">
									{weatherData?.current_units.temperature_2m}
								</span>
							</IonText>
						)}
						{renderGuard(
							<IonText className="description-weather">
								<p>{transformTextWeather()}</p>
							</IonText>
						)}
					</div>
					<div className="forecast-container">
						<IonText className="forecast-title">
							6-days forecast
						</IonText>
						<div className="forecast-days-container">
							{forecastDays ? (
								forecastDays.map((day, index) => {
									return (
										<div
											className="forecast-day"
											key={index}>
											<div className="header-card">
												<IonText className="date">
													{format(
														day.date,
														"MMMM, dd"
													)}
												</IonText>
												<IonIcon
													icon={getCurrentWeatherIc(
														day.code
													)}
													className="icon-weather-small"
												/>
											</div>
											<IonText className="temperature">
												{day.temperature}{" "}
												<span className="small-text-card">
													{
														weatherData
															?.current_units
															.temperature_2m
													}
												</span>
											</IonText>
										</div>
									);
								})
							) : (
								<>
									{Array.from({ length: 4 }).map(
										(key, index) => (
											<IonSkeletonText
												key={index}
												animated={false}
												className="skeleton-text-big"
											/>
										)
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</>
		</IonContent>
	);
};

export default Home;
