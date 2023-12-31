"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter  } from "next/navigation";

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const router = useRouter()

    const onSubmit = handleSubmit( async (data) => {
        const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        });

        if(res.ok){
            router.push("/dashboard")
        }else{
            console.log("ocurrio un error");
        }

       
    });

    return (
        <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
            <form onSubmit={onSubmit} className="w-1/4">
                <h1 className="text-slate-200 font-bold text-4xl mb-4">
                    Login
                </h1>

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

                <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
