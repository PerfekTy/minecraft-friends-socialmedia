import SignIn from "./AUTH/sign-in.tsx";

const AuthLayout = () => {
  // Check if login
  return (
    <div className="grid place-items-center h-screen relative">
      <div className="absolute top-44 mx-2">
        <img
          src="/images/Minecraft-Friends.png"
          alt="minecraft friends logo"
          width={600}
        />
      </div>
      <div className="w-[300px] mx-auto">
        <SignIn />
      </div>
    </div>
  );
};

export default AuthLayout;
