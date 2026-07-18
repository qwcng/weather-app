import { Navbar } from "@/components/Navbar/Navbar"
import Weather from "./Weather"
import { act, useEffect, useState } from "react";
import Map from "./Map";
import { router } from "@inertiajs/react";
import Profile from "./Profile";

export default function Main(){
    const [active, setActive] = useState("pogoda");
    // useEffect(()=>{
    //     router.visit(`/${active}`)
    // },[active])
return(
    <>
    <div className={active === "pogoda" ? "block" : "hidden"}>
    <Weather />
</div>

<div className={active === "map" ? "block" : "hidden"}>
    <Map />
</div>

<div className={active === "profile" ? "block" : "hidden"}>
    <Profile/>
</div>
<Navbar active={active} setActive={setActive}/>
</>
)

}