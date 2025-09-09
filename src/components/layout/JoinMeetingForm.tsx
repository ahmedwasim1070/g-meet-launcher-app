// Imports
import React, { useState } from "react";
import { openUrl } from "@tauri-apps/plugin-opener";

// 
function JoinMeetingForm() {
    // States
    // Meeting url
    const [meetingLink, setMeetingLink] = useState<string>("");
    // Meeting Url Error
    const [isMeetingLinkError, setIsMeetingLinkError] = useState<boolean>(false);

    // handle inputs
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "meetingLink") {
            setIsMeetingLinkError(false);
            setMeetingLink(value);
        }
    }
    // handle meeting join
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (meetingLink.length > 0) {
            // Link regex
            const googleMeetLinkRegex = /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/i;
            // Code regex
            const googleMeetCodeRegex = /^[a-z]{3}-[a-z]{4}-[a-z]{3}$/i;
            // Validate link or code
            if (googleMeetLinkRegex.test(meetingLink) || googleMeetCodeRegex.test(meetingLink)) {
                //  For Link
                if (googleMeetLinkRegex.test(meetingLink)) {
                    await openUrl(meetingLink);
                }

                // For Code
                if (googleMeetCodeRegex.test(meetingLink)) {
                    await openUrl(`https://meet.google.com/${meetingLink}`);
                }

            } else {
                setIsMeetingLinkError(true);
            }
        } else {
            setIsMeetingLinkError(true);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-1/2 bg-white rounded-lg p-4 space-y-4" >
            {/*  */}
            < p className="text-xl font-semibold" > Join Meeting</p >
            {/*  */}
            <input
                required
                name="meetingLink"
                onChange={handleInput}
                value={meetingLink}
                type="text"
                className={`bg-gray-200 w-full border-2 rounded-lg p-2 outline-none  ${isMeetingLinkError ? 'border-red-500 placeholder:text-red-400 ' : 'border-gray-400 focus:border-blue-600'}`}
                placeholder={`${isMeetingLinkError ? 'Google Meet Url or Code is required.' : '📎Paste your Meeting url or code.'}`}
            />
            {/*  */}
            <button type="submit" className="text-white bg-blue-600 border-2 border-blue-600 px-5 py-1.5 rounded-lg cursor-pointer hover:bg-transparent hover:text-blue-600 transition-colors" >
                Join Now
            </button >
        </form >
    )
}

export default JoinMeetingForm