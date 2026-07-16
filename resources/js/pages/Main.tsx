import { Navbar } from "@/components/Navbar/Navbar"
import Weather from "./Weather"
import { act, useEffect, useState } from "react";
import Map from "./Map";
import { router } from "@inertiajs/react";

export default function Main(){
    const [active, setActive] = useState("weather");
    // useEffect(()=>{
    //     router.visit(`/${active}`)
    // },[active])
return(
    <>
    {active==="pogoda"&&(
        <Weather/>
    )}
    {active==="map"&&(
        <Map/>
    )}
    {/* {active==="weather"&&(
        <Weather/>
    )} */}
    
    <Navbar active={active} setActive={setActive}/>
    </>

)

}