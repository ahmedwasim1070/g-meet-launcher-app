// Imports
import { useEffect } from "react";
import { readText } from "@tauri-apps/plugin-clipboard-manager";

//
export default function useClipboardWatcher(
  callback: (text: string) => void,
  active: boolean = true,
  interval: number = 1500
): void {
  useEffect(() => {
    if (!active) return;

    let lastClipboard = "";

    const checkClipboard = async () => {
      try {
        const text = await readText();
        if (text && text !== lastClipboard) {
          lastClipboard = text;
          callback(text);
        }
      } catch (err) {
        console.error("Clipboard read failed:", err);
      }
    };

    const timer = setInterval(checkClipboard, interval);
    return () => clearInterval(timer);
  }, [callback, active, interval]);
}
