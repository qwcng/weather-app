import { AnimatePresence,motion } from "framer-motion"
import { ArrowLeft, ChevronDown, LayoutGrid, Plus, Sidebar, X } from "lucide-react"
import { CenterRow, CenterX } from "../utils/Center"
import { useState } from "react";
import { Glass1 } from "../utils/Morphisim";

type Header={
    searching: boolean;
    setSearching:(bool:boolean)=>void;
    newCity: any;
    setNewCity: (value:any)=>void;
    fetchedCities: any;
    favoriteCities: any;
    setFavoriteCities: (value:any)=>void;
    handleCityAdd: (value:any)=>void;
    selectCity:any;


}



export function Header({searching,setSearching,newCity,setNewCity,fetchedCities, favoriteCities,setFavoriteCities, handleCityAdd, selectCity}: Header){
    const [appsOpen, setAppsOpen] = useState(false);
    return(
    <div className=" relative p-5 flex flex-row w-full align-center justify-evenly ">
                <button  className="h-12 w-12 rounded-4xl  flex items-center justify-center gap-12 border-white/10 border-2 p-1 bg-black/10 backdrop-blur-[3px] font-semibold ">
                    <ArrowLeft className="text-white"/>
                </button>
                <AnimatePresence mode="wait">
                {searching ?
                (
                <motion.div
                layoutId="glass-search-container"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="h-fit w-72 z-50 overflow-hidden rounded-4xl flex-col absolute top-0 origin-top p-4 justify-center items-center bg-gray-600/60 bg-opacity-0 bg-clip-padding backdrop-filter backdrop-blur-xs border-2 border-white/10 shadow-2xl">
                  
                   <button onClick={()=>setSearching(false)} className="flex flex-row"><span className="font-md font-semibold text-white mr-2" >{selectCity.name}</span> <ChevronDown className="text-white"/></button>
                        <div className="font-md min-h-8 max-h-48 overflow-y-auto w-full flex flex-col  justify-between items-center  font-semibold text-white mr-2">                       
                         {newCity ? (
                            <div className="  z-100 pt-2 flex flex-col w-full gap-2">
                            {fetchedCities 
                                ?(
                                    fetchedCities.map((city: any)=>{
                                            return(
                                                <CenterX key={city.name}>
                                                   <button
                                                    className="w-full flex flex-row justify-between items-center rounded-2xl border-2 border-white/10 p-2  click:scale-[0.90] active:bg-black/10 transition-all cursor-pointer group
                                                                "
                                                    onClick={() => handleCityAdd(city)}
                                                >
                                                    <span
                                                    className="w-[80%] text-white font-semibold text-left text-ellipsis overflow-hidden whitespace-nowrap"
                                                   
                                                    >
                                                    {city.name}
                                                    , {city.admin2}
                                                    </span>
                                                    
                                                    <Plus size={16} className="text-white hover:text-red-400" />
                                                  
                                                </button>
                                                </CenterX>                                         
                                            )
                                })
                                )
                                :
                                ( 
                                <>
                                    <span>wyszukiwanie</span>
                                </>
                                )}
                                
                           
                                
                            </div>)
                            :
                            (
                                <>
                                    {favoriteCities ? (
                                        favoriteCities.map((city:any)=>{
                                            return(
                                                <>
                                                <div
                                                    className="w-full flex flex-row justify-between items-center rounded-2xl border-2 border-white/10 p-2"
                                                >
                                                    <span
                                                    className="w-[80%] text-white font-semibold text-left text-ellipsis overflow-hidden whitespace-nowrap"
                                                    onClick={() => handleCityAdd(city)}
                                                    >
                                                    {city.name}
                                                    , {city.admin2}
                                                    </span>
                                                    <button
                                                    onClick={() => {
                                                        setFavoriteCities((prevCities) => prevCities.filter((c) => c.id !== city.id));
                                                    }}
                                                    className="p-1 hover:text-red-400 transition-colors"
                                                    >
                                                    <X size={16} className="text-white hover:text-red-400" />
                                                    </button>
                                                </div>
                                                </>
                                            )
                                        }
                                    )
                                )
                                :
                                (
                                    <span>Brak ulubionych miejscowości</span>
                                )
                                }
                                </>

                                   
                                
                                    
                            )
                            }
                                </div> 
                    
                    
                    <CenterRow>
                            <div className="bottom-0 flex flex-row items-center justify-center relative w-full">
                                <input type="text"  className="rounded-2xl border-2 border-white/10 p-2 bg-black/10 backdrop-blur-[3px] font-semibold overflow-hidden" placeholder="Wpisz nazwę miejscowości" value={newCity} onChange={(e) => setNewCity(e.target.value)} />
                                {newCity && (
                                    <X className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-white" onClick={() => setNewCity("")} />
                                )}
                            </div>
                    </CenterRow>
                    
                </motion.div>
                )
                :(
                <motion.button 
                layoutId="glass-search-container"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                whileHover={{ scale: 1.05 }}
                onClick={()=>setSearching(true)} 
                className="h-12 w-38 rounded-4xl flex items-center justify-center border-white/10 border-2 p-1 bg-black/10 backdrop-blur-[3px] font-semibold overflow-hidden">
                   <span className="font-md font-semibold text-white mr-2">{selectCity.name}</span> <ChevronDown className="text-white"/>
                </motion.button>
                )
            }
            
            </AnimatePresence>


                <div className="relative h-12 w-12 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {!appsOpen ? (
                        <motion.button
                            layoutId="glass-apps-container"
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            onClick={() => setAppsOpen(true)}
                            className="h-12 w-12 rounded-4xl flex items-center justify-center border-white/10 border-2 p-1 bg-black/10 backdrop-blur-[3px] font-semibold overflow-hidden"
                        >
                            <motion.div layoutId="glass-apps-icon">
                                <LayoutGrid className="text-white" />
                            </motion.div>
                        </motion.button>
                    ) : (
                        <motion.div
                            layoutId="glass-apps-container"
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className="absolute right-0 top-0 z-50 w-64 p-4 rounded-4xl border-2 border-white/10 bg-gray-600/60 bg-clip-padding backdrop-filter backdrop-blur-md flex flex-col gap-3 shadow-2xl overflow-hidden"
                        >
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.2 }}
                                className="flex flex-col gap-3"
                            >
                                <div className="flex items-center justify-between pb-1 border-b border-white/10">
                                    <span className="font-semibold text-sm text-white pl-1">Ekosystem Versec</span>
                                    <button
                                        onClick={() => setAppsOpen(false)}
                                        className="p-1 rounded-full hover:bg-white/10 text-white transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="flex flex-col gap-2 pt-1">
                                    <a
                                        href="https://weather.filecloud.ct8.pl"
                                        className="flex items-center gap-3 p-2 rounded-2xl bg-black/20 hover:bg-black/40 border border-white/10 transition-all text-white text-left"
                                    >
                                        <img src="icons/icon-192.jpg" alt="Aplikacja 1" className="w-9 h-9 rounded-xl object-cover border border-white/10" />
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm leading-tight">Versec Weather</span>
                                            <span className="text-xs text-white/60">Aplikacja pogodowa</span>
                                        </div>
                                    </a>

                                    <a
                                        href="https://filecloud.ct8.pl/dashboard"
                                        className="flex items-center gap-3 p-2 rounded-2xl bg-black/20 hover:bg-black/40 border border-white/10 transition-all text-white text-left"
                                    >
                                        <img src="icons/versec192.jpg" alt="Aplikacja 2" className="w-9 h-9 rounded-xl object-cover border border-white/10" />
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm leading-tight">Versec Drive</span>
                                            <span className="text-xs text-white/60">Dysk w chmurze</span>
                                        </div>
                                    </a>
                                     <a
                                        href="https://filecloud.ct8.pl/"
                                        className="flex items-center gap-3 p-2 rounded-2xl bg-black/20 hover:bg-black/40 border border-white/10 transition-all text-white text-left"
                                    >
                                        <img src="icons/versechealth.png" alt="Aplikacja 2" className="w-9 h-9 rounded-xl object-cover border border-white/10" />
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm leading-tight">Versec Health</span>
                                            <span className="text-xs text-white/60">Aplikacja zdrowia</span>
                                        </div>
                                    </a>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                </div>
                
               

                </div>
    )
}