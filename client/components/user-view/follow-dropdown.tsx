import React from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog.tsx"
import {DialogClose} from "@radix-ui/react-dialog";

interface FollowDropdownProps {
    trigger: React.ReactNode;
    content: React.ReactNode;
    title: string;
    desc?: string;
    classname: string
}

const FollowDropdown = ({trigger, content, title, desc, classname} : FollowDropdownProps) => {
    return (
        <Dialog>
            <DialogTrigger className="underline">{trigger}</DialogTrigger>
            <DialogContent className={classname}>
                <DialogHeader>
                    <DialogTitle className="text-center">{title}</DialogTitle>
                    <DialogDescription>
                        {desc}
                    </DialogDescription>
                </DialogHeader>
                <DialogClose>{content}</DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default FollowDropdown;