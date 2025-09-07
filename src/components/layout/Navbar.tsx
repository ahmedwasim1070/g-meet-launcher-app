// Imports
import { Image, Phone, Star, Shield, FileText, HomeIcon } from "lucide-react";

// Interface
interface NavbarProps {
    isExpnadedNav: boolean;
}

function Navbar({ isExpnadedNav }: NavbarProps) {
    // Navbar Items
    const navItems = [
        {
            icon: <HomeIcon size={20} />,
            label: 'Home',
        },
        {
            icon: <Image size={20} />,
            label: 'Background',
        },
        {
            icon: <Phone size={20} />,
            label: 'Contact Us',
        },
        {
            icon: <Star size={20} />,
            label: 'Rate Us',
        },
        {
            icon: <Shield size={20} />,
            label: 'Privacy Policy',
        },
        {
            icon: <FileText size={20} />,
            label: 'Terms of Service',
        },
    ];

    return (
        <nav className={`${isExpnadedNav ? 'w-[20%]' : 'w-16'
            } min-h-screen fixed left-0 top-16 transition-all duration-300 ease-in-out flex justify-center pt-10 bg-white z-10`}>
            {/*  */}
            <ul className="w-full px-2 space-y-2">
                {/*  */}
                {navItems.map((nav, idx) => (
                    <li
                        key={idx}
                        className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition-all duration-200"
                        title={!isExpnadedNav ? nav.label : undefined}
                    >
                        <div className="flex items-center justify-center min-w-[20px] text-gray-500">
                            {nav.icon}
                        </div>
                        <span
                            className={`
                                text-sm font-medium text-gray-600 whitespace-nowrap ml-4
                                transition-all duration-300 ease-in-out
                                ${isExpnadedNav
                                    ? 'opacity-100 w-auto'
                                    : 'opacity-0 w-0 ml-0 overflow-hidden'
                                }
                            `}
                        >
                            {nav.label}
                        </span>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar;