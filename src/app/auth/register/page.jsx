"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const router = useRouter();

    const onSubmit = handleSubmit(
        async ({ email, password, username, confirmPassword }) => {
            if (password != confirmPassword) {
                return alert("Password do not match");
            }

            try {
                const response = await axios.post("/api/auth/register", {
                    email,
                    password,
                    username,
                });

                if (response.status === 200) {
                    router.push("/auth/login");
                }
            } catch ({ response }) {
                const { message } = response.data;

                if (message) {
                    console.log(message);
                } else {
                    console.error("Error inesperado.");
                }
            }
        }
    );

    return (
        <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
            <form onSubmit={onSubmit} className="w-1/4">
                <h1 className="text-slate-200 font-bold text-4xl mb-4">
                    Register
                </h1>
                <label
                    htmlFor="username"
                    className="text-slate-500 mb-2 block text-sm"
                >
                    Username
                </label>
                <input
                    type="text"
                    {...register("username", {
                        required: {
                            value: true,
                            message: "Username is required",
                        },
                    })}
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                />
                {errors.username && (
                    <span className="text-red-500 text-sm">
                        {errors.username.message}
                    </span>
                )}
                <label
                    htmlFor="email"
                    className="text-slate-500 mb-2 block text-sm"
                >
                    Email
                </label>
                <input
                    type="email"
                    {...register("email", {
                        required: {
                            type: "email",
                            value: true,
                            message: "Email is required",
                        },
                    })}
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                />
                {errors.email && (
                    <span className="text-red-500 text-sm">
                        {errors.email.message}
                    </span>
                )}
                <label
                    htmlFor="password"
                    className="text-slate-500 mb-2 block text-sm"
                >
                    Password
                </label>
                <input
                    type="password"
                    {...register("password", {
                        required: {
                            value: true,
                            message: "Password is required",
                        },
                    })}
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                />
                {errors.password && (
                    <span className="text-red-500 text-sm">
                        {errors.password.message}
                    </span>
                )}
                <label
                    htmlFor="confirmPassword"
                    className="text-slate-500 mb-2 block text-sm"
                >
                    Confirm Password
                </label>
                <input
                    type="password"
                    {...register("confirmPassword", {
                        required: {
                            value: true,
                            message: "Confirm Password is required",
                        },
                    })}
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                />
                {errors.confirmPassword && (
                    <span className="text-red-500 text-sm">
                        {errors.confirmPassword.message}
                    </span>
                )}

                <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
