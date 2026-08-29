import { useState } from "react";
import { useAuth } from "../context/UserContextProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosInstance } from "../config/axiosIntance";

const Navbar = () => {
    const { user, setUser } = useAuth();
    const [menuToggle, setMenuToggle] = useState(false);
    const handleMenuToggle = () => setMenuToggle((prev) => !prev);

    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("authUser");
        navigate("/login");
        toast.success("Logged out successfully");
    };

    const handleDeleteProfile = async (id) => {
        const confirmed = window.confirm(
            "Delete your account? This can't be undone."
        );
        if (!confirmed) return;

        try {
            await AxiosInstance.delete(`/users/${id}`);
            setUser(null);
            localStorage.removeItem("authUser");
            navigate("/signup");
            toast.success("Profile deleted");
        } catch (error) {
            console.log(error);
            toast.error("Unable to delete profile");
        }
    };

    if (!user) return null;

    return (
        <header className="flex items-center justify-between border-b border-paper-line bg-paper px-4 py-5 sm:px-10 lg:px-20">
            <Link
                to="/"
                className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
            >
                <figure>📖</figure>
                <div>
                    <span className="text-rule">Notes</span> App
                </div>
            </Link>

            <nav className="flex items-center gap-4 sm:gap-5">
                <div
                    onClick={handleMenuToggle}
                    className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-ink font-mono font-bold text-paper"
                >
                    {user.username?.charAt(0).toUpperCase()}

                    {menuToggle && (
                        <ul
                            onClick={handleMenuToggle}
                            className="card-index absolute right-0 top-13 min-w-52 cursor-pointer p-2 py-5 pl-8 text-left text-sm font-normal text-ink"
                        >
                            <li className="px-4 py-2 text-ink-soft">
                                Signed in as{" "}
                                <span className="font-semibold text-ink">
                                    {user.username}
                                </span>
                            </li>
                            <Link
                                to={`/edit-user/${user.id}`}
                                className="block rounded px-4 py-2 hover:bg-paper"
                            >
                                Update Profile
                            </Link>
                            <li
                                className="rounded px-4 py-2 hover:bg-paper"
                                onClick={handleLogout}
                            >
                                Logout
                            </li>
                            <li
                                className="rounded px-4 py-2 text-rule hover:bg-rule-soft/40"
                                onClick={() => handleDeleteProfile(user.id)}
                            >
                                Delete Profile
                            </li>
                        </ul>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
