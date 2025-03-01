"use client";

import * as React from "react";
import { ChevronsUpDown, Store } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { NAV_LINKS } from "@/components/navbar/NAV_LINKS-array";
import { Link, useNavigate } from "react-router-dom";

export function DefaultLinks() {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Store className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-base leading-tight">
                <span className="truncate font-semibold">OG STORE</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Dropdown Menu
            </DropdownMenuLabel>
            {NAV_LINKS.map(({ label, id, to, logo }) => (
              // <Link key={id} to={to}>
              <DropdownMenuItem
                key={id}
                className="gap-2 p-2"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(to); // Use React Router's navigate function
                }}
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  {logo}
                </div>
                {label}
              </DropdownMenuItem>
              // </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
