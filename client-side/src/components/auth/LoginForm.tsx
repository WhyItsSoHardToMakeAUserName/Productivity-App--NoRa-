"use client"
import { Login } from "@/actions/auth/login";
import styles from "./auth.module.css";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import LoadingAnimation from "../ui/LoadingAnimation";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const router = useRouter();

  const handleSignUpClick = () => {
    const params = new URLSearchParams(window.location.search);
    params.set('register', 'true');
    router.replace(`?${params.toString()}`);
  };

  const handleLogInEvent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      const response = await Login(new FormData(event.currentTarget));
      if (response === 200) {
        router.refresh();
      } else {
        toast.error('Invalid Password or Email. Check your credentials');
      }
    } catch {
      toast.error('Login failed. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <>
      <ToastContainer />
      {isLoading && <LoadingAnimation />}

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl">Welcome back!</h1>
        <p className="text-gray-600">Please enter your details</p>
      </div>

      <button onClick={()=>{toast.warning("OAuth is currently unavailable")}} className={`${styles.button} my-[20px] py-[3px] text-black`}>Login with Google</button>

      <div className={styles['line-container']}>
        <span className={styles.line}></span>
        <span className="mx-2">or</span>
        <span className={styles.line}></span>
      </div>

      <form className={styles.form} onSubmit={handleLogInEvent}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" required className={styles.input} placeholder="Enter your email" />

        <label htmlFor="password">Password</label>
        <div className={`${styles.input} flex justify-between`}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="outline-none flex-grow overflow-y-scroll"
            required
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="px-[7px]"
          >
            {showPassword?"Show":"Hide"}
          </button>
        </div>

        <button className={`text-gray-500 hover:text-gray-200 opacity-70 ml-auto`}>Forgot password?</button>

        <button type="submit" className={styles['submit-button']}>Log in</button>
      </form>

      <div className={styles.redirect}>
        <p>Don't have an account?</p>
        <button className={`${styles['link-button']} ml-1`} onClick={handleSignUpClick}>Sign up</button>
      </div>
    </>
  );
}
