export interface WeatherInfo {
	clouds: { all: number };
	main: { temp: number; feels_like: number; sea_level: number; humidity: number };
    sys: {sunrise: number, sunset: number},
    timezone: number;
    weather: [{description: string, icon: string}];
    wind: {speed: number, deg: number};
}
