import { NextResponse } from "next/server";

export function POST() {
  const response = NextResponse.json({ message: "Logged out" });

  response.cookies.set({
    name: "token",
    value: "",
    maxAge: 0,
    path: "/",
    httpOnly: true,
  });

  return response;
}
