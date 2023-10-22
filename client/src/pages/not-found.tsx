import { useNavigate } from "react-router-dom";

import { Button } from "../../components/ui/button.tsx";
import { MoveLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center relative h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        src="/video/notfound.mp4#t=5"
        className="absolute w-full "
      >
        <source />
      </video>
      <img
        src="/images/Did-yoo-get-lost.png"
        alt="did you get lost logo"
        className="absolute top-32"
      />
      <Button
        variant="ghost"
        onClick={() => navigate("..")}
        className="absolute top-72 flex items-center justify-center gap-2 border "
      >
        <MoveLeft /> Come back
      </Button>
    </div>
  );
};

export default NotFound;
