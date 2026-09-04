import { cn } from "@/lib/utils"
type CenterProp ={
    children:React.ReactNode,
    className?:string,

}
export function CenterAll({children,className}: CenterProp){

    return(
        <div className={cn("flex flex-col items-center justify-center w-full h-fit",className)}>
            {children}
        </div>
    )
}
export function CenterRow({children,className}:CenterProp){

    return(
        <div className={cn("flex flex-row items-center justify-center w-full h-fit", className)}>
            {children}
        </div>
    )
}
export function CenterX({children,className}:CenterProp){

    return(
        <div className={cn("flex flex-row items-start justify-center w-full h-fit",className)}>
            {children}
        </div>
    )
}
export function CenterY({children,className}:CenterProp){

    return(
        <div className={cn("flex flex-row items-center justify-start w-full h-fit",className)}>
            {children}
        </div>
    )
}