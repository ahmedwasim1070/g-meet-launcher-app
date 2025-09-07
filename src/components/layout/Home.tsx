// Imports
import { readText } from "@tauri-apps/plugin-clipboard-manager";
import { useEffect, useState } from "react";

// 
function Home() {
    // States
    // Machine readable time
    const [currentTime, setCurrentTime] = useState(new Date());
    // Meeting url
    const [meetingLink, setMeetingLink] = useState<string>("");
    // Human readable time
    const [formattedDate, setFormattedDate] = useState(() =>
        new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    );

    // Effects
    // Update time and data
    useEffect(() => {
        // Update every second
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);

            // If the date has changed, reformat it
            const newFormattedDate = now.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });

            setFormattedDate((prev) => (prev !== newFormattedDate ? newFormattedDate : prev));
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);
    useEffect(() => {
        const clipbaord = async () => {
            const data = await readText();
            console.log(data);
        }
        clipbaord();
    }, [])

    return (
        <section className="min-w-full p-4 space-y-5">
            {/* Greetings */}
            <div className="w-full bg-white rounded-lg space-y-1 p-4">
                <p className="text-xl font-bold">Hey ! Muhammad Ahmad 👋</p>
                <p className="text-sm">
                    Today: {formattedDate}
                </p>
                <p className="text-xs text-gray-600">
                    Time: {currentTime.toLocaleTimeString("en-US")}
                </p>
            </div>

            {/*  */}
            <div className="flex flex-row w-full gap-x-4 items-stretch">
                {/*  */}
                <form className="w-1/2 bg-white rounded-lg p-4 space-y-4">
                    {/*  */}
                    <p className="text-xl font-semibold">Join Meeting</p>
                    {/*  */}
                    <input value={meetingLink} type="text" className="bg-gray-200 w-full border-2 border-gray-400 rounded-lg p-2 outline-none focus:border-blue-500" placeholder="📎 Paste your meeting link" />
                    {/*  */}
                    <button type="submit" className="text-white bg-blue-500 border-2 border-blue-500 px-5 py-1.5 rounded-lg cursor-pointer hover:bg-transparent hover:text-blue-500 transition-colors">
                        Join Now
                    </button>
                </form>

                {/*  */}
                <form className="w-1/2 bg-white rounded-lg p-4 space-y-4">
                    {/*  */}
                    <p className="text-xl font-semibold">Create Meeting</p>
                    {/*  */}
                    <p className="text-gray-500">Create meeting with one click, join and share instantly.</p>
                    {/*  */}
                    <button type="submit" className="text-white bg-blue-500 border-2 border-blue-500 px-5 py-1.5 rounded-lg cursor-pointer hover:bg-transparent hover:text-blue-500 transition-colors">
                        New Meeting
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Home;
