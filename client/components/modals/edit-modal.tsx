import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { EditIcon } from "lucide-react";
import EditForm from "../form/edit-form.tsx";
import { Button } from "../ui/button.tsx";

const EditModal = () => {
  return (
    <Dialog>
      <DialogTrigger className="flex gap-2">
        <Button className="flex gap-2 p-5 font-semibold">
          <EditIcon size={18} />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="d-layout dark:d-layout-dark dark:text-white text-black">
        <DialogHeader>
          <DialogTitle className="flex justify-center gap-2 text-sm md:text-lg">
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

export default EditModal;
