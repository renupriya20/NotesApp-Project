import { useState } from "react";
import toast from "react-hot-toast";
import { GoRocket } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { AxiosInstance } from "../config/axiosIntance";
import { useAuth } from "../context/UserContextProvider";

const Login = () => {
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password) {
      toast.error("All fields are required !!");
      return;
    }

    setIsLoading(true);
    try {
      // Ask the backend for a matching user directly instead of downloading
      // the entire users table and filtering it in the browser.
      const resp = await AxiosInstance.get(
        `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(
          password
        )}`
      );

      const authUser = resp.data[0];

      if (!authUser) {
        toast.error("Invalid email or password");
        return;
      }

      const userData = {
        id: authUser.id,
        username: authUser.username,
        email: authUser.email,
      };

      localStorage.setItem("authUser", JSON.stringify(userData));
      setUser(userData);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-ruled flex h-screen w-full items-center justify-center bg-paper p-4">
      <form
        onSubmit={handleLogin}
        className="card-index w-full max-w-md space-y-6 p-8 pt-10"
      >
        <div className="space-y-1.5 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
             Sign in
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
            Welcome Back
          </h1>
          <p className="flex items-center justify-center gap-2 text-ink-soft">
            Login to continue <GoRocket className="text-lg text-rule" />
          </p>
        </div>

        <div className="space-y-4">
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
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-paper-line bg-paper px-4 py-2.5 text-ink transition-all duration-200 placeholder:text-ink-faint focus:border-ink focus:bg-card focus:outline-none focus:ring-2 focus:ring-ink/20"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block font-mono text-xs uppercase tracking-wide text-ink-soft"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
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
            {isLoading ? "Logging in..." : "Log in"}
          </button>

          <p className="mt-6 text-center text-sm text-ink-soft">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-rule hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
};

export default Login;
