import {User} from "lucide-react";

const FollowDropdownTrigger = ({currentUser, label} : {currentUser: any, label: string}) => {
    return (
        <div className="flex gap-1 items-center">
            <User />
            <p className="font-semibold">{label}</p>
            <p>{currentUser}</p>
        </div>
    );
};

export default FollowDropdownTrigger;