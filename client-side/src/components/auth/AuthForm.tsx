"use client"
import { URLSearchParams } from "url";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useSearchParams } from "next/navigation";
export default function AuthForm() {
    const searchParams = useSearchParams()

    const formState = searchParams.has("register");
    console.log(formState)
  return (
    <div className="min-w-[230px] max-w-[320px] w-[70%]">
        {formState? <RegisterForm></RegisterForm> : <LoginForm></LoginForm>}
    </div>
  );
}
