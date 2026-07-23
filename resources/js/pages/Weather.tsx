import React,{useState,useEffect} from "react";
import axios from "axios";
// import {Header} from '@/components/Header'
import { Wind,Droplet, Sun,Clock4,Calendar, ArrowLeft, Sidebar, ArrowDown, ChevronDown, TrashIcon, PlusIcon, LoaderCircle, Trash2Icon, X, Plus, Calendar1Icon, Calendar1, Thermometer, Gauge, Navigation, CloudRainWind, CloudRain } from "lucide-react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { CenterAll, CenterRow, CenterX, CenterY } from "@/components/utils/Center";
import { Glass1 } from "@/components/utils/Morphisim";
import { useRadarAxis } from "@mui/x-charts";
import { weatherMap } from "@/utils/WeatherConditions"
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header/Header";
import { Navbar } from "@/components/Navbar/Navbar";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {ResponsiveContainer,AreaChart,Area,XAxis,YAxis,Tooltip,CartesianGrid,} from "recharts";
const defaultCity = {
    id:756135,
    name:"Warszawa",
    latitude:52.22977,
    longitude:21.01178,
    country:"Polska",
    admin1:"Województwo mazowieckie",
    admin2:"Warszaw",
};
export default function Weather(){
    const[newCity,setNewCity] = useState("");
    const[weather,setWeather]= useState(null);
    const[searching,setSearching]= useState(false);
    const[fetchedCities,setFetchCities]= useState();
    // const[savedCity, setSavedCity]= useLocalStorage("savedCity",defaultCity);
    const[selectCity,setSelectedCity]=useLocalStorage("savedCity",defaultCity);
    const [temperatureUnit, setTemperatureUnit] =useLocalStorage("temperature","celsius");
    const [windUnit, setWindUnit] = useLocalStorage("wind","kmh");
    const [timeFormat, setTimeFormat] = useLocalStorage("time", "24h");
    const [savedWeather, setSavedWeather]= useLocalStorage('savedWeather',null)
    const [customTheme,setCustomTheme] =useLocalStorage('theme','default');
    const [customBackground,setCustomBackground] =useLocalStorage('background',null);


    function normalize(a,b){
        // console.log(Number(number.toFixed(2)));
        return (Math.abs(a - b) <=0.02)
    }
    useEffect(()=>{
        async function fetchWeather(){
            
            let url = `/getWeather?latitude=${selectCity.latitude}&longitude=${selectCity.longitude}&time=${'24h'}`;
            if(temperatureUnit ==="fahrenheit"){
                url+=`&temp=${temperatureUnit}`
                // `/getWeather?latitude=${selectCity.latitude}&longitude=${selectCity.longitude}&temp=${temperatureUnit}&time=${timeFormat}`);
            }
            if(windUnit==="mph"){
                url+=`&wind=${windUnit}`
            }
            const response = await axios.get(url)
            setWeather(response.data);
            setSavedWeather({
                cityId: selectCity.id,
                data: response.data
                })
        }
            if(savedWeather.data>0){
                if(savedWeather.cityId === selectCity.id){
                    const now = new Date();
                    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds());
                    const target = new Date(savedWeather.data.data.current.fetched_at);
                    const diff = Math.round((now-target)/1000/60);
                    if(diff >30){
                        fetchWeather();
                        return;
                    }
                    setWeather(savedWeather.data);
                    return;
                }
                else{
                    fetchWeather()
                }
            }
            else{
                fetchWeather();
            }
    },[selectCity,temperatureUnit])

    useEffect(()=>{

        if(newCity.length>3){
            setTimeout(()=>{
                axios.get(`/searchCity?city=${newCity}`).then((response)=>{
                    setFetchCities(response.data.results)
                })
                
            },500)
        }
    },[newCity])

    function handleCitySubmit(){
        console.log(`dodano ${newCity}`);
        
    }
    function formatDuration(time){
        const hours = Math.floor(time/3600);
        const minutes = Math.floor((time%3600)/60);
        return `${hours}h ${minutes}m`;
    }
    function getWeatherConditionIcon(code) {

        return weatherMap[code].icon;
    };
    function getWeatherConditionBackground(code) {

        if(!weatherMap[code]?.background) return "/weather/background/cloud.jpg";
        else return weatherMap[code]?.background;
    };
    function getWeatherConditionLabel(code) {

        return weatherMap[code].name;
    };

    
    
    function Card({index}){


        const day =new Date(weather?.data?.hourly[index]?.time).toLocaleDateString("pl-PL", { weekday:"short" });
        const time = new Date(weather?.data?.hourly[index]?.time).toLocaleTimeString('pl-PL',{
            hour:"2-digit",
            minute:"2-digit"
        });
        return(

        
        <div className="w-26 h-34 shrink-0 border-1 border-gray-600 rounded-2xl flex flex-col justify-center items-center text-white" >
            <img src={getWeatherConditionIcon(weather?.data?.hourly[index]?.weather_code)} alt="" className="w-16 object-contai"/>
           <span className="font-semibold text-xl"> {weather?.data?.hourly[index]?.temperature || <LoaderCircle className="animate-spin"size={12}/>}{weather?.data?.current.temperature_unit}</span>
            <span>{day}, {time}</span>
            {/* <span>{time}</span>  */}
            <span className="text-sm flex items-center gap-1">
                💧 {weather?.data?.hourly[index]?.precipation} mm
            </span>
        </div>
        )
    }
    
    function TemperatureBar({temperature}){
        const min = -10;
        const max = 45;
        const percent = Math.min(
                                Math.max(((temperature-min) / (max-min)) * 100, 0),100
                                );

        return(
            <div className="relative w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                <div
                    className="absolute h-full w-full"
                    style={{
                    background: `
                        linear-gradient(
                        90deg,
                        #2563eb 0%,
                        #06b6d4 20%,
                        #22c55e 50%,
                        #facc15 70%,
                        #ef4444 100%
                        )
                    `,
                    }}
                />

                <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white  border-black rounded-full"
                    style={{
                    left: `${percent}%`,
                    }}
                 />
            </div>
        )

    }
    function DailyCard({index}){

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const target = new Date(weather?.data?.forecast[index].date);
        const result =Math.round((target-today)/ 86400000);
        let day;
        if(result==0){
            day="Dzisiaj"
        }
        if(result==1){
            day="Jutro"
        }
        if(result>=2){
            day=target.toLocaleDateString("pl-PL",{
                weekday:"short"
            })
        }

        
        return(
            <div className="w-full h-12 shrink-0    rounded-2xl flex flex-row justify-evenly  items-center text-white" >
                <span className="font-semibold text-xl"> {day || <LoaderCircle className="animate-spin"size={12}/>} </span>

                <img src={getWeatherConditionIcon(weather?.data?.forecast[index].weather_code)} alt="" className="w-12 object-contain"/>
                <span className="font-semibold text-xl mr-3"> {weather?.data?.forecast[index].temperature_max || <LoaderCircle className="animate-spin"size={12}/>}{weather?.data?.current.temperature_unit}</span>
                <div className="w-42"><TemperatureBar temperature={weather?.data?.forecast[index].temperature_max}/> </div>
            
            </div>
        )
       }
    
    function handleCityAdd(city){
       setSelectedCity(city)

       
    }
    const chartData = weather?.data?.hourly?.slice(0,24).map((item) => {
    const timeLabel = new Date(item.time).toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return {
      time: timeLabel,
      temp: item.temperature,
      rain: item.precipation,
    };
  }) || []
  function getWindDirection(degrees){
    if (degrees >= 337.5 || degrees < 22.5) return "N";
    if (degrees >= 22.5 && degrees < 67.5) return "NE";
    if (degrees >= 67.5 && degrees < 112.5) return "E";
    if (degrees >= 112.5 && degrees < 157.5) return "SE";
    if (degrees >= 157.5 && degrees < 202.5) return "S";
    if (degrees >= 202.5 && degrees < 247.5) return "SW";
    if (degrees >= 247.5 && degrees < 292.5) return "W";
    if (degrees >= 292.5 && degrees < 337.5) return "NW";
  }
  const bgImage = customTheme === "custom" && customBackground
  ? customBackground
  : weather?.data?.current
    ? getWeatherConditionBackground(weather.data.current.weather_code)
    : "/weather/background/cloud.jpg";
    return(
        <>
        
        <main className={` backdrop-brightness-[10%] bg-cover bg-fixed bg-center bg-no-repeat  min-h-dvh pb-24`}
                style={{
                    
                    backgroundImage: `url(${bgImage
                    })`
                    
                }}>
                <Header searching={searching} setSearching={setSearching} newCity={newCity} setNewCity={setNewCity} fetchedCities={fetchedCities} handleCityAdd={handleCityAdd} selectCity={selectCity}/>

            <CenterAll>
                    <h1 className="font-bold text-2xl text-white">{selectCity.name},<span className=" text-lg text-blue-50"> {selectCity.admin2}</span></h1>
                    <img src={weather?.data.current
                    ? getWeatherConditionIcon(weather?.data.current.weather_code)
                    :"/weather/cloud.png"
                } alt="" className="h-48" />
                    <h1 className="text-6xl font-extrabold text-white ">{weather?.data.current.temperature || <LoaderCircle className="animate-spin"size={40}/>}{weather?.data?.current.temperature_unit}</h1>
                    <span className="text-white">{weather?.data.current
                    ? getWeatherConditionLabel(weather?.data.current.weather_code)
                    :"..."}</span>  
                 <div className="w-full flex flex-row justify-center items-center gap-14  text-white my-4 font-semibold text-md">
                     <span className=" flex flex-row justify-center items-center"> <Wind className="mr-3"/>{weather?.data.current.wind.speed || <LoaderCircle className="animate-spin"size={12}/>}km/h</span>
                     <span className=" flex flex-row justify-center items-center"> <Droplet className="mr-3"/>{weather?.data.current.humidity || <LoaderCircle className="animate-spin"size={12}/>}%</span>
                     <span className=" flex flex-row justify-center items-center"> <Sun className="mr-3"/>{formatDuration(weather?.data.today.daylight_duration) || <LoaderCircle className="animate-spin"size={12}/>}</span>
     
                 </div>                 
            </CenterAll>
        
            <Glass1 className="w-[95vw] mx-auto rounded-2xl">
              <div className="w-full h-fit p-2 overflow-x-hidden">
                    <span className=" flex flex-row text-gray-200 pb-1 border-b-1 border-gray-600  font-semibold  "><Clock4 className="mr-1.5"/> Hourly Forecast</span>
                            {/* chart */}
                    <div className="w-full p-2  flex  gap-4 overflow-auto">
                        
                        {weather?.data.hourly.map((hour,index)=>{
                            // console.log(index)

                            return <Card index={index}/>
                            
                        })}

                    </div>
                </div>
            </Glass1>


            <Glass1 className="mt-5 w-[95vw] mx-auto rounded-2xl">
                <div className="w-full h-fit  p-2  overflow-x-hidden">
                    <span className=" flex flex-row text-gray-200 font-semibold pb-1 border-b-1 border-gray-600 "><Calendar1 size={20} className="mr-1.5"/> 10-day forecast</span>
                            {/* chart */}
                    <div className="w-full h-64   p-2  flex  flex-col gap-4 overflow-y-auto">
                        {weather?.data.forecast.map((hour,index)=>{
                            // console.log(index)
                            return <DailyCard index={index}/>
                            
                        })}
                        

                        
                        
                        
                    </div>
                </div>

            </Glass1>
            <Glass1 className=" rounded-2xl p-4 mt-5 w-[95vw] mx-auto">
                <span className=" flex flex-row text-gray-200 pb-1 border-b-1 border-gray-600  font-semibold  "><Thermometer className="mr-1.5"/> Temperature Chart</span>

                <div className="w-full h-64 pt-4">
                    {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart 
                        data={chartData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                        <defs>
                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                        <XAxis 
                            dataKey="time" 
                            stroke="#cbd5e1" 
                            fontSize={12} 
                            tickLine={false}
                            
                        />
                        <YAxis 
                            stroke="#cbd5e1" 
                            fontSize={12} 
                            unit="°" 
                            // domain={['auto', 'auto']}
                            axisLine={false}
                            tickLine={false}
                            domain={[0, '13']}
                        />
                        <Tooltip
                            contentStyle={{
                            backgroundColor: "#0f172a",
                            borderColor: "#334155",
                            borderRadius: "0.5rem",
                            color: "#fff",
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="temp"
                            name="Temperatura"
                            stroke="#60a5fa"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorTemp)"
                        />
                        </AreaChart>
                    </ResponsiveContainer>
                    ) : (
                    <div className="w-full h-full flex justify-center items-center text-white">
                        <LoaderCircle className="animate-spin mr-2" size={20} />
                    </div>
                    )}
                </div>
            </Glass1>
            <div className="w-[95vw] grid grid-cols-2 gap-3 my-4 mx-auto" >
                <Glass1 className="w-full h-36 rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-xl overflow-hidden relative">
                    <div className="p-4 flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 flex items-center gap-1.5">
                        <Gauge size={13} /> Ciśnienie
                        </span>
                    </div>
                    <div className="text-center my-auto">
                        <span className="text-4xl sm:text-5xl font-black text-white tracking-tighter drop-shadow-md">
                        {weather?.data?.current?.pressure || "..."}
                        </span>
                        <span className="text-xs font-bold text-indigo-300 ml-1 uppercase">hPa</span>
                    </div>
                    </div>
                </Glass1>
                <Glass1 className="w-full h-36 rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-xl overflow-hidden relative">
                    <div className="p-4 flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-300/20 text-yellow-300 border-yellow-300/30 flex items-center gap-1.5">
                        <Gauge size={13} /> Wiatr
                        </span>
                    </div>
                    <div className="text-center my-auto">
                        <span className="text-4xl sm:text-5xl font-black text-white tracking-tighter drop-shadow-md">
                        {weather?.data.current.wind.direction || "..."}°
                        </span>
                        <span className="text-xs font-bold text-yellow-300 ml-1 uppercase">{getWindDirection(weather?.data.current.wind.direction)}</span>
                    </div>
                    </div>
                </Glass1>
                <Glass1 className="w-full h-36 rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-xl overflow-hidden relative">
                    <div className="p-4 flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-200 border border-red-500/30 flex items-center gap-1.5">
                        <Thermometer size={13} /> Odczuwalna
                        </span>
                    </div>
                    <div className="text-center my-auto">
                        <span className="text-4xl sm:text-5xl font-black text-white tracking-tighter drop-shadow-md">
                        {weather?.data?.current?.feels_like || "..."}°C
                        </span>
                        <span className="text-xs font-bold text-indigo-300 ml-1 uppercase"></span>
                    </div>
                    </div>
                </Glass1>
                <Glass1 className="w-full h-36 rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-xl overflow-hidden relative">
                    <div className="p-4 flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-500/30 flex items-center gap-1.5">
                        <CloudRainWind size={13} /> Deszcz
                        </span>
                    </div>

                    <div className="text-center my-auto">
                        <span className="text-4xl sm:text-5xl font-black text-white tracking-tighter drop-shadow-md">
                        {weather?.data?.forecast?.[0]?.precipitation_probability ?? "..."}
                        </span>
                        <span className="text-xs font-bold text-blue-300 ml-1 uppercase">%</span>
                    </div>
                    </div>
                </Glass1>

            </div>
        </main>
        
        </>
    )

}