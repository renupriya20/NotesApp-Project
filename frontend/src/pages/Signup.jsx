import React, { useState } from 'react'
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

    const navigate = useNavigate()

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log(formData);
        let { username, email, password } = formData;

        if (!username || !email || !password) {
            toast.error("All fields are required !!");
            return;
        }

        try {
            let resp = await AxiosInstance.post("/users", formData);
            console.log(resp);
            toast.success("Signup Successfully");
            setFormData({ username: "", email: "", password: "" })
            navigate("/login");

        } catch (error) {
            console.log(error);
            toast.error("Signup Failed")


        }

    };

    return (
        <main className="h-screen w-full bg-gray-50 flex items-center justify-center p-4">

            <form
                onSubmit={handleSignup}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100"
            >
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Create Account
                    </h1>
                    <p className="text-gray-500 flex items-center justify-center gap-2">
                        Signup to get started  <GoRocket className="text-blue-500 text-lg" />
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label
                            htmlFor='username'
                            className="block text-sm font-medium text-gray-700"
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
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label
                            htmlFor='email'
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            placeholder='Enter your email'
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label
                            htmlFor='password'
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Enter your password'
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"

                        />
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-200"
                    >
                        Sign Up
                    </button>
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
                            Login</Link>
                    </p>
                </div>
            </form>
        </main>
    )
}

export default Signup