import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import SignUpForm from "../AUTH/sign-up-form.tsx";

const SignUp = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost" className="text-sm text-white" type="button">
          Create new account
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="flex justify-center gap-1 text-xl">
            Create
            <span className="bg-gradient-to-l bg-clip-text from-mine to-craft text-transparent">
              Minecraft Friends
            </span>
            account
          </DialogTitle>
          <SignUpForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SignUp;
