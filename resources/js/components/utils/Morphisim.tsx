import { cn } from "@/lib/utils"

export function Glass1({children}){

    return(
        <div className="bg-brown-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-gray-100">
            {children}
        </div>
    )
}
export function GlassDark({children}){

    return(
        <div className=" bg-gray-600  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30">
            {children}
        </div>
    )
}
