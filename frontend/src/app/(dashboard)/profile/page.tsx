"use client"

import { ArrowLeft, MoreVertical, Grid3X3, Clapperboard, Tag, Bookmark } from "lucide-react";
import { useState } from "react";

import coverBg from "@/assets/cover-bg.jpg";
import profileAvatar from "@/assets/grid-1.jpg";
import grid1 from "@/assets/grid-1.jpg";
import grid2 from "@/assets/grid-1.jpg";
import grid3 from "@/assets/grid-1.jpg";
import grid4 from "@/assets/grid-1.jpg";
import grid5 from "@/assets/grid-1.jpg";
import grid6 from "@/assets/grid-1.jpg";
import grid7 from "@/assets/grid-1.jpg";
import grid8 from "@/assets/grid-1.jpg";
import grid9 from "@/assets/grid-1.jpg";
import Image from "next/image";

const gridImages = [grid1, grid2, grid3, grid4, grid5, grid6, grid7, grid8, grid9];

const Page = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-background max-w-xl mx-auto border-r border-l border-border">
      {/* Cover Image with Header */}
      <div className="relative h-[200px]">
        <Image
          src={coverBg}
          alt="Cover background"
          className="w-full h-full object-cover"
        />
        {/* Header buttons */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <button className="w-8 h-8 bg-background rounded-full flex items-center justify-center shadow-sm">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <button className="w-8 h-8 bg-background rounded-full flex items-center justify-center shadow-sm">
            <MoreVertical className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="px-4 pb-4">
        {/* Avatar and Stats Row */}
        <div className="flex items-end -mt-12">
          {/* Avatar */}
          <div className="relative">
            <div className="w-30 h-30 rounded-md overflow-hidden border-4 border-background shadow-lg">
              <Image
                src={profileAvatar}
                alt="Profile avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-1 justify-around ml-2 mb-1">
            <div className="text-center">
              <p className="text-2xl font-black text-foreground">145</p>
              <p className="text-xl text-black">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-foreground">1.2k</p>
              <p className="text-xl text-black">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-foreground">200</p>
              <p className="text-xl text-black">Following</p>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-4">
          <p className="text-lg font-medium text-foreground font-dmSans">
            Full Stack Developer | Freelancer | Content Creator
          </p>
          <p className="text-lg font-medium text-foreground mt-1">
            Nothing is fine but everything is gonna be fine
          </p>
          <p className="text-lg font-medium text-foreground">Dm for work or mail</p>
          <a
            href="mailto:Hiteshmujwani@gmail.com"
            className="text-lg font-medium text-link"
          >
            Hiteshmujwani@gmail.com
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-lg text-lg font-bold">
            Follow
          </button>
          <button className="flex-1 bg-background border border-foreground text-foreground py-2.5 rounded-lg text-lg font-bold">
            Message
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-t border-border">
        {[
          { icon: Grid3X3, id: 0 },
          { icon: Clapperboard, id: 1 },
          { icon: Tag, id: 2 },
          { icon: Bookmark, id: 3 },
        ].map(({ icon: Icon, id }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 py-3 flex justify-center items-center border-b-2 transition-colors ${
              activeTab === id
                ? "border-foreground"
                : "border-transparent text-muted-foreground"
            }`}
          >
            <Icon className="w-6 h-6" />
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-3 gap-0.5">
        {gridImages.map((img, idx) => (
          <div key={idx} className="aspect-square">
            <Image
              src={img}
              alt={`Post ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;