"use server";

import userSchema from "@/schemas/user";
import { error } from "console";
import { cookies } from "next/headers";

export async function Login(formData: FormData) {
  const user = {
    username: "null",
    password: formData.get("password")?.toString(),
    email: formData.get("email")?.toString(),
  };

  try {
    userSchema.parse(user);
    const response = await fetch(
      `${process.env.API_URL}${process.env.AUTH_LOGIN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    const token = await response.text();
    if (!token) return error("TOKEN IS INVALID");

    console.log(token);

    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });
    console.log("cookies set");
    return 200
  } catch (error) {
    console.log(error);
}
return 500
}
