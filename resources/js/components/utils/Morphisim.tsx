import { cn } from "@/lib/utils"
type Props ={
    children:React.ReactNode;
    className?:string
}

export function Glass1({children,className}: Props){

    return(
        <div className={cn("bg-brown-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border-1 border-gray-500 m-0.5",
                            className
        )}>
            {children}
        </div>
    )
}
export function GlassDark({children,className}){

    return(
        <div className={cn(" bg-gray-600  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30",className)}>
            {children}
        </div>
    )
}
