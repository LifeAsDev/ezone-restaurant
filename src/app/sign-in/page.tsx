"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import GoogleButton from "@/app/components/GoogleButton";
export default function Home() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setLoading(true);
    e.preventDefault();
    let newErrors: string[] = [];

    if (email === "") {
      newErrors.push("email required");
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.push("email invalid");
    }

    if (password === "") {
      newErrors.push("pass required");
    }

    setErrors((arr) => [...newErrors]);
    if (newErrors.length > 0) {
      return setLoading(false);
    }

    const res: any = await signIn("credentials", {
      password,
      email,
      redirect: false,
      callbackUrl: `${window.location.origin}`,
    });

    if (!res.error) {
      setLoading(false);
      router.push("/");
    } else {
      setErrors(["wrong credentials"]);
      setLoading(false);
    }
  };
  return (
    <main className="flex px-14 py-8 pt-4 rounded-lg mt-[6.5rem] flex-col items-center justify-center m-auto w-[25rem] bg-white">
      <h2 className="text-[2rem]	font-extrabold	mb-6">Welcome</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-0.5 w-full">
        <GoogleButton />

        <input
          onBlur={() => setErrors([])}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value.replace(" ", ""));
            setErrors([]);
          }}
          className={`pb-3 outline-0  border-b-2  ${
            errors.includes("email required") ||
            errors.includes("email invalid") ||
            errors.includes("wrong credentials")
              ? "border-red-500"
              : ""
          }`}
          type="text"
          placeholder="Email"
        ></input>
        <p className="min-h-[2rem] text-red-500 font-medium text-end">
          {errors.includes("email required")
            ? "Field required"
            : errors.includes("email invalid")
            ? "Email invalid"
            : errors.includes("wrong credentials")
            ? "Incorrect Email"
            : null}
        </p>
        <input
          onBlur={() => setErrors([])}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value.replace(" ", ""));
            setErrors([]);
          }}
          className={`pb-3 outline-0  border-b-2  ${
            errors.includes("pass required") ||
            errors.includes("wrong credentials")
              ? "border-red-500"
              : null
          }`}
          type="password"
          placeholder="Password"
        ></input>
        <p className="min-h-[2rem] text-red-500 font-medium text-end">
          {errors.includes("pass required")
            ? "Field required"
            : errors.includes("wrong credentials")
            ? "Incorrect Password"
            : null}
        </p>
        <button
          disabled={loading}
          className={`flex justify-center items-center shadow-e box-border font-[600] mt-4 h-[52px] text-white rounded-[50px] bg-greenn p-[.5rem] ${
            loading ? "saturate-50" : ""
          }`}
        >
          {!loading ? "SIGN IN" : <div className="loader"></div>}
        </button>
        <Link className="mt-8" href={"/sign-up"}>
          Don&apos;t have an account?
          <span className="text-greenn"> Sign up</span>
        </Link>
      </form>
    </main>
  );
}
