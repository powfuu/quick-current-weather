export interface WeatherDataModel {
	latitude: number;
	longitude: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;
	elevation: number;
	current_units: {
		time: string;
		interval: string;
		temperature_2m: string;
		weather_code: string;
	};
	current: {
		time: string;
		interval: number;
		temperature_2m: number;
		weather_code: number;
	};
	daily_units: {
		time: string;
		temperature_2m_max: string;
		temperature_2m_min: string;
		weather_code: string;
	};
	daily: {
		time: string[];
		temperature_2m_max: number[];
		temperature_2m_min: number[];
		weather_code: number[];
	};
}
