"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import GoogleButton from "../components/GoogleButton";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const router = useRouter();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setLoading(true);
    e.preventDefault();
    let newErrors: string[] = [];
    if (name === "") {
      newErrors.push("name required");
    }
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
    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        data.message !== "user created"
          ? setErrors([data.message])
          : router.push("/");

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("error");
    }
  };
  return (
    <main className="flex px-14 py-8 pt-4 rounded-lg mt-[6.5rem] flex-col items-center justify-center m-auto w-[25rem] bg-white">
      <h2 className="text-[2rem]	font-extrabold	mb-6">Sign Up</h2>
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
            errors.includes("Email already in use")
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
            : errors.includes("Email already in use")
            ? "Email already in use"
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
            errors.includes("pass required") ? "border-red-500" : ""
          }`}
          type="password"
          placeholder="Password"
        ></input>
        <p className="min-h-[2rem] text-red-500 font-medium text-end">
          {errors.includes("pass required") ? "Field required" : null}
        </p>
        <button
          disabled={loading}
          className={`flex justify-center items-center font-[600] shadow-e box-border h-[52px] mt-4 text-white rounded-[50px] bg-green p-[.5rem] ${
            loading ? "saturate-50" : ""
          }`}
        >
          {!loading ? "SIGN UP" : <div className="loader"></div>}
        </button>
        <Link className="mt-8" href={"/sign-in"}>
          Already have an account? <span className="text-green"> Sign In</span>
        </Link>
      </form>
    </main>
  );
}
