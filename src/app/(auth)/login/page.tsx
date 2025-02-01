import { getMeta } from "@/api-calls/meta";
import LoginForm from "./components/login-form";
import LoginImage from "./components/login-image";
const Login = async () => {
  const meta = await getMeta();
  return (
    <div className="h-screen flex ">
      <div className=" flex-1 flex justify-center items-center" dir="ltr">
        <LoginForm
          logo={meta?.vendor?.img || ""}
          primaryColor={meta?.vendor?.color_primary || "#333"}
        />
      </div>
      <div className="bg-slate-50 flex-1 hidden md:flex justify-center items-center">
        <LoginImage className="w-full h-full" />
      </div>
    </div>
  );
};

export default Login;
