import { weatherMap } from "@/utils/WeatherConditions";
import { useTranslation } from "react-i18next";
// import { useTransition, } from "react";
// const {t,i18n} = useTranslation();
export const getUvLevel = (uv:number) => {
    if (uv <= 2) return { label: "Niski", color: "green" };
    if (uv <= 5) return { label: "Umiarkowany", color: "yellow" };
    if (uv <= 7) return { label: "Wysoki", color: "orange" };
    return { label: "Bardzo wysoki", color: "red" };
}
export const getWindDirection = (degrees:number) => {
    if (degrees >= 337.5 || degrees < 22.5) return "N";
    if (degrees >= 22.5 && degrees < 67.5) return "NE";
    if (degrees >= 67.5 && degrees < 112.5) return "E";
    if (degrees >= 112.5 && degrees < 157.5) return "SE";
    if (degrees >= 157.5 && degrees < 202.5) return "S";
    if (degrees >= 202.5 && degrees < 247.5) return "SW";
    if (degrees >= 247.5 && degrees < 292.5) return "W";
    if (degrees >= 292.5 && degrees < 337.5) return "NW";
  }
export const formatDuration = (time:number) => {
    const hours = Math.floor(time/3600);
    const minutes = Math.floor((time%3600)/60);
    return `${hours}h ${minutes}m`;
};
export const getWeatherConditionIcon = (code:number) => {
    return weatherMap[code]?.icon || "/weather/cloud.png";
};
export const getWeatherConditionBackground = (code:number) => {
    if(!weatherMap[code]?.background) return "/weather/background/cloud.jpg";
     else return weatherMap[code]?.background;
};
export const getWeatherConditionLabel = (code:number) => {

    return weatherMap[code]?.name || "/weather/cloud.png";
};

