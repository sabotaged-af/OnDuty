import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDarkMode } from '../hooks/useDarkMode';
import { LogOut, Home, LayoutDashboard, Settings, Moon, Sun } from 'lucide-react';

export default function Layout() {
    const { signOut, user } = useAuth();
    const [isDark, setIsDark] = useDarkMode();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 font-bold text-xl text-indigo-600 dark:text-indigo-400">
                    HackTemplate
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/dashboard" className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/" className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                        <Home size={20} />
                        <span>Home</span>
                    </Link>
                    {/* Add more links here */}
                </nav>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                    <div className="text-sm text-gray-500 dark:text-gray-400 px-4 truncate">
                        {user?.email}
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white dark:bg-gray-800 shadow-sm z-10 p-4 md:hidden flex justify-between items-center">
                    <div className="font-bold text-indigo-600">HackTemplate</div>
                    {/* Mobile menu button implementation can go here */}
                </header>

                <main className="flex-1 overflow-auto p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
