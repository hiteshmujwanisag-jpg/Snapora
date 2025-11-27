"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slice/authSlice";
import { LoginForm } from "@/components/login-form";
import Image from "next/image";

export default function LoginPage() {
  const [usernameoremail, setUsernameoremail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();



  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-lg">
        <a href="#" className="flex items-center justify-center mb-5 gap-2 self-center font-medium">
          <div className="  flex size-6 items-center justify-center rounded-md">
            <Image src={require('@/assets/icon.png')} alt="icon"/>
          </div>
          Snapora
        </a>
      <LoginForm/>
      </div>
    </div>
  );
}
