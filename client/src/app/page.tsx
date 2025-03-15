"use client";
import Login from "@/components/ui/Login";
import { useAuth } from "@/contextApi/auth";
import MyContacts from "@/components/ui/MyContacts";

export default function Page() {
  const [auth] = useAuth();
  return auth.user?._id ? <MyContacts /> : <Login/>;
};
