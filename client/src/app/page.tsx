"use client";
import Login from "@/components/auth/Login";
import { useAuth } from "@/contextApi/auth";
import MyContacts from "@/components/auth/MyContacts";

export default function Page() {
  const [auth] = useAuth();
  return auth.user?._id ? <MyContacts /> : <Login/>;
};
