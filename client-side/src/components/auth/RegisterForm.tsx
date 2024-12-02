import { Register } from "@/actions/auth/register";
import styles from "./auth.module.css"
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import LoadingAnimation from "../ui/LoadingAnimation";

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';


export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const router = useRouter();
  const handleLogInClick = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete('register');
  
    // Update the URL without reloading the page
    router.replace(`?${params.toString()}`);
  };
  
  const  handleRegisterEvent = async(e:FormEvent<HTMLFormElement>)=> {
    e.preventDefault()

    setIsLoading(true);
    const response = await Register(new FormData(e.currentTarget));

    if(response == 200){
      toast.success('registered')
    }
    else{
      toast.error('User with this email already exists. Try logging in')
    }

    setIsLoading(false);
  }

  return (
    <>
      <ToastContainer />
      {isLoading && <LoadingAnimation></LoadingAnimation>}

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl">Create your account</h1>
        <p className="text-gray-600">Ready to get productive?</p>
      </div>

      <button onClick={()=>{toast.warning("OAuth is currently unavailable")}} className={`${styles.button} my-[20px] py-[3px] text-black`}>Register with Google</button>

      <div className={styles['line-container']}>
        <span className={styles.line}></span>
        <span className="mx-2">or</span>
        <span className={styles.line}></span>
      </div>

      <form onSubmit={handleRegisterEvent} className={`${styles.form}`}>
        <label htmlFor="username">Name</label>
        <input type="text" name="username" required className={styles.input} placeholder="Enter your name"/>

        <label htmlFor="email">Email</label>
        <input type="email" name="email" required className={styles.input} placeholder="Enter your email"/>

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

        <button type="submit" className={styles['submit-button']}>Register</button>
      </form>
      <div className={styles.redirect}>
        <p>Already have an account?</p>
        <button className={`${styles['link-button']} ml-1`} onClick={handleLogInClick}>Log in</button>
      </div>
    </>
  );
}
