import { Register } from "@/api/AuthAPI";
import styles from "./auth.module.css"
import { useRouter } from "next/navigation";

export default function RegisterForm() {

  const router = useRouter();
  const handleLogInClick = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete('register');
  
    // Update the URL without reloading the page
    router.replace(`?${params.toString()}`);
  };
  
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl">Create your account</h1>
        <p className="text-gray-600">Ready to get productive?</p>
      </div>

      <button className={`${styles.button} my-[20px] py-[3px] text-black`}>Login with Google</button>

      <div className={styles['line-container']}>
        <span className={styles.line}></span>
        <span className="mx-2">or</span>
        <span className={styles.line}></span>
      </div>

      <form action={Register} className={`${styles.form}`}>
        <label htmlFor="username">Name</label>
        <input type="text" name="username" className={styles.input} placeholder="Enter your name"/>

        <label htmlFor="email">Email</label>
        <input type="email" name="email" className={styles.input} placeholder="Enter your email"/>

        <label htmlFor="password">Password</label>
        <input type="text" name="password" className={styles.input} placeholder="Enter your password"/>

        <button type="submit" className={styles['submit-button']}>Register</button>
      </form>
      <div className={styles.redirect}>
        <p>Already have an account?</p>
        <button className={`${styles['link-button']} ml-1`} onClick={handleLogInClick}>Log in</button>
      </div>
    </>
  );
}
