"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { apiClient } from "@/libs/api";
import useAuthStore from "@/store/useAuthStore";
import { getDashboardPath, setAuth } from "@/libs/auth";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();
  const setAuthStore = useAuthStore((state) => state.setAuth);
  const [apiError, setApiError] = useState("");
  const schema = z
    .object({
      first_name: z.string().min(1, "First name is required"),
      last_name: z.string().min(1, "Last name is required"),
      email: z.string().email("Enter a valid email"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      password_confirmation: z
        .string()
        .min(8, "Password confirmation is required"),
      accept_terms: z
        .boolean()
        .refine((value) => value === true, { message: "Accept the terms" }),
    })
    .refine((values) => values.password === values.password_confirmation, {
      message: "Passwords do not match",
      path: ["password_confirmation"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      accept_terms: false,
    },
  });
  const passwordValue = watch("password");
  const confirmValue = watch("password_confirmation");
  const showMatchState = Boolean(confirmValue);
  const passwordsMatch =
    showMatchState && passwordValue === confirmValue;

  const onSubmit = async (values) => {
    setApiError("");
    try {
      const registerResponse = await apiClient.post("/v1/auth/register", {
        first_name: values.first_name,
        last_name: values.last_name,
        name: `${values.first_name} ${values.last_name}`.trim(),
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
      });

      if (registerResponse?.data?.status !== "success") {
        const message =
          registerResponse?.data?.message ||
          "Registration failed. Please try again.";
        setApiError(message);
        toast.error(message);
        return;
      }

      const loginResponse = await apiClient.post("/v1/auth/login", {
        email: values.email,
        password: values.password,
      });

      if (loginResponse?.data?.status !== "success") {
        toast.success("Registration successful. Please log in.");
        router.push("/login");
        return;
      }

      const token = loginResponse?.data?.data?.token;
      const user = loginResponse?.data?.data?.user;
      setAuth(token, user);
      setAuthStore(token, user);
      toast.success("Welcome to Sir Academy!");
      router.push(getDashboardPath(user));
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Registration failed. Please check your details.";
      setApiError(message);
      toast.error(message);
    }
  };
  return (
    <div className="transition-opacity duration-150 ease-linear">
      {/* heading   */}
      <div className="text-center">
        <h3 className="text-size-32 font-bold text-blackColor dark:text-blackColor-dark mb-2 leading-normal">
          Sing Up
        </h3>
        <p className="text-contentColor dark:text-contentColor-dark mb-15px">
          Already have an account?
          <a
            href="login.html"
            className="hover:text-primaryColor relative after:absolute after:left-0 after:bottom-0.5 after:w-0 after:h-0.5 after:bg-primaryColor after:transition-all after:duration-300 hover:after:w-full"
          >
            Log In
          </a>
        </p>
      </div>

      <form className="pt-25px" data-aos="fade-up" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-30px gap-y-25px mb-25px">
          <div>
            <label className="text-contentColor dark:text-contentColor-dark mb-10px block">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              {...register("first_name")}
              className="w-full h-52px leading-52px pl-5 bg-transparent text-sm focus:outline-none text-contentColor dark:text-contentColor-dark border border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 font-medium rounded"
            />
            {errors.first_name ? (
              <p className="text-sm text-red-500 mt-2">{errors.first_name.message}</p>
            ) : null}
          </div>
          <div>
            <label className="text-contentColor dark:text-contentColor-dark mb-10px block">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              {...register("last_name")}
              className="w-full h-52px leading-52px pl-5 bg-transparent text-sm focus:outline-none text-contentColor dark:text-contentColor-dark border border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 font-medium rounded"
            />
            {errors.last_name ? (
              <p className="text-sm text-red-500 mt-2">{errors.last_name.message}</p>
            ) : null}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-30px gap-y-25px mb-25px">
          <div>
            <label className="text-contentColor dark:text-contentColor-dark mb-10px block">
              Email
            </label>
            <input
              type="email"
              placeholder="Your Email"
              {...register("email")}
              className="w-full h-52px leading-52px pl-5 bg-transparent text-sm focus:outline-none text-contentColor dark:text-contentColor-dark border border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 font-medium rounded"
            />
            {errors.email ? (
              <p className="text-sm text-red-500 mt-2">{errors.email.message}</p>
            ) : null}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-30px gap-y-25px mb-25px">
          <div>
            <label className="text-contentColor dark:text-contentColor-dark mb-10px block">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full h-52px leading-52px pl-5 bg-transparent text-sm focus:outline-none text-contentColor dark:text-contentColor-dark border border-borderColor dark:border-borderColor-dark placeholder:text-placeholder placeholder:opacity-80 font-medium rounded"
            />
            {errors.password ? (
              <p className="text-sm text-red-500 mt-2">{errors.password.message}</p>
            ) : null}
          </div>
          <div>
            <label className="text-contentColor dark:text-contentColor-dark mb-10px block">
              Re-Enter Password
            </label>
            <input
              type="password"
              placeholder="Re-Enter Password"
              {...register("password_confirmation")}
              className={`w-full h-52px leading-52px pl-5 bg-transparent text-sm focus:outline-none text-contentColor dark:text-contentColor-dark border placeholder:text-placeholder placeholder:opacity-80 font-medium rounded ${
                showMatchState
                  ? passwordsMatch
                    ? "border-green-500 dark:border-green-400"
                    : "border-red-500 dark:border-red-400"
                  : "border-borderColor dark:border-borderColor-dark"
              }`}
            />
            {showMatchState ? (
              <p
                className={`text-sm mt-2 ${
                  passwordsMatch ? "text-green-600" : "text-red-500"
                }`}
              >
                {passwordsMatch ? "Passwords match" : "Passwords do not match"}
              </p>
            ) : null}
            {errors.password_confirmation ? (
              <p className="text-sm text-red-500 mt-2">
                {errors.password_confirmation.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="text-contentColor dark:text-contentColor-dark flex items-center">
          <input
            type="checkbox"
            id="accept-pp"
            {...register("accept_terms")}
            className="w-18px h-18px mr-2 block box-content"
          />
          <label htmlFor="accept-pp">Accept the Terms and Privacy Policy</label>
        </div>
        {errors.accept_terms ? (
          <p className="text-sm text-red-500 mt-2">{errors.accept_terms.message}</p>
        ) : null}
        {apiError ? (
          <p className="text-sm text-red-500 mt-4 text-center">{apiError}</p>
        ) : null}
        <div className="mt-25px text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-size-15 text-whiteColor bg-primaryColor px-25px py-10px w-full border border-primaryColor hover:text-primaryColor hover:bg-whiteColor inline-block rounded group dark:hover:text-whiteColor dark:hover:bg-whiteColor-dark"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
