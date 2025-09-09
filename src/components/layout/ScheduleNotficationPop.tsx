// Imports
import { ScheduleMeeting } from "../../types"
import { openUrl } from "@tauri-apps/plugin-opener";

// Interfaces
interface ScheduleNotficationPopProps {
    scheduleNotification: ScheduleMeeting;
    setScheduleNotification: React.Dispatch<React.SetStateAction<ScheduleMeeting | null>>;
    setScheduledMeetings: React.Dispatch<React.SetStateAction<ScheduleMeeting[]>>;
}

// 
function ScheduleNotficationPop({ scheduleNotification, setScheduleNotification, setScheduledMeetings }: ScheduleNotficationPopProps) {
    //  Handle Cancel
    const handleCancel = () => {
        setScheduledMeetings(prev =>
            prev.filter((meeting) => meeting.serial !== scheduleNotification.serial)
        );
        setScheduleNotification(null);
    }
    // Handle Join
    const handleJoin = async () => {
        try {
            await openUrl(scheduleNotification.url);
        } catch (err) {
            console.error("Error in handleJoin in ScheduleNotficationPop");
        } finally {
            setScheduledMeetings(prev =>
                prev.filter((meeting) => meeting.serial !== scheduleNotification.serial)
            );
            setScheduleNotification(null);
        }
    }

    return (
        <section className="inset-0 fixed z-40 min-w-screen h-full bg-gray-900/30 flex justify-center items-center">
            {/*  */}
            <div className="bg-white shadow-sm rounded-lg w-1/4 flex flex-col items-center p-3 text-center">
                <p className="font-semibold text-lg">Add this meeting link ?</p>

                {/*  */}
                <p className="text-gray-600 my-2">{ }</p>

                {/*  */}
                <div className="w-full flex flex-row items-stretch gap-x-2 flex-nowrap mt-2">
                    <button onClick={handleCancel} className="w-1/2 py-1 bg-gray-300 rounded-lg text-gray-800 cursor-pointer hover:bg-gray-200 active:bg-gray-400 transition-colors ">Cancel</button>
                    <button onClick={handleJoin} className="w-1/2 py-1 bg-blue-500 rounded-lg text-white cursor-pointer hover:bg-blue-400 active:bg-blue-600 transition-colors">Join</button>
                </div>

            </div>
        </section>
    )
}

export default ScheduleNotficationPop