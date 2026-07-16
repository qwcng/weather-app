import { AnimatePresence,motion } from "framer-motion"
import { ArrowLeft, ChevronDown, Plus, Sidebar, X } from "lucide-react"
import { CenterRow, CenterX } from "../utils/Center"

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
    
    return(
    <div className=" relative p-5 flex flex-row w-full align-center justify-evenly ">
                <button  className="h-12 w-12 rounded-4xl  flex items-center justify-center gap-12 bg-gray-600/60  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 ">
                    <ArrowLeft className="text-white"/>
                </button>
                <AnimatePresence mode="wait">
                {searching ?
                (
                <motion.div
                key="search-panel"
                
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                    width: 150,
                    height: 48,
                    y: 0,
                    opacity: 0,
                }}
                transition={{
                    duration: 0.3,
                }}
                className="h-fit w-72 z-10 overflow-hidden rounded-4xl   flex-col fixed p-4 justify-center items-center bg-gray-600/60 bg-opacity-0  bg-clip-padding backdrop-filter backdrop-blur-xs  ">
                  
                   <button onClick={()=>setSearching(false)} className="flex flex-row"><span className="font-md font-semibold text-white mr-2" >{selectCity.name}</span> <ChevronDown className="text-white"/></button>
                    

                        <div className="font-md min-h-8 max-h-48  overflow-y-auto w-full flex flex-col justify-between items-center bg-black/10  font-semibold text-white mr-2">
                        
                         {newCity ? (
                            <div className="  border-2 z-100 pt-2 flex flex-col w-full">
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
                                {/* <button onClick={handleCitySubmit}> <PlusIcon color="white"></PlusIcon></button> */}
                            </div>
                    </CenterRow>
                    
                </motion.div>
                )
                :(
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
    )
}