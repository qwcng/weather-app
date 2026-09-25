export const TemperatureBar = ({temperature}) => {
        const min = -10;
        const max = 45;
        const percent = Math.min(
                                Math.max(((temperature-min) / (max-min)) * 100, 0),100
                                );

        return(
            <div className="relative w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                <div
                    className="absolute h-full w-full"
                    style={{
                    background: `
                        linear-gradient(
                        90deg,
                        #2563eb 0%,
                        #06b6d4 20%,
                        #22c55e 50%,
                        #facc15 70%,
                        #ef4444 100%
                        )
                    `,
                    }}
                />

                <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white  border-black rounded-full"
                    style={{
                    left: `${percent}%`,
                    }}
                 />
            </div>
        )

}