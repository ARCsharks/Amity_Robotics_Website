import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function SocialBar({ name, videos }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full rounded-lg border border-zinc-700 overflow-hidden">

            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-5 py-4 bg-zinc-900 hover:bg-zinc-800 transition"
            >
                <h2 className="text-lg font-semibold">
                    {name}
                </h2>

                <ChevronDown
                    className={`transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {open && (
                <div className="bg-zinc-950">

                    <div className="overflow-x-auto overflow-y-hidden">
                        
                        <div className="flex gap-4 w-max p-4">
                            {videos.map((video) => (
                                <div key={video.title} className="w-[250px] shrink-0 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800">
                               
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="
                                                w-full
                                                h-[140px]
                                                object-cover
                                            "
                                        />

                                        
                                        <div className="p-3">
                                            <h3 className="font-medium truncate">
                                                {video.title}
                                            </h3>

                                            <p className="text-sm text-zinc-400 line-clamp-2">
                                                {video.description}
                                            </p>
                                        </div>
                                    
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}