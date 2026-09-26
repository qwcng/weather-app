import React,{useState,useEffect, use} from "react";
import axios from "axios";
// import {Header} from '@/components/Header'
import { Wind,Droplet, Sun,Clock4,Calendar, ArrowLeft, Sidebar, ArrowDown, ChevronDown, TrashIcon, PlusIcon, LoaderCircle, Trash2Icon, X, Plus, Calendar1Icon, Calendar1, Thermometer, Gauge, Navigation, CloudRainWind, CloudRain, ArrowUpRightIcon, PinIcon, LocateIcon, HelpCircle, Sunrise, Sunset, Clock, ShieldAlert, Share2, Save, ShareIcon, Droplets } from "lucide-react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { CenterAll, CenterRow, CenterX, CenterY } from "@/components/utils/Center";
import { Glass1, GlassDark } from "@/components/utils/Morphisim";
import { useRadarAxis } from "@mui/x-charts";
import { weatherMap } from "@/utils/WeatherConditions"
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header/Header";
import { Navbar } from "@/components/Navbar/Navbar";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {ResponsiveContainer,AreaChart,Area,XAxis,YAxis,Tooltip,CartesianGrid,} from "recharts";
import DetailCard, { WindCard } from "@/components/Weather/DetailsCard";
import { WeatherDetails } from "@/components/Weather/WeatherDetails";
import { Toast } from "@/components/Toaster";
import { usePage } from "@inertiajs/react";
import { Card } from "@/components/Weather/WeatherCard";
import { TemperatureBar } from "@/components/Weather/TemperatureBar";
import { getUvLevel,getWindDirection,getWeatherConditionBackground,getWeatherConditionIcon,getWeatherConditionLabel, formatDuration} from "@/utils/functions";
// import './i18n';
import { useTranslation } from "react-i18next";

