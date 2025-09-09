// Imports
import { Bell, Plus } from "lucide-react";
import { X } from "lucide-react"
import toast from "react-hot-toast";
import { ScheduleMeeting } from "../../types";

// Interfaces
interface ScheduleMetetingBoxProps {
    currentTime: Date;
    setIsScheduleMeetingPop: React.Dispatch<React.SetStateAction<boolean>>;
    scheduledMeetings: ScheduleMeeting[];
    setScheduledMeetings: React.Dispatch<React.SetStateAction<ScheduleMeeting[]>>
}
interface TimeFieldProps {
    currentTime: Date;
    meetingDate: number;
}

// Time Displayer Field
const TimeField = ({ currentTime, meetingDate }: TimeFieldProps) => {
    // Process Date
    const processedDate = new Date(meetingDate);
    // Day Field
    const dateField = processedDate.getDate() === currentTime.getDate() ? "Today" : processedDate.getDate() === currentTime.getDate() + 1 ? "Tommorow" : `${processedDate.toDateString()}`

    return (
        <p className="font-semibold ">
            <span className="text-blue-500">
                {dateField}
            </span>
            {" "}
            ,
            {" "}
            <span>{processedDate.toLocaleTimeString()}</span>
        </p>
    );
}

// 
function ScheduleMetetingBox({ currentTime, setIsScheduleMeetingPop, scheduledMeetings, setScheduledMeetings }: ScheduleMetetingBoxProps) {
    // Delete value with serial number
    const handleMeetingDeletion = (meetingSerialNumber: number) => {
        setScheduledMeetings((prev) =>
            prev.filter((meeting) => meeting.serial !== meetingSerialNumber)
        );
        toast.error("Deleted One Scheduled Meeting.");
    };

    return (
        <section className="min-w-full bg-white rounded-lg">
            {/*  */}
            <div className="min-w-full flex flex-row items-center justify-between px-4 py-3">
                {/*  */}
                <p className="font-semibold text-lg">Scheduled Meeting's</p>

                {/*  */}
                <button onClick={() => setIsScheduleMeetingPop(true)} className="py-1 px-2 bg-blue-600 text-white rounded-lg flex flex-row items-center gap-x-1 cursor-pointer hover:bg-blue-500 active:bg-blue-700">
                    {/*  */}
                    <Plus className="w-4 h-4 text-white" />

                    {/*  */}
                    <p>Schedule New</p>
                </button>
            </div>

            {/*  */}
            <div className="h-[200px] flex gap-x-4 items-center justify-center text-center p-5 overflow-x-scroll scrollbar-hidden">
                {/*  */}
                {scheduledMeetings.length === 0 &&
                    (
                        <p className="font-semibold text-2xl text-gray-500">No Scheduled Meeting's !</p>
                    )
                }
                {/*  */}
                {scheduledMeetings.length !== 0 && scheduledMeetings.map((meeting, idx) => (
                    <div key={idx} className="w-[350px] bg-gray-200 rounded-lg p-4 relative space-y-4">
                        {/* Cross btn */}
                        <button onClick={() => handleMeetingDeletion(meeting.serial)} className="p-2 bg-white rounded-full absolute right-3 top-3 cursor-pointer hover:bg-gray-300 active:bg-gray-400 transition-colors">
                            <X className="w-3 h-3 text-gray-500" />
                        </button>

                        {/*  */}
                        <div className="flex flex-row items-center gap-x-3">
                            {/*  */}
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><rect width="16" height="16" x="12" y="16" fill="#fff" transform="rotate(-90 20 24)" /><polygon fill="#1e88e5" points="3,17 3,31 8,32 13,31 13,17 8,16" /><path fill="#4caf50" d="M37,24v14c0,1.657-1.343,3-3,3H13l-1-5l1-5h14v-7l5-1L37,24z" /><path fill="#fbc02d" d="M37,10v14H27v-7H13l-1-5l1-5h21C35.657,7,37,8.343,37,10z" /><path fill="#1565c0" d="M13,31v10H6c-1.657,0-3-1.343-3-3v-7H13z" /><polygon fill="#e53935" points="13,7 13,17 3,17" /><polygon fill="#2e7d32" points="38,24 37,32.45 27,24 37,15.55" /><path fill="#4caf50" d="M46,10.11v27.78c0,0.84-0.98,1.31-1.63,0.78L37,32.45v-16.9l7.37-6.22C45.02,8.8,46,9.27,46,10.11z" /></svg>
                            </span>

                            {/*  */}
                            <div className="text-left">
                                <p className="font-semibold text-xl">{meeting.name}</p>

                                <a className="text-sm font-semibold text-gray-400 hover:text-gray-500 hover:underline cursor-text transition-colors">{meeting.url}</a>
                            </div>
                        </div>

                        <div className="flex flex-row items-center justify-center gap-x-2">
                            <Bell className="text-blue-500 fill-blue-500 w-4 h-4" />
                            <p>You will be notified at</p>
                        </div>

                        <TimeField currentTime={currentTime} meetingDate={meeting.date} />

                    </div>
                ))}
            </div>
        </section>
    )
}

export default ScheduleMetetingBox;