import { GlassSelect } from "@/components/utils/GlassSelect";
import { Glass1, GlassDark } from "@/components/utils/Morphisim";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Value } from "@radix-ui/react-select";
import { AnimatePresence,motion } from "framer-motion";
import { ArrowLeft, ChevronDown, Clock4, Settings, Sidebar } from "lucide-react";
import { useState } from "react";

export default function Profile(){
    // const [city, setCity] = useLocalStorage("t);
    const [temperatureUnit, setTemperatureUnit] =useLocalStorage("temperature","celsius");
    const [windUnit, setWindUnit] = useLocalStorage("wind","kmh");
    const [timeFormat, setTimeFormat] = useLocalStorage("time", "24h");

    
    // console.log(temperatureUnit)
    return (
        <main className="relative h-dvh   overflow-hidden bg-[url('/weather/background/cloudsun.jpg')] bg-center bg-cover">
            <div className=" relative p-5 flex flex-row w-full align-center justify-evenly ">
                <button  className="h-12 w-12 rounded-4xl  flex items-center justify-center gap-12 bg-gray-600/60  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 ">
                    <ArrowLeft className="text-white"/>
                </button>
                <AnimatePresence mode="wait">
                    <motion.button 
                    key="search-button"
                    whileHover={{
                        scale:1.1
                        
                    }}
                    initial={{
                        width: 150,
                        height: 48,
                        opacity: 0,
                    }}
                    animate={{
                        width: 150,
                        height: 48,
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    className="h-12 w-38 rounded-4xl  flex  items-center justify-center bg-gray-600  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 ">
                        <span className="font-md font-semibold text-white mr-2">Ustawienia</span> 
                    </motion.button>
                </AnimatePresence>

                <button className="h-12 w-12 rounded-4xl  flex items-center justify-center bg-gray-600  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 ">
                        <Sidebar className="text-white"/>
                </button>
               
            </div>
{/* <Glass1 className="w-[95vw] mx-auto rounded-2xl"> */}
            <div className="p-3 flex flex-col gap-5">
{/* border-b-1 border-gray-600 */}
                <span className=" flex flex-row text-gray-200 pb-1   font-semibold  "><Settings className="mr-1.5"/> Settings</span>


                <div>
                    <p className="text-gray-300 mb-2">
                        Temperatura
                    </p>

                    <GlassSelect
                        value={temperatureUnit}
                        onChange={setTemperatureUnit}
                        options={[
                            {
                            label:"Celcius",
                            value:"celsius"                       
                            },
                            {
                            label:"Ferenheit",
                            value:"fahrenheit"
                            },
                        ]}
                    />
                </div>


                <div>
                    <p className="text-gray-300 mb-2">
                        Wiatr
                    </p>

                    <GlassSelect
                        value={windUnit}
                        onChange={setWindUnit}
                        options={[
                            {
                            label:"km/h",
                            value:"kmh"                       
                            },
                            {
                            label:"mph",
                            value:"mph"
                            },
                        ]}
                    />
                </div>


                <div>
                    <p className="text-gray-300 mb-2">
                        Format czasu
                    </p>

                    <GlassSelect
                        value={timeFormat}
                        onChange={setTimeFormat}
                        options={[
                            {
                            label:"24h",
                            value:"24h"                       
                            },
                            {
                            label:"12h",
                            value:"12h"
                            },
                        ]}
                    />
                </div>
            </div>

          

        </main>
    );
}