import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog.tsx";
import { EditIcon, Grip, Trash2 } from "lucide-react";
import EditForm from "../form/edit-form.tsx";
import toast from "react-hot-toast";
import { DELETE } from "../../src/helpers/__async.ts";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProfileOptions = ({ user }: { user: { username: string } }) => {
  const navigate = useNavigate();
  const username = user.username;

  const onDelete = async () => {
    const ifYes = confirm("Are you sure you want to delete your account?");
    if (ifYes) {
      await DELETE(`users/${username}/delete`);
      toast.success("Account has been deleted!");
      Cookies.remove("token");
      navigate("/login");
    }
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="dark:text-white mt-4">
          <Grip size={30} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-center px-0 ">
            Profile options
            <hr className="mt-2" />
          </DropdownMenuLabel>
          <DialogTrigger className="w-full rounded font-semibold text-black dark:text-white">
            <DropdownMenuItem className="flex gap-2 items-center cursor-pointer p-3">
              <EditIcon size={18} />
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            className="p-3 mt-1 flex gap-2 items-center hover:bg-error font-semibold text-black dark:text-white cursor-pointer"
            onClick={onDelete}
          >
            <Trash2 size={18} />
            Delete account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="d-layout dark:d-layout-dark dark:text-white text-black">
        <DialogHeader>
          <DialogTitle className="flex justify-center gap-2 text-lg">
            Edit your
            <span className="bg-gradient-to-l bg-clip-text from-mine to-craft text-transparent uppercase tracking-wide">
              Minecraft Friends
            </span>
            account details
          </DialogTitle>
          <EditForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileOptions;
