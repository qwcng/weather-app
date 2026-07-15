import React,{useState,useEffect} from "react";
import axios from "axios";
import {Header} from '@/components/Header'
import { Wind,Droplet, Sun,Clock4,Calendar, ArrowLeft, Sidebar, ArrowDown, ChevronDown, TrashIcon, PlusIcon } from "lucide-react";
import { Chart } from "@/components/Charts";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { CenterAll, CenterRow } from "@/components/utils/Center";
import { Glass1 } from "@/components/utils/Morphisim";
import { useRadarAxis } from "@mui/x-charts";

 
export default function Weather(){
    const[newCity,setNewCity] = useState("");
    const[weather,serWeather]= useState([]);

    useEffect(()=>{
        async function fetchWeather(){
        await axios.get('/getWeather').then((response)=>{
            console.log(response.data)
            serWeather(response.data);
            console.log('zapisano')
            // console.log(weather);
            console.log(weather.data.current);
        }
    )

    }
    fetchWeather();


    },[])

    function handleCitySubmit(){
        console.log(`dodano ${newCity}`);
        setNewCity('');
    }
    function Card(){
        return(

        
        <div className="w-24 h-32 border-2 rounded-2xl flex flex-col justify-center items-center text-white" >
            <img src="weather/sun.png" alt="" className="w-16 object-contai"/>
            <span>{new Date().toLocaleDateString("pl-PL", {
                                weekday:"short"
                            
                            })}</span>
            <span className="font-semibold text-xl"> 32°C</span>
        </div>
        )
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
                <button className="h-12 w-12 rounded-4xl  flex items-center justify-center gap-12 bg-gray-600  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 ">
                    <ArrowLeft className="text-white"/>
                </button>
                <button className="h-12 w-38 rounded-4xl  flex items-center justify-center bg-gray-600  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 ">
                   <span className="font-md font-semibold text-white mr-2">Warszawa</span> <ChevronDown className="text-white"/>
                </button>
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
                    <h1 className="font-bold text-2xl text-white">Warszawa,<span className=" text-lg text-blue-50"> Poland</span></h1>
                    <img src="weather/sun.png" alt="" className="h-48" />
                    <h1 className="text-6xl font-extrabold text-white ">26 C</h1>
                    <span className="text-white"> Sooo Sunny</span>  
                 <div className="w-full flex flex-row justify-center items-center gap-14  text-white my-4 font-semibold text-xl">
                     <span className=" flex flex-row justify-center items-center"> <Wind className="mr-3"/>11km/h</span>
                     <span className=" flex flex-row justify-center items-center"> <Droplet className="mr-3"/>6%</span>
                     <span className=" flex flex-row justify-center items-center"> <Sun className="mr-3"/>8hr</span>
     
                 </div>                 
            </CenterAll>
            <Glass1>
              <div className="w-full h-fit p-2     overflow-x-hidden">
                    <span className=" flex flex-row text-white font-semibold "><Clock4/> Hourly Forecast</span>
                            {/* chart */}
                    <div className="w-full  flex  gap-4 overflow-x-auto">
                        <Card>

                        </Card>
                        
                        
                    </div>
                </div>
            </Glass1>
        </main>
        </>
    )

}