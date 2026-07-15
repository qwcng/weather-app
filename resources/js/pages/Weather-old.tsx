import React,{useState,useEffect} from "react";
import axios from "axios";
import {Header} from '@/components/Header'
import { Wind,Droplet, Sun,Clock4,Calendar } from "lucide-react";
import { Chart } from "@/components/Charts";

 
export default function Weather(){
const pData = [26, 13, 18, 23, 21, 22, 22];
    const[weather,setWeather]= useState<any>(null);
    
        useEffect(()=>{
            axios.get('/getWeather').then(response=>{
                setWeather(response.data)
                console.log(response.data)
            })
            
        },[])
        if (!weather) return <div>Loading...</div>;
    type Props = {
        temp:number,
        time:string,
 }    
   
    function Card({temp,time}:Props){

        return(
            <>

            <div className="w-42 h-32 border-2 flex flex-col justify-center items-center" >
                <img src="weather/sun.png" alt="" className="w-16 object-contai"/>
                <span>{new Date(time).toLocaleDateString("pl-PL", {
                    weekday:"short"
                
                })}</span>
                <span className="font-semibold text-xl"> {temp}°C</span>

            </div>
            </>
        )
    }
    
    
    return(
        <>
        
        <Header/>
        <main>
            <div className="w-full m-h-30 flex flex-col justify-center items-center">
                <h1 className="font-bold text-2xl">Warsaw,<span className=" text-lg text-muted-foreground"> Poland</span></h1>
                <img src="weather/sun.png" alt="" className="h-48" />
                <h1 className="text-3xl font-bold ">29°C</h1>
                <span> Sooo Sunny</span>
            </div>
            <div className="w-full flex flex-row justify-center items-center gap-14 border-2 ">
                <span className=" flex flex-row justify-center items-center"> <Wind className="mr-3"/>11km/h</span>
                <span className=" flex flex-row justify-center items-center"> <Droplet className="mr-3"/>6%</span>
                <span className=" flex flex-row justify-center items-center"> <Sun className="mr-3"/>8hr</span>

            </div>
            <div className="w-full h-fit   overflow-x-hidden">
                <span className=" flex flex-row "><Clock4/> Hourly Forecast</span>
                <Chart data={pData}/>
                <div className="w-full  flex  gap-4 overflow-x-auto">
              {weather.daily.time.map((day: string, index: number) => (

                        <Card
                            key={day}
                            temp={weather.daily.temperature_2m_max[index]}
                            time={day}
                        />
                
                
            ))}
                </div>
            </div>
            

            
        </main>
        </>
    )

}