import React,{useState,useEffect} from "react";
import axios from "axios";
import {Header} from '@/components/Header'
import { Wind,Droplet, Sun,Clock4,Calendar, ArrowLeft, Sidebar, ArrowDown, ChevronDown, TrashIcon, PlusIcon, LoaderCircle, Trash2Icon, X, Plus } from "lucide-react";
import { Chart } from "@/components/Charts";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { CenterAll, CenterRow, CenterX, CenterY } from "@/components/utils/Center";
import { Glass1 } from "@/components/utils/Morphisim";
import { useRadarAxis } from "@mui/x-charts";
import { weatherMap } from "@/utils/WeatherConditions"
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
 
export default function Weather(){
    const[newCity,setNewCity] = useState("");
    const[weather,setWeather]= useState(null);
    const[searching,setSearching]= useState(false);
    const[fetchedCities,setFetchCities]= useState();
    const[savedCity, setSavedCity]= useState();
    const[selectCity,setSelectedCity]=useState("warsszawa");
    // const[currentCity]

    useEffect(()=>{
        console.log("FETCH WEATHER");

        async function fetchWeather(){
            const response = await axios.get(`/getWeather?latitude=${selectCity.latitude}&longitude=${selectCity.longitude}`);
            setWeather(response.data);
        }
        
    

    
    fetchWeather();


    },[selectCity])

    useEffect(()=>{
        console.log("zmiana",weather);
        console.log('temp', weather?.data.current.temperature)
        // console.log (weather?.data.current.wind.speed)
        console.log("kod",weather?.data?.current?.weather_code);

    },[weather])

    useEffect(()=>{

        if(newCity.length>3){
            setTimeout(()=>{
                axios.get(`/searchCity?city=${newCity}`).then((response)=>{
                    // console.log(response.data.results)
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
    
    function Card({index}){


        const day =new Date(weather?.data?.hourly[index]?.time).toLocaleDateString("pl-PL", { weekday:"short" });
        const time = new Date(weather?.data?.hourly[index]?.time).toLocaleTimeString('pl-PL',{
            hour:"2-digit",
            minute:"2-digit"
        });
        return(

        
        <div className="w-26 h-34 shrink-0 border-1 rounded-2xl flex flex-col justify-center items-center text-white" >
            <img src={getWeatherConditionIcon(weather?.data?.hourly[index]?.weather_code)} alt="" className="w-16 object-contai"/>
           <span className="font-semibold text-xl"> {weather?.data?.hourly[index]?.temperature || <LoaderCircle className="animate-spin"size={12}/>}°C</span>
            <span>{day}, {time}</span>
            {/* <span>{time}</span>  */}
           
        </div>
        )
    }
    // useEffect(()=>{
        
    //         if(localStorage.getItem("savedCities")){
    //             localStorage.setItem("savedCities", JSON.stringify(savedCity||[]));
    //             setSavedCity(JSON.parse(localStorage.getItem("savedCities")))
    //         }
    //         else{
    // localStorage.setItem("savedCities",JSON.stringify([]))
    //         }
        
    //     // localStorage.setItem("savedCities",JSON.stringify())

    // },savedCity)
    useEffect(() => {
        const cities = localStorage.getItem("savedCity");

        if(cities){
            const city = JSON.parse(cities);
            setSelectedCity(city)
            console.warn(selectCity)
        }
    
    }, [savedCity])
    

    useEffect(()=>{

        const cities = localStorage.getItem("savedCity");

        if(cities){
        const city = JSON.parse(cities);
       
        console.log(city.name);
        }
        else{
            const defaultCity = {
                id:756135,
                name:"Warszawa",
                latitude:52.22977,
                longitude:21.01178,
                country:"Polska",
                admin1:"Województwo mazowieckie",
                admin2:"Warszaw",
            };

            localStorage.setItem(
                "savedCity",
                JSON.stringify(defaultCity)
            );

            setSavedCity(defaultCity);
            setSelectedCity(defaultCity);
        }

    },[]);
    useEffect(()=>{

    if(savedCity){
        localStorage.setItem(
            "savedCity",
            JSON.stringify(savedCity)
        );
    }

},[savedCity]);
        
    function handleCityAdd(city){
       setSavedCity(city)

       
    }
   
    
    
    return(
        <>
        
        {/* <Header/> */}
        {/* <header> */}
            {/* <button className="h-12 w-12 rounded-4xl  flex items-center justify-center bg-gray-600  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 border border-gray-100">
                <ArrowLeft className="text-white"/>
            </button> */}
        {/* </header> */}
        <main className="bg-[url('weather/bg-cloud.jpg')] backdrop-brightness-[10%] bg-center bg-cover  h-dvh">
            <div className="p-5 flex flex-row w-full align-center justify-evenly ">
                <button  className="h-12 w-12 rounded-4xl  flex items-center justify-center gap-12 bg-gray-600/60  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 ">
                    <ArrowLeft className="text-white"/>
                </button>
                <AnimatePresence>
                {searching ?
                (
                <motion.div
                layout
                initial={{
                    width: 150,
                    height: 48,
                    
                    y: 0,
                }}
                animate={{
                    width: 320,
                    height: 300,
                    
                    y: 10,
                }}
                exit={{
                    width: 150,
                    height: 48,
                    borderRadius: 999,
                    y: 0,
                }}
                transition={{
                    type: "tween",
                    stiffness: 220,
                    damping: 22,
                }}
                className="h-fit w-72 z-10 rounded-4xl  flex flex-col fixed p-4 justify-start items-center bg-gray-600/60 bg-opacity-0  bg-clip-padding backdrop-filter backdrop-blur-md  ">
                  
                   <button onClick={()=>setSearching(false)} className="flex flex-row"><span className="font-md font-semibold text-white mr-2" >{selectCity.name}</span> <ChevronDown className="text-white"/></button>
                    

                        <div className="font-md min-h-8 py-2 max-h-48 overflow-y-auto w-full flex flex-row justify-between items-center bg-black/10  font-semibold text-white mr-2">
                        
                         {newCity ? (
                            <div className="flex flex-col w-full">
                            {fetchedCities 
                                ?(
                                    fetchedCities.map((city)=>{
                                        
                                            return(
                                                <CenterX>
                                                    <button onClick={()=>handleCityAdd(city)} className="font-md  border-2  min-h-10 py-2 w-full flex flex-row justify-between items-center bg-black/30  font-semibold text-white mr-2">
                                                        
                                                           <div className="flex flex-row"><span className="font-md font-semibold text-white mr-2">{city.name},{city.admin1}</span> <Plus size={40} className="text-white"/></div>
                                                        
                                                    </button>
                                                </CenterX>
                                               
                                            )
                                })
                                )
                                :
                                (   
                                <>
                                    {/* <p>{city.name},<span className="text-sm">city.admin1</span></p> <Plus className="text-white"/> */}
                                    <span>wyszukiwanie</span>
                                </>
                                )}
                                
                           
                                
                            </div>)
                            :
                            (
                                <>
                                    <p>Warszawa,<span className="text-sm">mazowieckie</span></p> <X className="text-white"/>
                                </>
                                    
                            )
                            }
                                </div> 
                    
                    
                    <CenterRow>
                            <div className="bottom-0">
                                <input type="text" placeholder="Wpisz nazwę miejscowości" value={newCity} onChange={(e) => setNewCity(e.target.value)}  />
                                {/* <Input placeholder="Wpisz nazwę miejscowości" style"/> */}
                                <button onClick={handleCitySubmit}> <PlusIcon color="white"></PlusIcon></button>
                            </div>
                    </CenterRow>
                    
                </motion.div>
                )
                :(
                <motion.button 
                layout
                initial={{
                    width:150,
                    height:48
                }}
                animate={{
                    width:150,
                    height:48
                }}
                onClick={()=>setSearching(true)} className="h-12 w-38 rounded-4xl  flex  items-center justify-center bg-gray-600  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 ">
                   <span className="font-md font-semibold text-white mr-2">{selectCity.name}</span> <ChevronDown className="text-white"/>
                </motion.button>
                )
            }
            
            </AnimatePresence>


                <button className="h-12 w-12 rounded-4xl  flex items-center justify-center bg-gray-600  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 ">
                        <Sidebar className="text-white"/>
                </button>
               

                </div>
                {/* <CenterAll>
                    <div className="w-72 h-fit rounded-xl p-3 bg-gray-600  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30">
                        <CenterRow>
                            <span className="font-md font-semibold text-white text-xl mr-2">Warszawa</span>
                            <TrashIcon  className="text-white w-5 h-5"/>
                        </CenterRow>
                        <CenterRow>
                            <input type="text" placeholder="Wpisz nazwę miejscowości" value={newCity} onChange={(e) => setNewCity(e.target.value)}  />
                            <button onClick={handleCitySubmit}> <PlusIcon color="white"></PlusIcon></button>
                        </CenterRow>

                    </div>
                </CenterAll> */}
            <CenterAll>
                    <h1 className="font-bold text-2xl text-white">{selectCity.name},<span className=" text-lg text-blue-50"> {selectCity.admin2}</span></h1>
                    <img src={weather?.data.current
                    ? getWeatherConditionIcon(weather?.data.current.weather_code)
                    :"/weather/cloud.png"
                } alt="" className="h-48" />
                    <h1 className="text-6xl font-extrabold text-white ">{weather?.data.current.temperature || <LoaderCircle className="animate-spin"size={40}/>}</h1>
                    <span className="text-white"> Sooo Sunny</span>  
                 <div className="w-full flex flex-row justify-center items-center gap-14  text-white my-4 font-semibold text-md">
                     <span className=" flex flex-row justify-center items-center"> <Wind className="mr-3"/>{weather?.data.current.wind.speed || <LoaderCircle className="animate-spin"size={12}/>}km/h</span>
                     <span className=" flex flex-row justify-center items-center"> <Droplet className="mr-3"/>{weather?.data.current.humidity || <LoaderCircle className="animate-spin"size={12}/>}%</span>
                     <span className=" flex flex-row justify-center items-center"> <Sun className="mr-3"/>{formatDuration(weather?.data.today.daylight_duration) || <LoaderCircle className="animate-spin"size={12}/>}</span>
     
                 </div>                 
            </CenterAll>
            <Glass1>
              <div className="w-full h-fit p-2     overflow-x-hidden">
                    <span className=" flex flex-row text-white font-semibold "><Clock4/> Hourly Forecast</span>
                            {/* chart */}
                    <div className="w-full p-2  flex  gap-4 overflow-auto">
                        {weather?.data.hourly.map((hour,index)=>{
                            // console.log(index)
                            return <Card index={index}/>
                            
                        })}

                        
                        
                        
                    </div>
                </div>
            </Glass1>
        </main>
        </>
    )

}