// import React, { useEffect, useState } from 'react'
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

    const navigate = useNavigate();
    let params = useParams(); // { id : 1 }

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function getUpdateUser() {
        try {
            let resp = await AxiosInstance.get(`/users/${params.id}`);
            console.log(resp.data);
            setFormData(resp.data);
        } catch (error) {
            console.log(error);
            toast.error("Unable to fetch user data");
        }
    }

    useEffect(() => {
        getUpdateUser();
    }, [params.id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        let { username, email, password } = formData;
        if (!username || !email || !password) {
            toast.error("All fields are required !!");
            return;
        }

        try {
            // update logic here...
            let resp = await AxiosInstance.put(`/users/${params.id}`, formData);
            console.log(resp);
            toast.success("Profile Updated");
            localStorage.removeItem("authUser");
            setUser(null);
            navigate("/login");

        } catch (error) {
            console.log(error);
            toast.error("Update Failed");
        }
    };

    return (
        <main className="h-screen w-full bg-gray-50 flex items-center justify-center p-4">
            <form
                onSubmit={handleUpdate}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100"
            >
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Update Profile
                    </h1>
                    <p className="text-gray-500 flex items-center justify-center gap-2">
                        Update your credential{" "}
                        <GoRocket className="text-blue-500 text-lg" />
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
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
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            readOnly
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
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
                        Update
                    </button>
                </div>
            </form>
        </main>
    );
};

export default EditProfile;