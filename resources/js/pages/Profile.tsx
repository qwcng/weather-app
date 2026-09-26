import { Toast } from "@/components/Toaster";
import { CenterRow } from "@/components/utils/Center";
import { GlassSelect } from "@/components/utils/GlassSelect";
import { Glass1, GlassDark } from "@/components/utils/Morphisim";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { usePage } from "@inertiajs/react";
import { Value } from "@radix-ui/react-select";
import { AnimatePresence,motion } from "framer-motion";
import { changeLanguage } from "i18next";
import { ArrowLeft, ChevronDown, Clock4, LogIn, RefreshCcwDot, Settings, Sidebar, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Profile(){
    const { auth } = usePage().props as any;
    const user = auth?.user;
    
    // const [city, setCity] = useLocalStorage("t);
    const [temperatureUnit, setTemperatureUnit] =useLocalStorage("temperature","celsius");
    const [windUnit, setWindUnit] = useLocalStorage("wind","kmh");
    const [timeFormat, setTimeFormat] = useLocalStorage("time", "24h");
    const [customTheme,setCustomTheme] =useLocalStorage('theme','default');
    const [customBackground,setCustomBackground] =useLocalStorage('background',null);
    const[language,setLanguage] = useLocalStorage("language",null);
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });
    const {t,i18n} = useTranslation();
    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => setCustomBackground(reader.result);
        reader.readAsDataURL(file);
    };
    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
        }, 4000);
    };
    const handleLanguageChange = async (lang: string) => {
        setLanguage(lang);
        await i18n.changeLanguage(lang);
};
     const bgImage = customTheme === "custom" && customBackground
  ? customBackground
  :  "/weather/background/cloud.jpg";
    // console.log(temperatureUnit)
    return (
        <>
          <AnimatePresence>
                <Toast toast={toast} onClose={() => setToast((prev) => ({ ...prev, show: false }))} />
        </AnimatePresence>
        <main className="relative h-dvh   overflow-hidden bg-center bg-cover"
                style={{
                    backgroundImage: `url(${bgImage})`
                }}>
            <div className=" relative p-5 flex flex-row w-full align-center justify-evenly ">
                <button  className="h-12 w-12 rounded-4xl  flex items-center justify-center gap-12 border-white/10 border-2 p-1 bg-black/10 backdrop-blur-[3px] font-semibold ">
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
                    className="h-12 w-38 rounded-4xl  flex  items-center justify-center border-white/10 border-2 p-1 bg-black/10 backdrop-blur-[3px] font-semibold ">
                        <span className="font-md font-semibold text-white mr-2">{t("Profile.Settings")}</span> 
                    </motion.button>
                </AnimatePresence>

                <button className="h-12 w-12 rounded-4xl  flex items-center justify-center border-white/10 border-2 p-1 bg-black/10 backdrop-blur-[3px] font-semibold ">
                        <Sidebar className="text-white"/>
                </button>
               
            </div>
{/* <Glass1 className="w-[95vw] mx-auto rounded-2xl"> */}
            <div className="p-3 flex flex-col gap-5">
{/* border-b-1 border-gray-600 */}
                <span className=" flex flex-row text-gray-200 pb-1   font-semibold  "><Settings className="mr-1.5"/> {t("Profile.Settings")}</span>


                <div>
                    <p className="text-gray-300 mb-2">
                        {t("Profile.TemperatureUnit")}
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
                        {t("Profile.WindUnit")}
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
                        {t("Profile.TimeFormat")}
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
                <div>
                    <p className="text-gray-300 mb-2">
                        {t("Profile.Theme")}
                    </p>

                    <GlassSelect
                        value={customTheme}
                        onChange={setCustomTheme}
                        options={[
                            {
                            label:t("Profile.DefaultTheme"),
                            value:"default"                       
                            },
                            {
                            label:t("Profile.CustomTheme"),
                            value:"custom"
                            },
                        ]}
                    />
                    <p className="mb-2 text-gray-300">{t("Language.Language")}</p>
                    <GlassSelect
                        value={i18n.language}
                        onChange={handleLanguageChange}
                        options={[
                            {
                            label:"🇬🇧 English",
                            value:"en"                       
                            },
                            {
                            label:"🇵🇱 Polski",
                            value:"pl"
                            },
                            // {
                            // label:"Español",
                            // value:"es"
                            // },
                            {
                            label:"🇫🇷 Français",
                            value:"fr"
                            },
                        ]}
                    />
                   {customTheme === "custom" ? (
                    <div>
                        <p className="text-gray-300 mb-2">
                            {t("Profile.BackgroundImage")}
                            <Glass1>
                               <input type="file"  accept="image/*" onChange={handleImageUpload}className="text-white text-sm" />
                            </Glass1>
                        </p>
                    </div>
                    ) : null}

                </div>
                
                    <Glass1 className="p-2 w-[35%] h-12 rounded-4xl border-2 border-white/10  bg-brown-900/10 backdrop-blur-[3px] font-semibold">
                        <CenterRow><button onClick={() =>{
                            showToast("Refreshing page...", "loading");
                            window.location.reload()
                        } } className="flex flex-row items-center justify-center gap-2  text-center mx-auto"><span>{t("Profile.Refresh")}</span><RefreshCcwDot className="inline-block"/></button></CenterRow>                    
                            {/* <button className="mt-2"></button> */}
                    </Glass1>
                    {user ? (
                        <Glass1 className="p-2 min-w-[35%] h-12 rounded-4xl border-2 border-white/10 bg-black/20 backdrop-blur-[3px] font-semibold text-white px-4">
                            <CenterRow>
                                <span className="flex flex-row items-center gap-2 text-sm">
                                    <UserIcon className="h-4 w-4 inline-block" />
                                    {t("Profile.LoggedInAs")}: <strong className="text-white font-bold">{user.name || user.email}</strong>
                                </span>
                            </CenterRow>
                        </Glass1>
                    ) : (
                        <Glass1 className="p-2 w-[35%] h-12 rounded-4xl border-2 border-white/10 bg-brown-900/10 backdrop-blur-[3px] font-semibold">
                            <CenterRow><button onClick={() =>{
                            showToast("Logging in...", "loading");
                            window.location.href = "/login"}
                        }
                             className="flex flex-row items-center justify-center gap-2 text-center mx-auto"><span>{t("Profile.LogIn")}</span><LogIn className="inline-block"/></button></CenterRow>                    
                        </Glass1>
                    )}

                
            </div>

          

        </main>
        </>
    );
}