import { ChevronDown } from "lucide-react";

type SelectProps = {
    value: string;
    onChange: (value: string) => void;
    options: any;
};

export function GlassSelect({ value, onChange, options }: SelectProps) {
    return (
        <div className="relative w-64">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
               className="appearance-none w-full h-12 px-5 pr-12 rounded-4xl bg-gray-600/40 backdrop-blur-xl border border-white/20 text-white font-semibold outline-none cursor-pointer focus:ring-2 focus:ring-white/30"
            >
                {options.map((option) => (
                    <option
                        key={option}
                        value={option.value}
                        className="text-black"
                    >
                        {option.label}
                    </option>
                ))}
            </select>

            <ChevronDown
                className=" absolute right-4 top-1/2 -translate-y-1/2 text-white pointer-events-none
                "
            />
        </div>
    );
}