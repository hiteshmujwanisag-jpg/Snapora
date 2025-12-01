"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import Explore from "../assets/icons/Explore.svg";
import Create from "../assets/icons/Create.svg";
import Shorts from "../assets/icons/Shorts.svg";
import Dashboard from "../assets/icons/Dashboard.svg";
import Search from "../assets/icons/Search.svg";
import Home from "../assets/icons/Home.svg";
import Inbox from "../assets/icons/Inbox.svg";
import Setting from "../assets/icons/Setting.svg";
import Notification from "../assets/icons/Notifications.svg";

import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: Inbox,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Explore",
    url: "#",
    icon: Explore,
  },
  {
    title: "Notifications",
    url: "#",
    icon: Notification,
  },
  {
    title: "Shorts",
    url: "#",
    icon: Shorts,
  },
  {
    title: "Create",
    url: "#",
    icon: Create,
  },
  {
    title: "Dashboard",
    url: "#",
    icon: Dashboard,
  },
  {
    title: "Profile",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Setting,
  },
];

export function AppSidebar() {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-5 mt-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <Image src={item.icon} alt={item.title} />
                      <span className="text-lg font-bold">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
