"use client";

import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Input } from "@/src/components";
import { toast } from "sonner";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/profiles");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          })
        )
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            router.push("/profiles");
          }
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            router.push("/profiles");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }

        if (callback?.ok) {
          router.push("/profiles");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.png')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-[9px] sm:block flex items-center justify-center">
          <img src="/images/logo.png" className="sm:h-12 h-14" alt="Logo" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 sm:px-16 px-8 py-12 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "LOGIN" ? "Welcome Back!" : "Create Account"}
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {variant === "REGISTER" && (
                <Input
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  id="name"
                  label="Name"
                />
              )}
              <Input
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                id="email"
                label="Email address"
                type="email"
              />
              <Input
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                id="password"
                label="Password"
                type="password"
              />
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 hover:bg-gradient-to-br focus:outline-none py-3 text-white rounded-md w-full mt-10"
                >
                  {variant === "LOGIN" ? "Login" : "Sign up"}
                </button>
              </div>
            </form>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => socialAction("google")}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={32} />
              </div>
              <div
                onClick={() => socialAction("github")}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={32} />
              </div>
            </div>
            <p className="text-neutral-500 mt-8 text-center">
              {variant === "LOGIN"
                ? "First time using Muvo?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white hover:text-lime-400 ml-1 hover:underline cursor-pointer"
              >
                {variant === "LOGIN" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
