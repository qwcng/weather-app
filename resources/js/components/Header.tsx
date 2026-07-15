import React,{useState,useEffect} from "react";
import axios from "axios";


export  function Header(){

 
    
    return(
        <>
            <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-[#FDFDFC]/80 backdrop-blur-md dark:border-neutral-800 dark:bg-[#0a0a0a]/80">
                    <div className="flex h-20 items-center justify-between px-6 lg:px-10 max-w-7xl mx-auto w-full">
                        <a className="flex items-center gap-2" href="/">
                            <img src="/logo.png" alt="Logo" className="h-9 w-auto" />
                            <span className="text-xl font-semibold tracking-tight bg-gradient-to-r from-[#2013d8] to-[#fded08] bg-clip-text text-transparent">
                                Versec Weather
                            </span>
                        </a>
                    </div>
            </header>
            
        </>
    )

}