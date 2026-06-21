import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <main className="h-screen w-full bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center space-y-6 border border-gray-100">

                <div className="space-y-3">
                    <h1 className="text-7xl font-extrabold text-blue-600 tracking-tight">
                        404
                    </h1>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-gray-500 text-sm px-4">
                        The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
                    </p>
                </div>

                <div className="pt-2">
                    <Link
                        to="/"
                        className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-200"
                    >
                        Go back Home
                    </Link>
                </div>

            </div>
        </main>
    );
};

export default NotFound;
