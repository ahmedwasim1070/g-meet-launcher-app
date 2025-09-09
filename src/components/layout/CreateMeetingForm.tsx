// Imports
import { openUrl } from "@tauri-apps/plugin-opener";

// 
function CreateMeetingForm() {
    // handle meeting join
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await openUrl("https://meet.google.com/new");
    }
    return (
        <form onSubmit={handleSubmit} className="w-1/2 bg-white rounded-lg p-4 space-y-4">
            {/*  */}
            <p className="text-xl font-semibold">Create Meeting</p>
            {/*  */}
            <p className="text-gray-500">Create meeting with one click, join and share instantly.</p>
            {/*  */}
            <button type="submit" className="text-white bg-blue-600 border-2 border-blue-600 px-5 py-1.5 rounded-lg cursor-pointer hover:bg-transparent hover:text-blue-600 transition-colors">
                New Meeting
            </button>
        </form>
    )
}

export default CreateMeetingForm;