// Imports
import { useState } from "react";
import { Toaster } from "react-hot-toast";
// Stylesheets
import "./styles/index.css";
// Components
import PaymentPop from "./components/layout/PaymentPop";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/Home";

// 
function App() {
  // States
  // Nav Expanded
  const [isExpnadedNav, setIsExpandedNav] = useState<boolean>(false);
  // Selected Tab
  const [selectedTab, setSelectedTab] = useState<string>("home");

  return (
    <section className="relative">
      {/* Payment Pop */}
      <Toaster />

      {/*  */}
      <Header isExpnadedNav={isExpnadedNav} setIsExpandedNav={setIsExpandedNav} />

      {/*  */}
      <Navbar isExpnadedNav={isExpnadedNav} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {/*  */}
      <main className={`mt-16 ${isExpnadedNav ? 'ml-[22%]' : 'ml-16'}`}>
        {/* Home */}
        {selectedTab === 'home' && <Home />}

      </main>

    </section>
  );
}

export default App;
