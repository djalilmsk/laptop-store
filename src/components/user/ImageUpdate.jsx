import { CardDescription, CardTitle } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPen } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";

function ImageUpdate({ user }) {
  return (
    <div className="flex items-center justify-between py-5">
      <div className="flex items-center gap-5">
        <div className="relative">
          <Avatar className="size-24">
            <AvatarImage
              src={user?.image}
              alt={user?.fullName}
            />
            <AvatarFallback>
              {user?.fullName?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Dialog>
            <DialogTrigger className="absolute bottom-0 right-0 block rounded-full bg-secondary p-2 lg:hidden">
              <FaPen className="size-3" />
            </DialogTrigger>
            <DialogContent className="w-5/6 rounded-lg">
              <DialogHeader>
                <DialogTitle>Edit your profile picture</DialogTitle>
                <div className="flex flex-col pt-5">
                  <Button variant="secondary">Upload New Picture</Button>
                  <Button variant="link">Delete</Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-col gap-2">
          <CardTitle>{user?.fullName}</CardTitle>
          <CardDescription>{user?.email}</CardDescription>
        </div>
      </div>
      <div className="hidden lg:block">
        <Button variant="secondary">Upload New Picture</Button>
        <Button variant="link">Delete</Button>
      </div>
    </div>
  );
}

export default ImageUpdate;
