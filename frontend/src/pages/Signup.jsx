import { useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AxiosInstance } from '../config/axiosIntance';
import { useNavigate } from 'react-router-dom';
import { GoRocket } from "react-icons/go";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        let { username, email, password } = formData;
        username = username.trim();
        email = email.trim();

        if (!username || !email || !password) {
            toast.error("All fields are required !!");
            return;
        }

        setIsLoading(true);
        try {
            const existing = await AxiosInstance.get(
                `/users?email=${encodeURIComponent(email)}`
            );

            if (existing.data.length > 0) {
                toast.error("An account with this email already exists");
                return;
            }

            await AxiosInstance.post("/users", { username, email, password });
            toast.success("Signup Successfully");
            setFormData({ username: "", email: "", password: "" });
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error("Signup Failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="bg-ruled flex h-screen w-full items-center justify-center bg-paper p-4">
            <form
                onSubmit={handleSignup}
                className="card-index w-full max-w-md space-y-6 p-8 pt-10"
            >
                <div className="space-y-1.5 text-center">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                         New notebook
                    </p>
                    <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
                        Create Account
                    </h1>
                    <p className="flex items-center justify-center gap-2 text-ink-soft">
                        Signup to get started <GoRocket className="text-lg text-rule" />
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label
                            htmlFor='username'
                            className="block font-mono text-xs uppercase tracking-wide text-ink-soft"
                        >
                            Username
                        </label>
                        <input
                            type='text'
                            name='username'
                            id='username'
                            placeholder='Enter your name'
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-paper-line bg-paper px-4 py-2.5 text-ink transition-all duration-200 placeholder:text-ink-faint focus:border-ink focus:bg-card focus:outline-none focus:ring-2 focus:ring-ink/20"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label
                            htmlFor='email'
                            className="block font-mono text-xs uppercase tracking-wide text-ink-soft"
                        >
                            Email
                        </label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            placeholder='you@example.com'
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-paper-line bg-paper px-4 py-2.5 text-ink transition-all duration-200 placeholder:text-ink-faint focus:border-ink focus:bg-card focus:outline-none focus:ring-2 focus:ring-ink/20"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label
                            htmlFor='password'
                            className="block font-mono text-xs uppercase tracking-wide text-ink-soft"
                        >
                            Password
                        </label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            placeholder='••••••••'
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-paper-line bg-paper px-4 py-2.5 text-ink transition-all duration-200 placeholder:text-ink-faint focus:border-ink focus:bg-card focus:outline-none focus:ring-2 focus:ring-ink/20"
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-lg bg-ink py-2.5 font-semibold text-paper shadow-sm transition-all duration-200 hover:bg-ink-dark hover:shadow disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading ? "Creating account..." : "Sign Up"}
                    </button>
                    <p className="mt-6 text-center text-sm text-ink-soft">
                        Already have an account?{" "}
                        <Link to="/login" className="font-semibold text-rule hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </main>
    )
}

export default Signup
