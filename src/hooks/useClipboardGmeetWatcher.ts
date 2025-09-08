// Imports
import { useEffect } from "react";
import { readText } from "@tauri-apps/plugin-clipboard-manager";

export default function useClipboardGmeetWatcher(
  callback: (url: URL) => void,
  active: boolean = true,
  interval: number = 1500
): void {
  useEffect(() => {
    if (!active) return;

    let lastClipboard = "";

    const checkClipboard = async () => {
      try {
        const text = await readText();

        const googleMeetLinkRegex =
          /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/i;
        const googleMeetCodeRegex = /^[a-z]{3}-[a-z]{4}-[a-z]{3}$/i;

        if (text && text !== lastClipboard) {
          let urlString: string | null = null;

          if (googleMeetLinkRegex.test(text)) {
            urlString = text;
          } else if (googleMeetCodeRegex.test(text)) {
            urlString = `https://meet.google.com/${text}`;
          }

          if (urlString) {
            try {
              const url = new URL(urlString);
              lastClipboard = url.toString();
              callback(url);
            } catch {
              console.warn("Invalid URL generated, skipping:", urlString);
            }
          }
        }
      } catch (err) {
        console.error("Error in useClipboardGmeetWatcher from Hooks:", err);
      }
    };

    checkClipboard();
    const timer = setInterval(checkClipboard, interval);
    return () => clearInterval(timer);
  }, [active, interval]);
}
