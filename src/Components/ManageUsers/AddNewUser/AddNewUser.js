import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";
import LinearProgressWithLabel from "@mui/material/LinearProgress";
import axios from "axios";
import React, { useEffect, useState } from "react";
import avatar from "../../../../assets/img/myaccount/avatar.png";
import nidupload from "../../../../assets/img/myaccount/nidupload.png";

import { useForm } from "react-hook-form";
import server_url from "../../../../config";
import AuthUser from "../../../../Hooks/AuthUser";
import CreateUserHook from "../../../../Hooks/FetchFunction/CreateUserHook";
import GetImageUploadUrl from "../../../../Hooks/FetchFunction/GetImageUploadUrl";
import Image from "next/image";

const AddNewUser = () => {
  const [imageUrl, setMyImageUrl] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [refetch, setRefech] = useState(false);
  const [nidFrontUrl, setNidFrontUrl] = useState("");
  const [nidBackUrl, setNidBackUrl] = useState("");
  const [role, setRole] = useState("");
  const { userInfo } = AuthUser();

  const [user, setUser] = useState({});
  const [dateInputType, setdateInputType] = useState('text');

  const BASE_URL = `${server_url}/user/${userInfo._id}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, [BASE_URL, refetch]);

  const updateUserBaseUrl = `${server_url}/user/${userInfo._id}`;

  const handleChangeUploadImage = async (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          setPercentage(percent);
        }
      },
    };

    const baseUrl = "https://run.mocky.io";

    axios
      .post(`${baseUrl}/v3/ee43ea71-0910-47e6-8485-d1b13d06868d`, user, options)
      .then((res) => {
        setPercentage(50);
        setTimeout(() => {
          setPercentage(0);
        }, 1000);
      })
      .catch((error) => {
        setPercentage(50);
        setTimeout(() => {
          setPercentage(0);
        }, 1000);
      });
    // -----------------upload image---------------
    GetImageUploadUrl(formData, setMyImageUrl);
  };
  // -----------------end profile image upload-------------------
  //---------------------update profile-------------
  const handleCreateAccount = (data) => {
    data.imageURL = imageUrl;
    data.nidFront = nidFrontUrl;
    data.nidBack = nidBackUrl;
    data.role = role;

    const {
      bankName,
      bankHolderName,
      accountNumber,
      branchName,
      swiftCode,
      ...others
    } = data;

    const newUserInfo = {
      ...others,
      userBankInfo: [
        {
          bankName,
          bankHolderName,
          accountNumber,
          branchName,
          swiftCode,
        },
      ],
    };

    CreateUserHook(newUserInfo);
  };
  // ---------------------------------------------------upload nid front ----------

  const handleUploadNidFront = async (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    GetImageUploadUrl(formData, setNidFrontUrl);
  };
  const handleUploadNidBack = async (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    GetImageUploadUrl(formData, setNidBackUrl);
  };

  const handleFocusdateInputType = () => {
    setdateInputType('date');
  };

  const handleBlurdateInputType = () => {
    setdateInputType('text');
  };


  return (
    <Box
      component="div"
      noValidate
      autoComplete="off"
      sx={{ width: "100%", px: "8px", py: "20px" }}
    >
      <div className="lg:w-[700px] w-full  p-10">
        <h2 className="font-bold text-2xl pb-2">Update User</h2>
        <div className="my-5">
          <div className="flex align-middle">
            <div>
              {imageUrl ? (
                <Image
                width={200}
            height={200}
                  src={imageUrl}
                  alt="user-profile"
                  className="w-16 h-16 mr-5 object-cover rounded-full"
                />
              ) : (
                <Image
                width={200}
            height={200}
                  src={avatar}
                  alt="user-profile"
                  className="w-16 h-16 mr-5"
                />
              )}
            </div>
            <label className="w-40 h-14 my-auto flex items-center justify-center p-2 bg-white text-primary border cursor-pointer hover:bg-primary hover:text-white duration-500 ease-in-out rounded">
              <p className="text-sm font-bold">Upload New Image</p>
              <input
                className="hidden"
                type={"file"}
                name="image"
                onChange={(event) => handleChangeUploadImage(event)}
              />
            </label>
            {imageUrl ? (
              <Icon className="w-10 h-10 text-primary" icon="mdi:tick-circle" />
            ) : (
              <p></p>
            )}
          </div>
          <div className="p-2">
            {percentage > 0 && (
              <LinearProgressWithLabel color="success" value={percentage} />
            )}
          </div>
        </div>
        {/* name*/}
        <form onSubmit={handleSubmit(handleCreateAccount)}>
          <div className="flex gap-2 text-primary">
            <Icon icon="carbon:name-space" className="w-20 h-14" />
            <input
              className="w-full px-2 outline-none"
              {...register("firstName", { required: true })}
              placeholder="First Name..."
            />

            <input
              className="w-full px-2 outline-none"
              {...register("lastName", { required: true })}
              placeholder="Last Name..."
            />
          </div>
          {/* {/ // phone /} */}
          <div className="flex gap-2 mt-5 text-primary">
            <Icon
              icon="material-symbols:phone-enabled-sharp"
              className="w-10 h-14 text-primary"
            />
            <input
              className="w-full px-2 outline-none "
              placeholder="Phone Number "
              {...register("phone", { required: false })}
            />
          </div>
          {/* // {/ // pass  /} */}
          <div className="flex gap-2 mt-5 text-primary">
            <Icon icon="mdi:password" className="w-10 h-14 text-primary" />
            <input
              className="w-full px-2 outline-none"
              type={"text"}
              {...register("password", { required: true })}
              placeholder="Password..."
            />
          </div>
          {/* // {/ // pass  /} */}
          <div className="flex gap-2 mt-5 text-primary">
            <Icon icon="mdi:password" className="w-10 h-14 text-primary" />
            <input
              className="w-full px-2 outline-none"
              type={"text"}
              {...register("confirmPassword", { required: true })}
              placeholder="Confirm Password..."
            />
          </div>
          {/* {/ // gender  /} */}
          <div className="flex gap-2 mt-5 h-10 text-primary">
            <Icon
              icon="ph:gender-intersex-bold"
              className="w-10 h-14 text-primary"
            />

            <select
              className="w-full px-2 border border-[#DADADA] h-12 rounded-md focus:border-primary "
              onClick={(e) => setRole(e.target.value)}
            >
              <option value="" selected disabled hidden>
                Select Role
              </option>
              <option className="py-2 hover:bg-primary" value={"user"}>
                Normal User
              </option>
              <option className="py-2 hover:bg-primary" value={"bus-company"}>
                Bus Company
              </option>
              <option className="py-2 hover:bg-primary" value={"hotel-admin"}>
                Hotel Admin
              </option>
              <option className="py-2 hover:bg-primary" value={"admin"}>
                Super Admin
              </option>
              <option
                className="py-2 hover:bg-primary"
                value={"bus-contractor"}
              >
                Bus Contractor
              </option>
            </select>
          </div>
          {/* // {/ -------------------------role if bus company---------- /} */}
          {role === "bus-company" && (
            <div className="my-8 mx-2 rounded-md p-3 border border-primary">
              <h2 className="font-bold">Bus Name</h2>
              <input
                className="w-full px-2 outline-none mb-2 mt-5"
                {...register("busName", { required: true })}
                placeholder="Bus Name..."
              />
              <div className="flex justify-between items-center my-2">
                <h2 className="font-bold">Bank account info</h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* {/ ---------------account details----------- /} */}
                <input
                  className="w-full px-2 outline-none"
                  {...register("bankName", { required: true })}
                  placeholder="Bank Name..."
                />
                <input
                  className="w-full px-2 outline-none"
                  {...register("bankHolderName", { required: true })}
                  placeholder=" Bank holder name..."
                />
                <input
                  className="w-full px-2 outline-none"
                  {...register("accountNumber", { required: true })}
                  placeholder=" Account Number..."
                />
                <input
                  className="w-full px-2 outline-none"
                  {...register("branchName", { required: true })}
                  placeholder="Branch name..."
                />
                <input
                  className="w-full px-2 outline-none"
                  {...register("swiftCode", { required: true })}
                  placeholder="Swift code..."
                />
              </div>
            </div>
          )}
          {role === "hotel-admin" && (
            <div className="my-8 mx-2 rounded-md p-3 border border-primary">
              <h2 className="font-bold">Hotel Name</h2>
              <input
                className="w-full px-2 outline-none mb-2 mt-5"
                {...register("hotelName", { required: true })}
                placeholder="Hotel Name..."
              />
            </div>
          )}
          <div className="flex gap-2 mt-5 h-10 text-primary">
            <Icon
              icon="ph:gender-intersex-bold"
              className="w-10 h-14 text-primary"
            />

            <select
              {...register("gender", { required: true })}
              className="w-full px-2 border border-[#DADADA] h-12 rounded-md focus:border-primary "
            >
              <option value="" selected disabled hidden>
                Select Gender
              </option>
              <option className="py-2 hover:bg-primary" value={"male"}>
                male
              </option>
              <option className="py-2 hover:bg-primary" value={"female"}>
                female
              </option>
            </select>
          </div>
          {/* // {/ // date of birth /} */}
          <div className="flex gap-2 mt-9 text-primary">
            <Icon
              icon="bi:calendar-date-fill"
              className="w-10 h-14 text-primary"
            />

            <input
              className="w-full px-2 outline-none"
              type={dateInputType}
              placeholder="mm/dd/yyy"
              onFocus={handleFocusdateInputType}
              onBlur={handleBlurdateInputType}
              {...register("birth", { required: true })}
            />
          </div>
          {/* {/ Email  /} */}
          <div className="flex gap-2 mt-5 text-primary">
            <Icon icon="ic:baseline-email" className="w-10 h-14 text-primary" />
            <input
              className="w-full px-2 outline-none"
              {...register("email", { required: true })}
              placeholder="Email..."
            />
          </div>
          {/* address*/}
          <div className="flex gap-2 mt-5 text-primary">
            <Icon
              icon="mdi:address-marker"
              className="w-10 h-14 text-primary"
            />

            <input
              className="w-full px-2 outline-none"
              {...register("address", { required: true })}
              placeholder="Address...."
            />
          </div>
          {/* {/ // NID  /} */}
          <div>
            <p className="text-primary pl-12 mt-5 mb-4 font-semibold">
              National ID Card
            </p>

            <div className="lg:flex md:flex xl:flex">
              <div className="mt-10 w-12 h-6 xm:hidden sm:hidden lg:block xl:block">
                <Icon
                  icon="teenyicons:id-solid"
                  className="w-10 h-14 text-primary"
                />
              </div>

              {/* {/ nid font /} */}
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="mx-5 mb-5 relative">
                  <p className="w-full text-lightGray text-sm mb-2 text-start font-normal">
                    NID Front Site (max 2mb){" "}
                  </p>
                  {!nidFrontUrl ? (
                    <Image width={200}
                    height={200} src={nidupload} alt="nid front" className="w-full" />
                  ) : (
                    <Image width={200}
                    height={200} src={nidFrontUrl} alt="nid front" className="w-full" />
                  )}
                  <input
                    onChange={handleUploadNidFront}
                    type="file"
                    className="opacity-0 absolute top-0 left-0 bottom-0 right-0 w-full h-full cursor-pointer"
                  />
                </div>
                <div className="mx-5 mb-5 relative">
                  <p className="w-full text-lightGray text-sm mb-2 text-start font-normal">
                    NID Back Site (max 2mb){" "}
                  </p>
                  {!nidBackUrl ? (
                    <Image width={200}
                    height={200} src={nidupload} alt="nid front" className="w-full" />
                  ) : (
                    <Image width={200}
                    height={200} src={nidBackUrl} alt="nid front" className="w-full" />
                  )}
                  <input
                    onChange={handleUploadNidBack}
                    type="file"
                    className="opacity-0 absolute top-0 left-0 bottom-0 right-0 w-full h-full cursor-pointer"
                  />
                </div>
              </div>

              {/* // {/ nid back /} */}
            </div>
          </div>
          {/* // {/ // button  /} */}
          <input
            type="submit"
            className="bg-primary py-3 md:w-5/12 sm:w-10/12 sm:mx-auto md:mx-0 lg:w-full lg:ml-14 md:ml-6 w-full text-white  rounded font-bold cursor-pointer"
            value={"Save"}
          />
        </form>
      </div>
    </Box>
  );
};

export default AddNewUser;
