// Imports
import { useState } from "react";
import "./styles/index.css";
// Components
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/Home";

// 
function App() {
  // States
  // Nav Expanded
  const [isExpnadedNav, setIsExpandedNav] = useState<boolean>(false);


  return (
    <section className="h-[200vh] relative">
      {/*  */}
      <Header isExpnadedNav={isExpnadedNav} setIsExpandedNav={setIsExpandedNav} />

      {/*  */}
      <Navbar isExpnadedNav={isExpnadedNav} />

      <main className={`min-h-screen bg-gray-200 mt-16 ${isExpnadedNav ? 'ml-[22%]' : 'ml-16'}`}>
        {/*  */}
        <Home />
      </main>
    </section>
  );
}

export default App;
