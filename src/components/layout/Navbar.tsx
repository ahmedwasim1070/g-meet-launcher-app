// Imports
import { Image, Phone, Star, Shield, FileText, HomeIcon } from "lucide-react";

// Interfaces
interface NavbarProps {
    isExpnadedNav: boolean;
    selectedTab: string;
    setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

// 
function Navbar({ isExpnadedNav, selectedTab, setSelectedTab }: NavbarProps) {
    // Navbar Items
    const navItems = [
        { icon: <HomeIcon size={20} />, label: "Home", value: "home" },
        { icon: <Image size={20} />, label: "Background", value: "background" },
        { icon: <Phone size={20} />, label: "Contact Us", value: "contact-us" },
        { icon: <Star size={20} />, label: "Rate Us", value: "rate-us" },
        { icon: <Shield size={20} />, label: "Privacy Policy", value: "privacy-policy" },
        { icon: <FileText size={20} />, label: "Terms of Service", value: "terms-of-service" },
    ];

    // Handle click
    const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
        const value = e.currentTarget.dataset.value;
        if (value) {
            setSelectedTab(value);
        }
    };

    return (
        <nav className={`${isExpnadedNav ? "w-[20%]" : "w-16"} min-h-screen fixed left-0 top-16 transition-all duration-300 ease-in-out flex justify-center pt-10 bg-white z-20`}>
            {/*  */}
            <ul className="w-full px-2 space-y-2">

                {/*  */}
                {navItems.map((nav, idx) => (
                    <li
                        key={idx}
                        data-value={nav.value}
                        onClick={handleClick}
                        className={`flex items-center p-3 rounded-lg  transition-all duration-200 ${selectedTab === nav.value ? "bg-blue-600" : "hover:bg-gray-200 active:bg-gray-300 cursor-pointer "}`}
                        title={!isExpnadedNav ? nav.label : undefined}
                    >

                        {/*  */}
                        <div className={`flex items-center justify-center min-w-[20px] ${selectedTab === nav.value ? 'text-white' : 'text-gray-500'} `}>
                            {nav.icon}
                        </div>

                        {/*  */}
                        <span
                            className={`text-sm font-medium ${selectedTab === nav.value ? 'text-white' : 'text-gray-500'} whitespace-nowrap ml-4 transition-all duration-300 ease-in-out ${isExpnadedNav ? "opacity-100 w-auto" : "opacity-0 w-0 ml-0 overflow-hidden"}`}>
                            {nav.label}
                        </span>
                    </li>
                ))}

            </ul>
        </nav>
    );
}

export default Navbar;
