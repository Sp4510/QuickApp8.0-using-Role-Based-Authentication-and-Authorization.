import { useState } from "react";
import { useForm } from "react-hook-form";
import { ILoginDto } from "../../types/auth.types";
import { PATH_PUBLIC } from "../../routes/Paths";
import { Link } from "react-router-dom";
import Button from "../../components/general/Button";
import useAuth from "../../hooks/useAuth.hooks";
import toast from "react-hot-toast";


const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginDto>({ mode:"onChange",
    defaultValues: {
      userName:'',
      password:'',
    },
  });

  const onSubmit = async(data:ILoginDto) => {
    try {
      setLoading(true);
      await login(data.userName, data.password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = error as { data: string; status: number };
      const { status } = err;
      if (status === 401) {
        toast.error('Invalid Username or Password');
      } else {
        toast.error('An Error occurred. Please contact admins');
      }
    }
  }
  
  return (
    <div className="pageTemplate1">
      <form onSubmit={handleSubmit(onSubmit)} className="test1">

        <h1 className="text-4xl font-bold mb-2 text-[#754eb4]">Login</h1>
        
        <div className="px-4 my-2 w-9/12">

         <label className="font-semibold">USER NAME</label>
          <br />
          <input
           type="text"
           {...register("userName",{required:"userName is required",minLength:{value:4,message:"Minimum lenght is 4"}})}
           className="test2"
          />
          {errors.userName && <span className="text-red-600 font-semibold">{errors.userName.message}</span>}
          <br />
          <br /> 

          <label className="font-semibold">PASSWORD</label>
          <br />
          <input 
           type="password" 
           {...register("password",{required:"password is required",minLength:{value:6,message:"Minimum lenght is 6"}})}
           className="test2"
          />
          {errors.password && <span className="text-red-600 font-semibold">{errors.password.message}</span>}
          <br />
          <br />

          <div className="flex gap-2">
            <h1>Don't have an account?</h1>
            <Link to={PATH_PUBLIC.register} className="test3">
              Register
            </Link>
          </div>
          
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button variant='secondary' type='button' label='Reset' onClick={() => reset()}/>
            <Button variant='secondary' type='submit' label='Login' onClick={() => {errors}} loading={loading}/>
          </div>

        </div>
      </form>
    </div>
  );
};

export default LoginPage;