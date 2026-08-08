import React from 'react';
import { LoaderCircle, LucideIcon, Navigation, Wind } from 'lucide-react';
import { Glass1 } from '../utils/Morphisim';

type DetailCardProps ={
  label: string;
  value?: string | number | null;
  unit?: string;
  color?:string;
  icon?: React.ReactNode;
}

export default function DetailCard({
  label,
  value,
  unit,
  color,
  icon,
}: DetailCardProps) {
  return (
    <Glass1 className="w-full h-36 rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-xl overflow-hidden relative">
      <div className="p-4 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold bg-${color}-500/20 text-${color}-200 border border-${color}-500/30 flex items-center gap-1.5`}>
            {icon}
            {label}
          </span>
        </div>
        <div className="text-center my-auto">
          <span className="text-4xl sm:text-5xl font-black text-white tracking-tighter drop-shadow-md">
            {value ?? "..."}
          </span>
          {unit && (
            <span className={`text-xs font-bold text-${color}-300 ml-1 uppercase`}>
              {unit}
            </span>
          )}
        </div>
      </div>
    </Glass1>
  );
}
export function WindCard({ time, speed, direction, windUnit = "km/h" }) {
  function getWindDirection(degrees) {
    if (degrees === undefined || degrees === null) return "–";
    if (degrees >= 337.5 || degrees < 22.5) return "N";
    if (degrees >= 22.5 && degrees < 67.5) return "NE";
    if (degrees >= 67.5 && degrees < 112.5) return "E";
    if (degrees >= 112.5 && degrees < 157.5) return "SE";
    if (degrees >= 157.5 && degrees < 202.5) return "S";
    if (degrees >= 202.5 && degrees < 247.5) return "SW";
    if (degrees >= 247.5 && degrees < 292.5) return "W";
    if (degrees >= 292.5 && degrees < 337.5) return "NW";
    return "–";
  }

  const date = time
    ? new Date(time).toLocaleTimeString("pl-PL", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "–";
  const isSpeedAvailable = speed !== undefined && speed !== null;

  return (
    <div className="w-28 h-40 shrink-0 border border-white/15 rounded-2xl flex flex-col justify-between items-center p-2.5 bg-white/10 text-white backdrop-blur-md shadow-md hover:bg-white/15 transition-all">
      <span className="text-xs font-medium text-gray-300 tracking-wider">
        {date}
      </span>
      <div className="w-10 h-10  flex items-center justify-center my-0.5">
        <Navigation
          size={32}
          className="fill-yellow-400 text-yellow-400 transition-transform duration-500 ease-out"
          style={{ transform: `rotate(${direction ?? 0}deg)` }}
        />
      </div>
      <div className="flex flex-col items-center">
        <span className="font-extrabold text-xl tracking-tight leading-none">
          {isSpeedAvailable ? (
            speed
          ):(
            <LoaderCircle className="animate-spin" size={16} />
          )}
        </span>
        <span className="text-[10px] text-gray-400 mt-0.5">{windUnit}</span>
      </div>
      <div className="w-full text-center border-t border-white/10 pt-1">
        <span className="text-xs font-bold text-yellow-300 tracking-widest uppercase">
          {getWindDirection(direction)}
        </span>
      </div>
    </div>
  );
}
