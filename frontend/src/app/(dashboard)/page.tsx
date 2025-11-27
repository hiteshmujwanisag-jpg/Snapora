"use client";

import { useSelector } from "react-redux";
import LogoutButton from "@/components/LogoutButton";

export default function Home() {
  const { user, loading } = useSelector((state: any) => state.auth);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      {user && (
        <div className="mb-4">
          <p>Welcome, {user.name || user.email}!</p>
        </div>
      )}
      <LogoutButton />
    </div>
  );
}
