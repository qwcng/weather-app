import { Glass1, GlassDark } from "@/components/utils/Morphisim";

export default function Map(){

    return (
        <main className="relative h-dvh w-full pb-24 overflow-hidden">

            <iframe
                src="https://embed.windy.com/embed2.html?lat=52.2298&lon=21.0118&zoom=5&level=surface&overlay=rain"
                className="absolute inset-0 w-full h-[100dvh] border-0"
                
            />

        </main>
    );
}