import { AnimatePresence,motion } from "framer-motion"
import { ArrowLeft, ChevronDown, LayoutGrid, Plus, Sidebar, X } from "lucide-react"
import { CenterRow, CenterX } from "../utils/Center"
import { useState } from "react";

type Header={
    searching: boolean;
    setSearching:(bool:boolean)=>void;
    newCity: any;
    setNewCity: ()=>void;
    fetchedCities: any;
    handleCityAdd: ()=>void;
    selectCity:any;


}



export function Header({searching,setSearching,newCity,setNewCity,fetchedCities,handleCityAdd, selectCity}: Header){
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
                        <div className="font-md min-h-8 max-h-48 overflow-y-auto w-full flex flex-col justify-between items-center bg-black/10 font-semibold text-white mr-2">                       
                         {newCity ? (
                            <div className=" border-2 z-100 pt-2 flex flex-col w-full">
                            {fetchedCities 
                                ?(
                                    fetchedCities.map((city: any)=>{
                                            return(
                                                <CenterX key={city.name}>
                                                    <button onClick={()=>handleCityAdd(city)} className="font-md border-2 min-h-10 py-2 w-full flex flex-row justify-between items-center bg-black/30 font-semibold text-white mr-2">
                                                        
                                                           <div className="flex flex-row"><span className="font-md font-semibold text-white mr-2">{city.name},{city.admin1}</span> <Plus size={40} className="text-white"/></div>
                                                        
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
                                    <p>Warszawa,<span className="text-sm">mazowieckie</span></p> <X className="text-white"/>
                                </>
                                    
                            )
                            }
                                </div> 
                    
                    
                    <CenterRow>
                            <div className="bottom-0">
                                <input type="text" placeholder="Wpisz nazwę miejscowości" value={newCity} onChange={(e) => setNewCity(e.target.value)} />
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
                                        href="https://filecloud.ct8.pl"
                                        className="flex items-center gap-3 p-2 rounded-2xl bg-black/20 hover:bg-black/40 border border-white/10 transition-all text-white text-left"
                                    >
                                        <img src="icons/versec192.jpg" alt="Aplikacja 2" className="w-9 h-9 rounded-xl object-cover border border-white/10" />
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm leading-tight">Versec Drive</span>
                                            <span className="text-xs text-white/60">Dysk w chmurze</span>
                                        </div>
                                    </a>
                                     <a
                                        href="https://filecloud.ct8.pl"
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