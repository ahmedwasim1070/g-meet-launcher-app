// Imports
import { useCallback, useEffect, useState } from "react";
import { Edit } from "lucide-react";
// Types
import { ScheduleMeeting } from "../../types";
// Hooks
import useClipboarGmeetWatcher from "../../hooks/useClipboardGmeetWatcher";
// Component
import JoinMeetingForm from "./JoinMeetingForm";
import CreateMeetingForm from "./CreateMeetingForm";
import MeetingUrlPop from "./MeetingUrlPop";
import ScheduleMetetingBox from "./ScheduleMetetingBox";
import ScheduleMetetingPop from "./ScheduleMeetingPop";
import ScheduleNotficationPop from "./ScheduleNotficationPop";

// 
function Home() {
    // States
    // User Name 
    const [userName, setUserName] = useState<string>("User");
    // Is Edit Bar 
    const [isEditName, setIsEditName] = useState<boolean>(false);
    // Machine readable time
    const [currentTime, setCurrentTime] = useState<Date>(new Date());
    // Human readable time
    const [formattedDate, setFormattedDate] = useState<String>(() =>
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
    // Schedule Meeting pop
    const [isScheduleMeetingPop, setIsScheduleMeetingPop] = useState<boolean>(false);
    // Scheduled Meetings
    const [scheduledMeetings, setScheduledMeetings] = useState<ScheduleMeeting[]>([]);
    // Next Notification
    const [scheduleNotification, setScheduleNotification] = useState<ScheduleMeeting | null>(null);

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
        const interval = setInterval(() => {
            const now = Date.now();

            setCurrentTime(new Date(now));

            const newFormattedDate = new Date(now).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });

            if (scheduledMeetings.length > 0) {
                const nextMeeting = scheduledMeetings[0];
                if (Math.abs(nextMeeting.date - now) <= 5000) {
                    setScheduleNotification(nextMeeting);
                }
            }

            setFormattedDate((prev) => (prev !== newFormattedDate ? newFormattedDate : prev));
        }, 1000);

        return () => clearInterval(interval);
    }, [scheduledMeetings]);

    return (
        <section className="min-w-full p-4 space-y-5">
            {/* Popups */}
            {/* Schedule Notification Pop */}
            {scheduleNotification && <ScheduleNotficationPop scheduleNotification={scheduleNotification} setScheduleNotification={setScheduleNotification} setScheduledMeetings={setScheduledMeetings} />}
            {/* Meeting Url */}
            {isMeetingPop && <MeetingUrlPop clipMeetingUrl={clipMeetingUrl} setClipMeetingUrl={setClipMeetingUrl} setIsMeetingPop={setIsMeetingPop} />}
            {/* Schedule Meeting */}
            {isScheduleMeetingPop && <ScheduleMetetingPop currentTime={currentTime} setIsScheduleMeetingPop={setIsScheduleMeetingPop} scheduledMeetings={scheduledMeetings} setScheduledMeetings={setScheduledMeetings} />}

            {/* Greetings */}
            <div className="w-full bg-white rounded-lg space-y-1 p-4 ">
                {/*  */}
                <div className="flex flex-row items-center gap-x-1 text-xl font-bold">
                    <p >Hey ! </p>
                    {/*  */}
                    {isEditName ?
                        (
                            <input
                                onChange={(e) => setUserName(e.target.value)}
                                onBlur={() => setIsEditName(false)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        setIsEditName(false);
                                    }
                                }}
                                type="text"
                                className="max-w-20 border-b outline-none"
                                value={userName}
                                placeholder="Enter name"
                            />
                        ) :
                        (
                            <div className="flex flex-row items-center gap-x-1 max-w-90 ">
                                <p>{userName}</p>
                                <button className="cursor-pointer" onClick={() => { setIsEditName(true) }}>
                                    <Edit className="w-4 h-4 text-blue-400" />
                                </button>

                            </div>
                        )
                    }
                    <p>👋</p>
                </div>

                {/*  */}
                <p className="text-sm">
                    Today: {formattedDate}
                </p>

                {/*  */}
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

            {/*  */}
            <ScheduleMetetingBox currentTime={currentTime} setIsScheduleMeetingPop={setIsScheduleMeetingPop} scheduledMeetings={scheduledMeetings} setScheduledMeetings={setScheduledMeetings} />
        </section>
    );
}

export default Home;
