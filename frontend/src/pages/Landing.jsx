import { Link } from 'react-router-dom';

export default function Landing() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 mb-6">
                Hackathon Starter Template
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
                A production-ready, scalable, and modular template for your next hackathon victory.
            </p>
            <div className="space-x-4">
                <Link
                    to="/login"
                    className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30"
                >
                    Get Started
                </Link>
                <Link
                    to="/dashboard"
                    className="inline-block px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-white rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                >
                    View Dashboard
                </Link>
            </div>
        </div>
    );
}
