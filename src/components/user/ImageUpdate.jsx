import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPen } from "react-icons/fa";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { AlertDialogComponent } from "../ui/alert-dialog-component";
import { useState } from "react";
import { btnClass } from "../ui/button";

const ProfileAvatar = ({ user, trigger }) => (
  <div className="relative">
    <Avatar className="size-24">
      <AvatarImage src={user?.image} alt={user?.fullName} />
      <AvatarFallback>
        {user?.fullName?.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
    {trigger}
  </div>
);

const UserInfo = ({ user }) => (
  <div className="flex flex-col gap-2">
    <CardTitle>{user?.fullName}</CardTitle>
    <CardDescription>{user?.email}</CardDescription>
  </div>
);

const UploadButton = ({ onChange }) => (
  <Button variant="secondary" className="relative">
    Upload New Picture
    <input
      type="file"
      accept="image/*"
      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      onChange={onChange}
      name="image"
    />
  </Button>
);

const DeleteButton = ({ onDelete }) => (
  <AlertDialogComponent setAlertReturn={onDelete}>
    <div
      className={`px-5 text-primary underline-offset-4 hover:cursor-pointer hover:underline ${btnClass}`}
      variant="link"
      type="button"
    >
      Delete
    </div>
  </AlertDialogComponent>
);

function ImageUpdate({ user, setImage }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setIsOpen(false);
    }
  };

  const handleFileDelete = (confirmed) => {
    if (confirmed) {
      setImage(null);
      document.querySelector('input[name="image"]').value = null;
      setIsOpen(false);
    }
  };

  const dialogTrigger = (
    <DialogTrigger className="absolute bottom-0 right-0 rounded-full bg-secondary p-2 lg:hidden">
      <FaPen className="size-3" />
    </DialogTrigger>
  );

  return (
    <div className="flex items-center justify-between py-5">
      <div className="flex items-center gap-5">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <ProfileAvatar user={user} trigger={dialogTrigger} />
          <DialogContent className="w-5/6 rounded-lg">
            <DialogHeader>
              <DialogTitle>Edit your profile picture</DialogTitle>
              <div className="flex flex-col gap-2 pt-5">
                <UploadButton onChange={handleFileChange} />
                <DeleteButton onDelete={handleFileDelete} />
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <UserInfo user={user} />
      </div>
      <div className="hidden space-y-2 lg:block">
        <UploadButton onChange={handleFileChange} />
        <DeleteButton onDelete={handleFileDelete} />
      </div>
    </div>
  );
}

export default ImageUpdate;
