"use client";

import * as React from "react";
import {
  Bot,
  Frame,
  GalleryVerticalEnd,
  Settings,
  SquareTerminal,
  Store,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./user/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import { DefaultLinks } from "./default-links";

const data = {
  user: {
    name: "User",
    email: "user@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "teams",
      logo: GalleryVerticalEnd,
      plan: "teams",
    },
  ],
  navMain: [
    {
      title: "Section",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Title",
          url: "#",
        },
      ],
    },
    {
      title: "Section",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Title",
      url: "#",
      icon: Frame,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { user } = useSelector((state) => state.userReducer);

  const navMain = [
    {
      title: "Dashboard",
      url: "/user-dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Orders",
          url: "orders",
        },
        // {
        //   title: "Analytics",
        //   url: "#",
        // },
        {
          title: "Products",
          url: "products",
        },
        {
          title: "Reports",
          url: "reports",
        },
      ],
    },
    {
      title: "Settings",
      url: "/user-dashboard",
      icon: Settings,
      isActive: true,
      items: [
        {
          title: "Account",
          url: "account",
        },
        {
          title: "Notification",
          url: "notification",
        },
        {
          title: "Create Account",
          url: "signup",
        },
      ],
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <DefaultLinks />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ ...user }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
