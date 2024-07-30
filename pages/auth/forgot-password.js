import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import AuthUser from "../../lib/AuthUser";
import server_url from "../../lib/config";
import CreateUserHook from "../../lib/CreateUserHook";
import { postMethodHook } from "../../lib/usePostHooks";
import { useUserData } from "../../src/hooks/useMyShopData";

const ForgotPassword = () => {
  const { getToken } = AuthUser();
  const navigate = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
  } = useForm();

  const url = `${server_url}/user/forgot-password`;

  const handleForgotPassword = (data) => {
    postMethodHook(url, data);
  };

  async function navigator() {
    await navigate.push("/");
  }

  if (getToken()) {
    navigator();
    return null;
  }

  return (
    <div className="mid-container">
      <div className="flex justify-center items-center mt-10 mb-36">
        <div className="card flex-shrink-0 shadow-2xl bg-base-100  sm:w-[600px] w-full">
          <div className="card-body w-full">
            <h1 className="font-bold text-3xl text-center mb-5">
              Forgot Password
            </h1>
            <form
              onSubmit={handleSubmit(handleForgotPassword)}
              className="w-full mx-auto"
            >
              <div className="flex  w-full mx-auto flex-col">
                <label className="text-[#747474] text-sm font-medium ml-1 mb-2">
                  Email
                </label>
                <input
                  className="py-3 px-5 bg-[#F2F2F2] rounded-md focus:outline-0"
                  type="email"
                  id=""
                  placeholder="write your email address"
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

              <div className="flex w-full mx-auto flex-col">
                <button
                  className="btn bg-primary hover:bg-primary my-[20px] border-0 text-white text-[17px]  font-bold "
                  type="submit"
                >
                  Forgot
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

export default ForgotPassword;
