import { Login } from "@/api/AuthAPI";

export default function LoginForm() {
  return (
    <>
    Login
      <form action={Login}>
        <input type="text" name="email" />
        <label htmlFor="email">email</label>

        <input type="text" name="password" />
        <label htmlFor="password">password</label>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
