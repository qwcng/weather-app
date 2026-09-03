import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Droplets, LoaderCircle, Navigation, Wind } from "lucide-react";

   
export function Card({weather, index, getWeatherConditionIcon,}){

        const day =new Date(weather?.data?.hourly[index]?.time).toLocaleDateString("pl-PL", { weekday:"short" });
        const time = new Date(weather?.data?.hourly[index]?.time).toLocaleTimeString('pl-PL',{
            hour:"2-digit",
            minute:"2-digit"
        });
        const[windUnit] = useLocalStorage("windUnit","km/h");
        return(

        
        <div className="w-30 h-40 shrink-0 border-1 border-gray-600 rounded-2xl flex flex-col justify-center items-center p-2   bg-white/5   text-white backdrop-blur-md" >
            <img src={getWeatherConditionIcon(weather?.data?.hourly[index]?.weather_code)} alt="" className="w-16 object-contai"/>
           <span className="font-semibold text-xl"> {weather?.data?.hourly[index]?.temperature || <LoaderCircle className="animate-spin"size={12}/>}{weather?.data?.current.temperature_unit}</span>
            <span>{day}, {time}</span>
            {/* <span>{time}</span>  */}
           <div className="flex flex-col gap-0.5 w-full text-center text-[11px] text-gray-300 border-t border-white/10 mt-1 p-1">
            <span className="flex items-center justify-center gap-1 text-sm text-blue-200/90 font-medium">
                <Droplets size={14} /> {weather?.data?.hourly[index]?.precipation ?? 0} mm
            </span>
            <span className="flex items-center justify-center gap-1 text-yellow-200/90 font-medium">
                <Wind size={11} />
                {weather?.data?.hourly[index]?.wind_speed ?? "–"} {windUnit === "mph" ? "mph" : "km/h"}
                {weather?.data?.hourly[index]?.wind_direction !== undefined && (
                <Navigation
                    size={10}
                    className="fill-current transition-transform duration-300"
                    style={{ transform: `rotate(${weather?.data?.hourly[index]?.wind_direction}deg)` }}
                />
                )}
            </span>
        </div>
        </div>
        )
    }