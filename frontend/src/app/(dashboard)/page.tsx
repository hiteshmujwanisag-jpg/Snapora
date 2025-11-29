"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { API } from "@/utils/ApiInstance";
import { LOGOUT_USER } from "@/constant/ApiUrls";
import { logout } from "@/store/slice/authSlice";
import Header from "@/components/Header";
import { StoriesSection } from "@/components/StoriesSection";
import { Tabs } from "@/components/Tabs";
import { PostsGrid } from "@/components/PostGrid";
import { useState } from "react";

export default function Home() {
  const { user, loading } = useSelector((state: any) => state.auth);
   const [activeTab, setActiveTab] = useState("Home");
  const dispatch = useDispatch();
  const router = useRouter();

  // Mock data for stories
const stories = [
  { id: 1, username: "sarah_j", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop", hasNew: true },
  { id: 2, username: "mike_d", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop", hasNew: true },
  { id: 3, username: "emma_w", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop", hasNew: true },
  { id: 4, username: "alex_t", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop", hasNew: false },
  { id: 5, username: "lisa_m", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop", hasNew: true },
  { id: 6, username: "john_k", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop", hasNew: false },
  { id: 7, username: "nina_r", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop", hasNew: true },
  { id: 8, username: "david_p", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop", hasNew: false },
];

// Mock data for posts
const posts = [
  {
    id: 1,
    user: { name: "Sarah Johnson", username: "sarah_j", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop" },
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=800&fit=crop",
    caption: "Nature's beauty never fails to amaze me 🌿",
    likes: 1234,
    comments: 89,
    timeAgo: "2h ago",
  },
  {
    id: 2,
    user: { name: "Mike Davis", username: "mike_d", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop" },
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=600&fit=crop",
    caption: "Weekend vibes at the lake 🏔️",
    likes: 892,
    comments: 45,
    timeAgo: "4h ago",
  },
  {
    id: 3,
    user: { name: "Emma Wilson", username: "emma_w", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop" },
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=750&fit=crop",
    caption: "Golden hour in Kyoto 🇯🇵✨",
    likes: 2156,
    comments: 127,
    timeAgo: "6h ago",
  },
  {
    id: 4,
    user: { name: "Alex Turner", username: "alex_t", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop" },
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=600&fit=crop",
    caption: "Homemade pasta night 🍝",
    likes: 567,
    comments: 32,
    timeAgo: "8h ago",
  },
  {
    id: 5,
    user: { name: "Lisa Miller", username: "lisa_m", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop" },
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=900&fit=crop",
    caption: "Chasing sunsets 🌅",
    likes: 3421,
    comments: 201,
    timeAgo: "12h ago",
  },
  {
    id: 6,
    user: { name: "John King", username: "john_k", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop" },
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=500&fit=crop",
    caption: "Late night coding session 💻",
    likes: 445,
    comments: 28,
    timeAgo: "1d ago",
  },
];

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

  // Shuffle posts for "For You" tab
  const displayedPosts = activeTab === "For You" 
    ? [...posts].sort(() => Math.random() - 0.5) 
    : posts;

  return (
    <div className="min-h-screen bg-background max-w-xl mx-auto border-r border-l border-border">
      <Header notificationCount={5} />
      <StoriesSection stories={stories} />
      {/* <Tabs activeTab={activeTab} onTabChange={setActiveTab} /> */}
      <PostsGrid posts={displayedPosts} />
    </div>
  );
}
