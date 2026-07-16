import { useState } from "react";
import { motion } from "framer-motion";
import { MapIcon, Settings, Sun } from "lucide-react";
import { Glass1 } from "../utils/Morphisim";

export function Navbar({active,setActive}) {
    

    return (
        <div className="fixed bottom-4 w-full z-50">
            <Glass1 className="w-[80vw] mx-auto h-18 rounded-4xl border-2 border-white/10 p-1 bg-brown-900/10 backdrop-blur-[3px] font-semibold">
                <div className="flex h-full">

                    <button
                        onClick={() => setActive("pogoda")}
                        className="relative flex-1 flex flex-col items-center justify-center"
                    >
                        {active === "pogoda" && (
                            <motion.div
                                layoutId="navbar"
                                className="absolute inset-1 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 backdrop:saturate-200"
                                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                                
                            />
                        )}

                        <div className="relative z-10 flex flex-col items-center text-white">
                            <Sun size={30} />
                            <span className="text-xs">Pogoda</span>
                        </div>
                    </button>

                    <button
                        onClick={() => setActive("map")}
                        className="relative flex-1 flex flex-col items-center justify-center"
                    >
                        {active === "map" && (
                            <motion.div
                                layoutId="navbar"
                                className="absolute inset-1 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 backdrop:saturate-200"
                                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                            />
                        )}

                        <div className="relative z-10 flex flex-col items-center text-white">
                            <MapIcon size={30} />
                            <span className="text-xs">Mapa</span>
                        </div>
                    </button>

                    <button
                        onClick={() => setActive("profile")}
                        className="relative flex-1 flex flex-col items-center justify-center"
                    >
                        {active === "settings" && (
                            <motion.div
                                layoutId="navbar"
                                className="absolute inset-1 rounded-3xl bg-white/10 backdrop-blur-10 border border-white/20 backdrop:saturate-200"
                                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                                
                            />
                        )}

                        <div className="relative z-10 flex flex-col items-center text-white">
                            <Settings size={30} />
                            <span className="text-xs">Ustawienia</span>
                        </div>
                    </button>

                </div>
            </Glass1>
        </div>
    );
}