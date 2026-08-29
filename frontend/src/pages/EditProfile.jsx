import { Link, useNavigate, useParams } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AxiosInstance } from "../config/axiosIntance";
import { useAuth } from "../context/UserContextProvider";

const EditProfile = () => {
    const { setUser } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    let params = useParams(); // { id : 1 }

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function getUpdateUser() {
        try {
            let resp = await AxiosInstance.get(`/users/${params.id}`);
            setFormData({ ...resp.data, password: "" });
        } catch (error) {
            console.log(error);
            toast.error("Unable to fetch user data");
        }
    }

    useEffect(() => {
        getUpdateUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const username = formData.username.trim();

        if (!username) {
            toast.error("Username is required !!");
            return;
        }

        const payload = { username };
        if (formData.password) payload.password = formData.password;

        setIsLoading(true);
        try {
            const resp = await AxiosInstance.patch(`/users/${params.id}`, payload);
            toast.success("Profile Updated");

            const updatedUser = {
                id: resp.data.id,
                username: resp.data.username,
                email: resp.data.email,
            };
            localStorage.setItem("authUser", JSON.stringify(updatedUser));
            setUser(updatedUser);

            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Update Failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="bg-ruled flex h-screen w-full items-center justify-center bg-paper p-4">
            <form
                onSubmit={handleUpdate}
                className="card-index w-full max-w-md space-y-6 p-8 pt-10"
            >
                <div className="space-y-1.5 text-center">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                        Entry 03 — Edit details
                    </p>
                    <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
                        Update Profile
                    </h1>
                    <p className="flex items-center justify-center gap-2 text-ink-soft">
                        Update your credentials <GoRocket className="text-lg text-rule" />
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label
                            htmlFor="username"
                            className="block font-mono text-xs uppercase tracking-wide text-ink-soft"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-paper-line bg-paper px-4 py-2.5 text-ink transition-all duration-200 placeholder:text-ink-faint focus:border-ink focus:bg-card focus:outline-none focus:ring-2 focus:ring-ink/20"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label
                            htmlFor="email"
                            className="block font-mono text-xs uppercase tracking-wide text-ink-soft"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            readOnly
                            value={formData.email}
                            className="w-full cursor-not-allowed rounded-lg border border-paper-line bg-paper-line/40 px-4 py-2.5 text-ink-soft"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label
                            htmlFor="password"
                            className="block font-mono text-xs uppercase tracking-wide text-ink-soft"
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Leave blank to keep current password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-paper-line bg-paper px-4 py-2.5 text-ink transition-all duration-200 placeholder:text-ink-faint focus:border-ink focus:bg-card focus:outline-none focus:ring-2 focus:ring-ink/20"
                        />
                    </div>
                </div>

                <div className="space-y-3 pt-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-lg bg-ink py-2.5 font-semibold text-paper shadow-sm transition-all duration-200 hover:bg-ink-dark hover:shadow disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading ? "Updating..." : "Update"}
                    </button>
                    <Link
                        to="/"
                        className="block text-center text-sm text-ink-soft hover:text-rule hover:underline"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </main>
    );
};

export default EditProfile;
