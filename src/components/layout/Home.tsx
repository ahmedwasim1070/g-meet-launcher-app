// Imports
import { useCallback, useEffect, useState } from "react";
// Hooks
import useClipboarGmeetWatcher from "../../hooks/useClipboardGmeetWatcher";
// Component
import JoinMeetingForm from "./JoinMeetingForm";
import CreateMeetingForm from "./CreateMeetingForm";
import MeetingUrlPop from "./MeetingUrlPop";

// 
function Home() {
    // States
    // Machine readable time
    const [currentTime, setCurrentTime] = useState(new Date());
    // Human readable time
    const [formattedDate, setFormattedDate] = useState(() =>
        new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    );
    // Meeting Url from clipboard
    const [clipMeetingUrl, setClipMeetingUrl] = useState<URL | null>(null);
    // Meeting Url Popup
    const [isMeetingPop, setIsMeetingPop] = useState<boolean>(false);

    // clipboardWatcher Hook that looks for google meet urls 
    const handleClipboard = useCallback((text: URL) => {
        if (text) {
            setIsMeetingPop(true);
            setClipMeetingUrl(text);
        }
    }, [])
    useClipboarGmeetWatcher(handleClipboard);

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

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="min-w-full p-4 space-y-5">
            {/* Popups */}
            {/* Meeting Url */}
            {isMeetingPop && <MeetingUrlPop clipMeetingUrl={clipMeetingUrl} setClipMeetingUrl={setClipMeetingUrl} setIsMeetingPop={setIsMeetingPop} />}


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
                <JoinMeetingForm />

                {/*  */}
                <CreateMeetingForm />
            </div>
        </section>
    );
}

export default Home;
