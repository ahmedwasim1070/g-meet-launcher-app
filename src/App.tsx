// Imports
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { requestPermission } from "@tauri-apps/plugin-notification";
// Stylesheets
import "./styles/index.css";
// Pages
import Home from "./components/pages/Home";
// Components
import PaymentPop from "./components/layout/PaymentPop";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";

// 
function App() {
  // States
  // Windows Notification Permission
  const [notificationPermission, setNotificationPermission] = useState<boolean | null>(() => {
    const stored = localStorage.getItem('notificationPermission');
    return stored ? JSON.parse(stored) : null;
  });
  // Nav Expanded
  const [isExpnadedNav, setIsExpandedNav] = useState<boolean>(false);
  // Selected Tab
  const [selectedTab, setSelectedTab] = useState<string>("home");
  // Payment Option Pop State
  const [isPaymentPop, setIsPaymentPop] = useState<boolean>(true);

  // Effect
  // Check for notification permission
  useEffect(() => {
    async function checkPermission() {
      if (notificationPermission === null) {
        const ask = await requestPermission();
        setNotificationPermission(ask === 'granted');
      }
    }

    checkPermission();
  }, [notificationPermission])
  // Save 
  useEffect(() => {
    if (notificationPermission !== null) {
      localStorage.setItem('notificationPermission', JSON.stringify(notificationPermission));
    }
  }, [notificationPermission])

  return (
    <section className="relative">
      <Toaster />

      {/* Payment Pop */}
      {isPaymentPop && <PaymentPop setIsPaymentPop={setIsPaymentPop} />}

      {/*  */}
      <Header isExpnadedNav={isExpnadedNav} setIsExpandedNav={setIsExpandedNav} />

      {/*  */}
      <Navbar isExpnadedNav={isExpnadedNav} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {/*  */}
      <main className={`mt-16 ${isExpnadedNav ? 'ml-[22%]' : 'ml-16'}`}>
        {/* Home */}
        {selectedTab === 'home' && <Home notificationPermission={notificationPermission} />}

      </main>

    </section>
  );
}

export default App;
