"use client"
import { Login } from "@/actions/auth/login";
import styles from "./auth.module.css"
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function LoginForm() {

  const router = useRouter();

  const handleSignUpClick = () => {
    const params = new URLSearchParams(window.location.search);
    params.set('register', 'true');
  
    // Update the URL without reloading the page
    router.replace(`?${params.toString()}`);
  };

  const handleLogInEvent = async(event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('nice')
    const response = await Login(new FormData(event.currentTarget));


    if(response == 200) router.push('/')
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl">Welcome back!</h1>
        <p className="text-gray-600">Please enter your details</p>
      </div>

      <button className={`${styles.button} my-[20px] py-[3px] text-black`}>Login with Google</button>

      <div className={styles['line-container']}>
        <span className={styles.line}></span>
        <span className="mx-2">or</span>
        <span className={styles.line}></span>
      </div>


      <form className={styles.form} onSubmit={handleLogInEvent} >
        <label htmlFor="email">Email</label>
        <input type="text" name="email" className={styles.input} placeholder="Enter your email"/>

        <label htmlFor="password">Password</label>
        <input type="text" name="password" className={styles.input} placeholder="Enter your password"/>

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
