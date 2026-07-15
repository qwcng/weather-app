
export function CenterAll({children}){

    return(
        <div className="flex flex-col items-center justify-center w-full h-fit">
            {children}
        </div>
    )
}
export function CenterRow({children}){

    return(
        <div className="flex flex-row items-center justify-center w-full h-fit">
            {children}
        </div>
    )
}