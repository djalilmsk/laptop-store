"use client";

import {
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { DropdownContentList, SidebarUserTrigger } from "@/components/user/user-display";

export function NavUser({ user }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <SidebarUserTrigger user={user} />
          <DropdownContentList />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

