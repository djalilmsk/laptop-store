import { Bell, ChevronsUpDown, ListOrdered, LogOut, PackageSearch, User } from "lucide-react";

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/features/reduxSlices/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialogComponent } from "../ui/alert-dialog-component";
import { useIsMobile } from "@/hooks/use-mobile";

const logoutClass =
  "relative flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer";

function SidebarUserTrigger({ user }) {
  return (
    <DropdownMenuTrigger asChild>
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage
            src={user?.image}
            alt={user?.fullName}
          />
          <AvatarFallback>
            {user?.fullName?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{user.fullName}</span>
          <span className="truncate text-xs text-muted-foreground">
            {user.email}
          </span>
        </div>
        <ChevronsUpDown className="ml-auto size-4" />
      </SidebarMenuButton>
    </DropdownMenuTrigger>
  );
}

function DropdownContentList() {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const toLink = location.pathname.includes("user-dashboard")
    ? ""
    : "user-dashboard/";

  const handleLogout = () => {
    // alert("logout");
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <DropdownMenuContent
      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
      side={"bottom"}
      align="end"
      sideOffset={4}
    >
      <DropdownMenuLabel className="p-0 font-normal">
        <DropdownMenuUser user={user} /> {/* user */}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <Link to={toLink + "orders"}>
          <DropdownMenuItem>
            <ListOrdered />
            Orders
          </DropdownMenuItem>
        </Link>
        <Link to={toLink + "products"}>
          <DropdownMenuItem>
            <PackageSearch />
            Products
          </DropdownMenuItem>
        </Link>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <Link to={toLink + "account"}>
          <DropdownMenuItem>
            <User />
            Account
          </DropdownMenuItem>
        </Link>
        <Link to={toLink + "notification"}>
          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
        </Link>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <div className="right">
        <AlertDialogComponent
          setAlertReturn={(alertConfirmed) => {
            if (alertConfirmed) handleLogout();
          }}
        >
          <div className={logoutClass}>
            <LogOut />
            Log out
          </div>
        </AlertDialogComponent>
      </div>
    </DropdownMenuContent>
  );
}

function DropdownMenuUser({ user }) {
  return (
    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
      <Link to="/user-dashboard">
        <Avatar className="h-8 w-8 cursor-pointer rounded-lg">
          <AvatarImage
            src={user?.image} //user?.image
            alt={user?.fullName}
          />
          <AvatarFallback className="rounded-lg">
            {user?.fullName?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Link>

      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">
          <Link to="/user-dashboard" className="hover:underline">
            {user?.fullName}
          </Link>
        </span>
        <span className="truncate text-xs text-muted-foreground">
          {user?.email}
        </span>
      </div>
    </div>
  );
}

export { SidebarUserTrigger, DropdownMenuUser, DropdownContentList };
