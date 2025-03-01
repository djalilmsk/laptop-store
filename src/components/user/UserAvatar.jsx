import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownContentList } from "./user-display";

function UserAvatar({ userState }) {
  const userLayout = {
    email: "user@example.com",
    fullName: "user name",
    image: "",
  };
  const { user } = userState === null ? { user: userLayout } : userState;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-6 w-6 cursor-pointer">
          <AvatarImage
            src={"https://github.com/shadcn.png"}
            alt={user?.fullName}
          />
          <AvatarFallback>
            {user?.fullName?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownContentList />
    </DropdownMenu>
  );
}

export default UserAvatar;
