"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { API } from "@/utils/ApiInstance";
import { LOGOUT_USER } from "@/constant/ApiUrls";
import { logout } from "@/store/slice/authSlice";

export default function Home() {
  const { user, loading } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await API.post(
        LOGOUT_USER,
        {},
        { withCredentials: true }
      );

      if (response?.data?.success) {
        dispatch(logout());
        router.replace("/login");
      }
    } catch (error) {
      console.log(error, "error while logging out");
    }
  };

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
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
