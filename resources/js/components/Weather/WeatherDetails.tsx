import { ArrowLeft, Clock, Gauge, HelpCircle, ShieldAlert, Sunrise, Sunset } from "lucide-react";
import { Glass1 } from "../utils/Morphisim";
import DetailCard, { WindCard } from "./DetailsCard";
import { useLocalStorage } from "@/hooks/useLocalStorage";


export function WeatherDetails({data,closeDetails, selectedDay  }){
    // console.log(data.data.data)
    const[windUnit,setWindUnit]= useLocalStorage('wind_unit','km/h  ')
    const weather = data?.data?.data;
    const weatherDate = new Date(weather?.forecast[0]?.date)
    // console.log(24*1 + 23)
    for(let i=24*selectedDay; i<=24*selectedDay + 23; i++){
        console.log(weather.hourly[i].time)
        console.warn(i)
    }

    function getUvLevel(uv) {
    if (uv <= 2) return { label: "Niski", color: "green" };
    if (uv <= 5) return { label: "Umiarkowany", color: "yellow" };
    if (uv <= 7) return { label: "Wysoki", color: "orange" };
    return { label: "Bardzo wysoki", color: "red" };
    }
        return(
             <Glass1 className="min-h-full w-full fixed inset-0  overflow-y-auto top-0 z-100  rounded-2xl">
              <div className=" text-white relative p-5 flex flex-row w-full align-center justify-evenly ">
                <button 
                onClick={closeDetails}
                className="h-12 w-12 rounded-4xl  flex items-center justify-center gap-12 border-white/10 border-2 p-1 bg-black/10 backdrop-blur-[3px] font-semibold ">
                    <ArrowLeft className="text-white"/>
                </button>
                <button  className="h-12 w-fit rounded-4xl  flex items-center justify-center  border-white/10 border-2 p-1 bg-black/10 backdrop-blur-[3px] font-semibold ">
                     <span>{weatherDate.toLocaleDateString('pl-PL', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        })}</span>
                </button>
                <button  className="h-12 w-12 rounded-4xl  flex items-center justify-center gap-12 border-white/10 border-2 p-1 bg-black/10 backdrop-blur-[3px] font-semibold ">
                    <HelpCircle className="text-white"/>
                </button>
                 </div>
                <div className="font-bold p-2">
                    <h1 className="text-2xl">
                        Weather Details
                    </h1>
                    <div className="w-[95vw] grid grid-cols-2 gap-3 my-4 mx-auto" >
                        <DetailCard
                        label="Sunrise"
                        color="orange"
                        value={new Date(weather.forecast[selectedDay].sunrise).toLocaleTimeString('pl-PL',{hour:'2-digit', minute:'2-digit'})}
                        unit="h"
                        icon={<Sunrise size={13}/>}

                        />
                        <DetailCard
                        label="Sunset"
                        color="orange"
                        value={ new Date(weather.forecast[selectedDay].sunset).toLocaleTimeString('pl-PL',{hour:'2-digit', minute:'2-digit'})}
                        unit="h"
                        icon={<Sunset size={13}/>}

                        />
                        <DetailCard
                        label="Sunshine"
                        value={(weather.forecast[selectedDay].daylight_duration / 3600).toFixed(2)}
                        unit="h"
                        color="amber"
                        icon={<Clock size={13} />}
                        />
                        <DetailCard 
                        label="Pressure"
                        icon={<Gauge size={13}/>}
                        color="indigo"
                        unit="hPa"
                        value={weather.forecast[selectedDay].pressure}
                        />
                        <DetailCard 
                        label="UV Index"
                        icon={<ShieldAlert size={13}/>}
                        color="red"
                        unit={<span style={{color:getUvLevel(weather?.forecast[selectedDay]?.uv_index).color}}>{getUvLevel(weather?.forecast[selectedDay]?.uv_index).label}</span>}
                        value={weather?.forecast[selectedDay]?.uv_index}
                        />
                        
                        
                        
                    </div>
                    <h1 className="text-xl">Temperature</h1>
                    <div className="w-full p-4  flex  gap-4 overflow-auto">
                    {/* {weather?.hourly?.slice(24 * selectedDay, 24 * selectedDay + 24)
                            .map((hour, index) => {
                                const i = 24 * selectedDay + index;
                                return (
                                <Card index={i}/>
                                );
                            })} */}
                    </div>
                    <h1 className="text-xl">Wind</h1>
                    <div className="w-full p-2  flex  gap-4 overflow-auto">
                    {weather?.hourly?.slice(24 * selectedDay, 24 * selectedDay + 24)
                            .map((hour, index) => {
                                const i = 24 * selectedDay + index;

                                console.log(hour.time);
                                console.warn(i);

                                return (
                                <WindCard
                                speed={weather.hourly[i].wind_speed}
                                time={weather.hourly[i].time}
                                direction={weather.hourly[i].wind_direction}
                                unit={windUnit}
                                />
                                );
                            })}
                    </div>
                </div>
                     
            </Glass1>
        )
    }