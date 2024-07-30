import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import AuthUser from "../../../lib/AuthUser";
import server_url from "../../../lib/config";
import CreateUserHook from "../../../lib/CreateUserHook";
import { postMethodHook } from "../../../lib/usePostHooks";
import { useUserData } from "../../../src/hooks/useMyShopData";

const ResetNewPassword = () => {
  const { getToken } = AuthUser();
  const navigate = useRouter();

  const { token } = navigate.query;

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
  } = useForm();

  const url = `${server_url}/user/reset-password`;

  const handleResetPassword = (data) => {
    data.token = token;
    postMethodHook(url, data, loginNavigate);
  };

  async function navigator() {
    await navigate.push("/");
  }
  async function loginNavigate() {
    await navigate.push("/auth/login");
  }

  if (getToken()) {
    navigator();
    return null;
  }

  return (
    <div className="mid-container">
      <div className="flex justify-center items-center mt-10">
        <div className="card flex-shrink-0 shadow-2xl bg-base-100  sm:w-[600px] w-full">
          <div className="card-body w-full">
            <h1 className="font-bold text-3xl text-center mb-5">
              Reset New Password
            </h1>
            <form
              onSubmit={handleSubmit(handleResetPassword)}
              className="w-full mx-auto"
            >
              <div className="flex  w-full mx-auto flex-col">
                <label className="text-[#747474] text-sm font-medium ml-1 mb-2">
                  New Password
                </label>
                <input
                  className="py-3 px-5 bg-[#F2F2F2] rounded-md focus:outline-0"
                  id=""
                  type="password"
                  placeholder="write new password"
                  {...register("password", {
                    required: "password is required",
                  })}
                  onKeyUp={(e) => {
                    trigger("password");
                  }}
                />
                <small className="text-[#FF4B2B] text-xs ml-2 font-medium my-2">
                  {errors?.password?.message}
                </small>
              </div>

              <div className="flex w-full mx-auto flex-col">
                <button
                  className="btn bg-success hover:bg-success my-[20px] border-0 text-white text-[17px]  font-bold "
                  type="submit"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetNewPassword;
