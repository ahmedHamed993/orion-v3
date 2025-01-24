import { getMeta } from "@/api-calls/meta"
import LoginForm from "./components/login-form"
import LoginImage from "./components/login-image"
const Login = async () => {
  const meta:any = await getMeta();
  console.log("meta", meta?.customization?.on_color_primary)
  return (
    <div className='h-screen flex '>
      <div className="bg-slate-50 flex-1 hidden md:flex justify-center items-center">
        <LoginImage  className="w-full h-full"/>
      </div>
      
      <div className=" flex-1 flex justify-center items-center">
      <LoginForm 
        logo={meta?.customization?.logo} 
        primaryColor={meta?.customization?.app_color_primary || "#333"} 
        primaryColorContrast={meta?.customization?.app_color_on_primary || "#f9f9f9"}
      />
      </div>
    </div>
  )
}

export default Login

