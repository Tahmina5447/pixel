import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import AuthUser from "../../lib/AuthUser";
import CreateUserHook from "../../lib/CreateUserHook";
import { useState } from "react";
import CustomButtonLoading from "../../src/Shared/CustomButtonLoading";

const Register = () => {
  const { getToken, setToken } = AuthUser();
  const [loading, setLoading] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
  } = useForm();
  const navigate = useRouter();

  const handleSignUp = (data) => {
    setLoading(true)
    CreateUserHook(data, navigate, setToken, setLoading);
  };

  async function navigator() {
    const from = (await navigate.query.from) || "/";
    navigate.push(from);
  }

  if (getToken()) {
    navigator();
    return null;
  }

  return (
    <div className="mid-container">
      <div className="flex justify-center items-center pt-10 pb-36">
        <div className="card flex-shrink-0 shadow-2xl bg-base-100  sm:w-[600px] w-full">
          <div className="card-body w-full">
            <h1 className="font-bold text-3xl text-center mb-5">Sign Up</h1>
            <form
              onSubmit={handleSubmit(handleSignUp)}
              className="w-full mx-auto"
            >
              <div className="flex  w-full mx-auto flex-col">
                <label className="text-[#747474] text-sm font-medium ml-1 mb-2">
                  Your Name
                </label>
                <input
                  className="py-3 px-5 bg-[#F2F2F2] rounded-md focus:outline-0"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Your Full Name"
                  {...register("fullName", {
                    required: "name is required",
                  })}
                  onKeyUp={(e) => {
                    trigger("fullName");
                  }}
                />
                <small className="text-[#FF4B2B] text-xs ml-2 font-medium my-2">
                  {errors?.name?.message}
                </small>
              </div>

              <div className="flex  w-full mx-auto flex-col">
                <label className="text-[#747474] text-sm font-medium ml-1 mb-2">
                  Email
                </label>
                <input
                  className="py-3 px-5 bg-[#F2F2F2] rounded-md focus:outline-0"
                  type="email"
                  id=""
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  onKeyUp={(e) => {
                    trigger("email");
                  }}
                />
                <small className="text-[#FF4B2B] text-xs ml-2 font-medium my-2">
                  {errors?.email?.message}
                </small>
              </div>

              <div className="flex  w-full mx-auto flex-col">
                <label className="text-[#747474] text-sm font-medium ml-1 mb-2">
                  Password
                </label>
                <input
                  className="py-3 rounded-md bg-[#F2F2F2] px-5 focus:outline-0"
                  type="password"
                  name="password"
                  id=""
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 character required",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("password");
                  }}
                />
                <small className="text-[#FF4B2B] ml-2 text-xs font-medium my-2">
                  {errors?.password?.message}
                </small>
              </div>
              <div className="flex  w-full mx-auto flex-col">
                <label className="text-[#747474] text-sm font-medium ml-1 mb-2">
                  Re-enter Password
                </label>
                <input
                  className="py-3 rounded-md bg-[#F2F2F2] px-5 focus:outline-0"
                  type="password"
                  name="password"
                  id=""
                  placeholder="Re-enter password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 character required",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("confirmPassword");
                  }}
                />
                <small className="text-[#FF4B2B] ml-2 text-xs font-medium my-2">
                  {errors?.confirmPassword?.message}
                </small>
              </div>

              <div className="flex w-full mx-auto flex-col">
                <button
                  className="btn bg-primary hover:bg-primary my-[20px] border-0 text-white text-[17px]  font-bold "
                  type="submit"
                >
                  {
                    (loading) ? <CustomButtonLoading /> : 'Sign Up'
                  }
                </button>
              </div>
              <p className=" w-full  mx-auto text-center mt-[13px]">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-[#007AFF] font-bold cursor-pointer"
                >
                  Please Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
