import { Link } from "react-router-dom";
import { UserAvatar } from "..";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { ModeToggle } from "../theme/ModeToggle";
import { Separator } from "../ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

export function States() {
  const { user } = useSelector((state) => state.userReducer) || { user: null };
  const isMobile = useIsMobile();

  return (
    <span className="flex items-center">
      {user ? isMobile ? <Button variant="none" /> : <></> : <></>}
      <span className="nav">
        <ModeToggle />
      </span>
      <Separator orientation="vertical" className="h-3/4" />
      <UserState user={user} />
    </span>
  );
}

export function UserState({ user }) {
  return (
    <div>
      {user ? (
        <Button size="icon" variant="none" className="nav">
          <UserAvatar userState={user} />
        </Button>
      ) : (
        <Button className="nav uppercase" variant="ghost">
          <Link to="/login">Login</Link>
        </Button>
      )}
    </div>
  );
}
