import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookFill } from "react-icons/ri";
import swal from "sweetalert";
import AuthUser from "../../lib/AuthUser";
import CustomButtonLoading from "../../src/Shared/CustomButtonLoading";
const Login = () => {
  const router = useRouter();
  const { http, setToken, getToken, userInfo } = AuthUser();
  const [loading, setLoading] = useState(false);
  const { from } = router.query;
  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
  } = useForm();

  const handleLogin = (data) => {
    setLoading(true)
    http
      .post("/user/login", data)
      .then((res) => {
        if (res?.data?.status === "success") {
          swal("Success", "Successfully Login ", "success");
          setToken(
            res.data.data.user.email,
            res.data.data.token,
            res.data.data.user.role,
            res.data.data.user
          );
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        // toast.error("Login Failed");
        if (err.message) {
          swal("Error", "Email or Password Wrong! ", "error");
        }
      });
    reset();
  };

  /*   useEffect(() => {
    console.log("this is form ure", from);
    if (userInfo?.email) {
      // router.replace(from || "/", undefined, { shallow: true });
      router.push(router.asPath, { state: { from: router.asPath } });
    }
  }, [userInfo, router, from]); */
  /*
  async function handleNavigation() {
    if (userInfo?.role === "admin") {
      await router.push("/admin/dashboard");
    } else if (userInfo.role === "user") {
      await router.push("/user/dashboard");
    }
  }
  if (userInfo?.email) {
    handleNavigation();
    return null;
  } */

  useEffect(() => {
    if (userInfo?.role) {
      if (userInfo.role === 'admin') {
        router.push("/admin/dashboard");
      } else {
        const from = router.query.from || "/";

        // Redirect the user back to the "from" URL
        router.push(from);
      }

    }
  }, [userInfo]);

  return (
    <div className="mid-container">
      <div className="flex justify-center items-center pt-10 pb-10">
        <div className="card flex-shrink-0 shadow-2xl bg-base-100  sm:w-[600px] w-full">
          <div className="card-body w-full">
            <h1 className="font-bold text-3xl text-center mb-5">Login</h1>
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="w-full mx-auto"
            >
              <div className="flex  w-full mx-auto flex-col">
                <label className="text-[#747474] text-sm font-medium ml-1 mb-2">
                  Email
                </label>
                <input
                  className="py-3 px-5 bg-[#F2F2F2] rounded-md focus:outline-0"
                  type="text"
                  id=""
                  placeholder="Enter Your Email"
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
                  id=""
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 4,
                      message: "Minimum 4 character required",
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

              <Link href={"/auth/forgot-password"}>
                <h1 className="mt-5 text-sm text-primary cursor-pointer">
                  Forget Password?
                </h1>
              </Link>

              <div className="flex w-full mx-auto flex-col">
                <button
                  className="btn bg-primary hover:bg-primary my-[20px] border-0 text-white text-[17px]  font-bold "
                  type="submit"
                >
                 {
                  (loading)?<CustomButtonLoading/>:'Login'
                 }
                </button>
              </div>
              <p className=" w-full  mx-auto text-center mt-[13px]">
                Dont have an account?{" "}
                <Link
                  href="/auth/register"
                  className="text-[#007AFF] font-bold cursor-pointer"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
