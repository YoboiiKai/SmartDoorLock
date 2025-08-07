import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
    LayoutDashboard,
    Users,
    Calendar,
    CheckCircle,
    Wifi,
    Fingerprint,
    QrCode,
    MessageSquare,
    FileText,
    Settings,
    Menu,
    X,
    ChevronDown,
    ChevronRight,
    Lock,
    Shield,
    UserCog,
    UserPen,
    Cog,
    HandCoins,
    Images,
    MessagesSquare,
    NotebookPen,
    PackagePlus,
    LogOut,
    User,
    Search,
    Sun,
    Moon,
    ChevronLeft,
} from "lucide-react";

const MenuItem = ({ icon: Icon, text, href, isCollapsed, badge, alert }) => {
    const { url } = usePage();
    const isActive = url.startsWith(href);
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div
            className={isCollapsed ? "relative flex justify-center" : ""}
            onMouseEnter={() => isCollapsed && setShowTooltip(true)}
            onMouseLeave={() => isCollapsed && setShowTooltip(false)}
        >
            <Link
                href={href}
                className={`group relative flex items-center px-3 py-2.5 mx-2 my-1.5 rounded-lg transition-all duration-200 ease-out ${
                    isActive
                        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30"
                        : `text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 
                           hover:text-blue-600 dark:hover:text-blue-400 ${isCollapsed ? 'justify-center' : ''}`
                }`}
            >
                <div
                    className={`flex items-center justify-center rounded-lg transition-all duration-200 ${
                        isCollapsed ? "w-10 h-10" : "w-9 h-9 mr-3"
                    } ${
                        isActive 
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                    }`}
                >
                    <Icon className="w-5 h-5" />
                </div>
                
                {!isCollapsed && (
                    <span className="font-medium text-sm transition-all duration-200">
                        {text}
                    </span>
                )}
                
                {badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold animate-pulse">
                        {badge}
                    </span>
                )}
                
                {alert && !isCollapsed && (
                    <span className="ml-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></span>
                )}
                
                {isActive && !isCollapsed && (
                    <div className="absolute right-3 w-1 h-6 bg-white rounded-full"></div>
                )}
            </Link>
            
            {/* Tooltip for collapsed sidebar */}
            {isCollapsed && showTooltip && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-gray-800 text-white text-xs font-medium rounded-md shadow-xl z-50 whitespace-nowrap">
                    <div className="relative">
                        {text}
                        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

const getInitials = (name) => {
    return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
};

export default function SuperAdminLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setSidebarOpen(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => {
        if (isMobile) {
            setSidebarOpen(!sidebarOpen);
        } else {
            setIsCollapsed(!isCollapsed);
        }
    };



    return (
        <div
            className={`flex h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 overflow-hidden`}
        >
            {/* Sidebar */}
            <aside
                className={`bg-white border-r border-gray-200/50 shadow-2xl ${
                    isCollapsed ? "w-20" : "w-64"
                } min-h-screen flex flex-col transition-all duration-500 ease-out ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 md:static fixed md:z-0 z-50`}
            >
                {/* Logo Section */}
                <div
                    className={`flex items-center justify-between ${
                        isCollapsed ? "px-4 py-4" : "px-6 py-6"
                    } border-b border-gray-100/50`}
                >
                    <div className="flex items-center">
                        {isCollapsed ? (
                            <div className="w-12 h-12 flex items-center justify-center">
                                <p className="text-lg md:text-2xl font-semibold">SD</p>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <div className="h-8 md:h-12 w-auto">
                                    <p className="text-lg md:text-2xl font-semibold">Smart Doorlock</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6">
                    <div className="px-3">
                        <MenuItem
                            icon={LayoutDashboard}
                            text="Dashboard"
                            href="/dashboard"
                            isCollapsed={isCollapsed}
                        />
                        <MenuItem
                            icon={NotebookPen}
                            text="Faculty"
                            href="/faculties"
                            isCollapsed={isCollapsed}
                        />
                        <MenuItem
                            icon={HandCoins}
                            text="Logs"
                            href="/admin/logs"
                            isCollapsed={isCollapsed}
                        />
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-1 overflow-hidden transition-all duration-500 ease-out">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-lg py-4 px-6 flex items-center justify-between z-10">
                    <div className="flex items-center">
                        <button
                            onClick={toggleSidebar}
                            className="text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600 mr-4 p-2 rounded-xl hover:bg-blue-50 transition-all duration-200 transform hover:scale-105"
                            aria-label="Toggle sidebar"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                        <div className="hidden md:block">
                            <h1 className="text-xl font-bold text-gray-800">
                                Admin Dashboard
                            </h1>
                            <p className="text-sm text-gray-500">
                                Manage your business operations
                            </p>
                        </div>
                    </div>

                    {/* Header Actions */}
                    <div className="flex items-center space-x-4">
{/* User Profile */}
                        <div className="relative ml-2">
                            <button
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                                className="flex items-center space-x-3 focus:outline-none group"
                            >
                                <div className="relative">
                                    {user.image && !imageError ? (
                                        <img
                                            src={`/storage/${user.image}`}
                                            alt={user.name}
                                            className="h-12 w-12 rounded-xl object-cover border-2 border-[#D2B48C] shadow-md group-hover:border-[#C19A6B] transition-all duration-200 transform group-hover:scale-105"
                                            onError={(e) => {
                                                console.error(
                                                    "Image failed to load:",
                                                    e.target.src
                                                );
                                                setImageError(true);
                                            }}
                                        />
                                    ) : (
                                        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200 transform group-hover:scale-105">
                                            <span className="text-sm font-bold text-white">
                                                {getInitials(user.name)}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-lg"></div>
                                </div>
                                <div className="hidden md:flex flex-col items-start space-y-0.5">
                                    <span className="text-sm font-semibold text-gray-800">
                                        {user.name}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        Super Administrator
                                    </span>
                                </div>
                                <ChevronDown
                                    className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                                        isDropdownOpen
                                            ? "transform rotate-180"
                                            : ""
                                    }`}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-3 w-80 py-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 z-30">
                                    <div className="px-6 py-4 border-b border-gray-100">
                                        <div className="flex items-center space-x-4">
                                            {user.image && !imageError ? (
                                                <img
                                                    src={`/storage/${user.image}`}
                                                    alt={user.name}
                                                    className="h-16 w-16 rounded-xl object-cover border-2 border-[#D2B48C] shadow-lg"
                                                    onError={(e) => {
                                                        console.error(
                                                            "Image failed to load:",
                                                            e.target.src
                                                        );
                                                        setImageError(true);
                                                    }}
                                                />
                                            ) : (
                                                <div className="h-16 w-16 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center shadow-lg">
                                                    <span className="text-lg font-bold text-white">
                                                        {getInitials(user.name)}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-lg font-bold text-gray-800 truncate">
                                                    {user.name}
                                                </p>
                                                <p className="text-sm text-gray-600 truncate">
                                                    {user.email}
                                                </p>
                                                <div className="flex items-center mt-1">
                                                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 shadow-sm"></div>
                                                    <span className="text-xs text-gray-500">
                                                        Online
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-2">
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="flex items-center w-full px-6 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
                                        >
                                            <LogOut className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                                            Sign Out
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-8 relative z-1">
                    {/* Content */}
                    <div className="relative max-w-7xl mx-auto">{children}</div>
                </main>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && isMobile && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
}