// import { MoonComponent } from "@/components/Weather/MoonComponent";
// import {}
const defaultCity = {
    id:756135,
    name:"Warszawa",
    latitude:52.22977,
    longitude:21.01178,
    country:"Polska",
    admin1:"Województwo mazowieckie",
    admin2:"Warszaw",
};
type WeatherConditionsProps ={
    code:number,
}
export default function Weather(){
    const[newCity,setNewCity] = useState("");
    const[weather,setWeather]= useState(null);
    const[searching,setSearching]= useState(false);
    const[fetchedCities,setFetchCities]= useState();
    // const[savedCity, setSavedCity]= useLocalStorage("savedCity",defaultCity);
    const[favoriteCities,setFavoriteCities]= useLocalStorage("favoriteCities",[]);
    const[selectCity,setSelectedCity]=useLocalStorage("savedCity",defaultCity);
    const [temperatureUnit, setTemperatureUnit] =useLocalStorage("temperature","celsius");
    const [windUnit, setWindUnit] = useLocalStorage("wind","kmh");
    const [timeFormat, setTimeFormat] = useLocalStorage("time", "24h");
    const [savedWeather, setSavedWeather]= useLocalStorage('savedWeather',null)
    const [customTheme,setCustomTheme] =useLocalStorage('theme','default');
    const [customBackground,setCustomBackground] =useLocalStorage('background',null);
    const [detailsOpen,setDetailsOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(1);
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });
    const { auth } = usePage().props as any;
    const { t, i18n } = useTranslation();
    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
        }, 4000);
    };
    const saveToVersecDrive = async () => {
    try {
        if(auth?.user == undefined){
            showToast(t("LoginRequired"), "error");
            return;
        }
        showToast(t("GeneratingReport"), "loading");
        const payload = {
        cityName: selectCity.name,
        adminRegion: selectCity.admin2,
        currentWeather: weather?.data?.current,
        forecast: weather?.data?.forecast,
        hourly: weather?.data?.hourly,
        timeFormat: timeFormat,
        temperatureUnit: temperatureUnit,
        };
        const response = await axios.post("/saveToVersecDrive", payload);
        if (response.data?.original?.success || response.data?.success) {
            showToast(t("ReportGenerated"), "success");
        } else {
            showToast(t("ReportGenerationFailed"), "error");
        }
    } catch(error){
    alert("error");
  }
}
    useEffect(()=>{
        const fetchWeather = async () => {
            
            let url = `/getWeather?latitude=${selectCity.latitude}&longitude=${selectCity.longitude}&time=${'24h'}&lang=${i18n.language}`;
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
            if(savedWeather?.data>0){
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
                axios.get(`/searchCity?city=${newCity}&lang=${i18n.language}`).then((response)=>{
                    setFetchCities(response.data.results)
                })
            },500)
        }
    },[newCity])

    const viewDetails = (day) => {
        setSelectedDay(day);
        setDetailsOpen(true);
    };
    const closeDetails = () => {
        setSelectedDay(null);
        setDetailsOpen(false);
    };
    function DailyCard({index}){

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const target = new Date(weather?.data?.forecast[index].date);
        const result =Math.round((target-today)/ 86400000);
        let day;
        if(result==0){
            day=t("weather.today")
        }
        if(result==1){
            day=t("weather.tomorrow")
        }
        if(result>=2){
            day=target.toLocaleDateString(i18n.language,{
                weekday:"short"
            })
        }

        
        return(
            <div className="w-full h-12 shrink-0    rounded-2xl flex flex-row justify-evenly  items-center text-white" >
                <span className="font-semibold text-xl"> {day || <LoaderCircle className="animate-spin"size={12}/>} </span>

                <img src={getWeatherConditionIcon(weather?.data?.forecast[index].weather_code)} alt="" className="w-12 object-contain"/>
                <span className="font-semibold text-xl mr-3"> {weather?.data?.forecast[index].temperature_max || <LoaderCircle className="animate-spin"size={12}/>}{weather?.data?.current.temperature_unit}</span>
                <div className="w-42"><TemperatureBar temperature={weather?.data?.forecast[index].temperature_max}/> </div>
                <button value={weather?.data?.forecast[index].date} onClick={(e)=>{viewDetails(index)}}> <ArrowUpRightIcon size={32} /></button>
            </div>
        )
       }
    useEffect(()=>{
        console.log("favoriteCities",favoriteCities)
    },[favoriteCities])
    function handleCityAdd(city){
        setFavoriteCities((prevCities => {
            if(prevCities.some((c) => c.id === city.id)){
                return prevCities;
            }
            return [...prevCities, city];
        }));
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
  
  const bgImage = customTheme === "custom" && customBackground
  ? customBackground
  : weather?.data?.current
    ? getWeatherConditionBackground(weather.data.current.weather_code)
    : "/weather/background/cloud.jpg";
   
    return(
        <>
        <AnimatePresence>
                <Toast toast={toast} onClose={() => setToast((prev) => ({ ...prev, show: false }))} />
        </AnimatePresence>
        <div 
                className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat w-full h-full min-h-screen"
                style={{ backgroundImage: `url(${bgImage})` }}
            />
      <main className="min-h-screen pb-24">
                <Header searching={searching} setSearching={setSearching} newCity={newCity} setNewCity={setNewCity} fetchedCities={fetchedCities} favoriteCities={favoriteCities} setFavoriteCities={setFavoriteCities} handleCityAdd={handleCityAdd} selectCity={selectCity}/>
            {detailsOpen && savedWeather &&(
                <WeatherDetails  isOpen={detailsOpen} data={savedWeather} closeDetails={closeDetails} selectedDay={selectedDay} getWeatherConditionIcon={getWeatherConditionIcon}/>
            )}
            
            <CenterAll>
                    <h1 className="font-bold text-2xl text-white">{selectCity.name},<span className=" text-lg text-blue-50"> {selectCity.admin2}</span></h1>
                    <img src={weather?.data.current
                    ? getWeatherConditionIcon(weather?.data.current.weather_code)
                    :"/weather/cloud.png"
                } alt="" className="h-48" />
                    <h1 className="text-6xl font-extrabold text-white ">{weather?.data.current.temperature || <LoaderCircle className="animate-spin"size={40}/>}{weather?.data?.current.temperature_unit}</h1>
                    <span className="text-white">{weather?.data.current
                    ? t(getWeatherConditionLabel(weather?.data.current.weather_code))
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

                    <div className="w-full p-2  flex  gap-4 overflow-auto">
                        
                        {weather?.data.hourly.map((data,index)=>{
                            // console.log(index)

                            return <Card weather={weather} index={index} getWeatherConditionIcon={getWeatherConditionIcon}/>
                            
                        })}

                    </div>
                </div>
            </Glass1>


            <Glass1 className="mt-5 w-[95vw] mx-auto rounded-2xl">
                <div className="w-full h-fit  p-2  overflow-x-hidden">
                    <span className=" flex flex-row text-gray-200 font-semibold pb-1 border-b-1 border-gray-600 "><Calendar1 size={20} className="mr-1.5"/> 10-day forecast</span>
                    <div className="w-full h-64   p-2  flex  flex-col gap-4 overflow-y-auto">
                        {weather?.data.forecast.map((hour,index)=>{
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
                <DetailCard 
                label={t("WeatherConditions.Pressure")}
                icon={<Gauge size={13}/>}
                color="indigo"
                unit="hPa"
                value={weather?.data.current.pressure}
                />
                <DetailCard 
                label={t("WeatherConditions.Wind")}
                icon={<Wind size={13}/>}
                color="yellow"
                unit={getWindDirection(weather?.data.current.wind.direction)}
                value={weather?.data.current.wind.direction }
                />
                <DetailCard
                label={t("WeatherConditions.FeelsLike")}
                icon={<Thermometer size={13}/>}
                color="red"
                unit="°C"
                value={weather?.data?.current?.feels_like}
                />
                <DetailCard
                label={t("WeatherConditions.PrecipitationProbability")}
                icon={<CloudRain size={13}/>}
                color="blue"
                unit="%"
                value={weather?.data?.forecast?.[0]?.precipitation_probability}
                />
               <DetailCard 
                label={t("WeatherConditions.UVIndex")}
                icon={<ShieldAlert size={13}/>}
                color="red"
                unit={<span style={{color:getUvLevel(weather?.data?.forecast[0]?.uv_index).color}}>{getUvLevel(weather?.data?.forecast[0]?.uv_index).label}</span>}
                value={weather?.data?.forecast[0]?.uv_index}
                                       />
                 <DetailCard
                label={t("WeatherConditions.DewPoint")}
                icon={<Droplets size={13}/>}
                color="pink"
                unit="°C"
                value={weather?.data?.forecast?.[0]?.dewpoint}
                />
                {/* <MoonComponent /> */}
                    <Glass1 className="p-2 w-74 h-12 rounded-4xl border-2 border-white/10  bg-brown-900/10 backdrop-blur-[3px] font-semibold">
                    <CenterRow><button onClick={() => saveToVersecDrive()} className="flex flex-row items-center justify-center gap-2  text-center mx-auto"><span>{t("SaveToVersecDrive")}</span><Save className="inline-block"/></button></CenterRow>
                </Glass1>
            </div>
        </main>
        
        </>
    )

}