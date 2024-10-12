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
    <>
        {formState? <RegisterForm></RegisterForm> : <LoginForm></LoginForm>}
    </>
  );
}
