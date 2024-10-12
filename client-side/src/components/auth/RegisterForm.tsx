import { Register } from "@/api/AuthAPI";

export default function RegisterForm() {
  return (
    <>
    Register
      <form action={Register}>
        <input type="text" name="username" />
        <label htmlFor="username">username</label>

        <input type="email" name="email" />
        <label htmlFor="email">email</label>

        <input type="text" name="password" />
        <label htmlFor="password">password</label>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
