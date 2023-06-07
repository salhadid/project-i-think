import React, { useState, useEffect } from "react";
import axios from "axios";
import Draggable from "react-draggable";

const WeatherWidget = () => {
    const [zipCode, setZipCode] = useState("");
    const [weatherData, setWeatherData] = useState(null);

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=af7010de2b41cd014ba07badea295211&units=metric`
            );
            setWeatherData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (zipCode) {
            fetchWeatherData();
        }
    }, [zipCode]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeatherData();
    };

    const convertToFahrenheit = (celsius) => {
        return (celsius * 9) / 5 + 32;
    };

    return (
        <Draggable>
            <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-bold mb-2">Weather Widget</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="zipCode" className="block mb-2 font-bold">
                        Enter your zip code:
                    </label>
                    <div className="flex items-center space-x-2 mb-4">
                        <input
                            type="text"
                            id="zipCode"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="border rounded px-2 py-1 w-24"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        >
                            Get Weather
                        </button>
                    </div>
                </form>
                {weatherData && (
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                            alt="weather icon"
                            className="w-16 h-16"
                        />
                        <div>
                            <p className="text-2xl font-bold">
                                {Math.round(
                                    convertToFahrenheit(weatherData.main.temp)
                                )}
                                °F
                            </p>
                            <p>{weatherData.weather[0].description}</p>
                            <p>Humidity: {weatherData.main.humidity}%</p>
                            <p>Pressure: {weatherData.main.pressure} hPa</p>
                            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                            <p>Wind Direction: {weatherData.wind.deg}°</p>
                        </div>
                    </div>
                )}
            </div>
        </Draggable>
    );
};

export default WeatherWidget;
