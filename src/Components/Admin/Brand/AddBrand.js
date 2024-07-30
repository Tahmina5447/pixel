import React, { useState } from "react";
import { singleImageUploader } from "../../../../lib/imageUploader";
import { useForm } from "react-hook-form";
import server_url from "../../../../lib/config";
import swal from "sweetalert";
import { postMethodHook } from "../../../../lib/usePostHooks";

import CustomButtonLoading from "../../../Shared/CustomButtonLoading";
import Image from "next/image";

const AddBrand = ({ setAddBrand, refetch }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [errorMessage, setImageUploadErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const handleImageUpload = (e) => {
    singleImageUploader(e, setImageUrl, setImageUploadErrorMessage);
  };
  const url = `${server_url}/brands`;
  const handleAddBrand = (data) => {
    setLoading(true)
    /*  if (!imageUrl) {
      return swal("error", "please upload a image", "error");
    } */
    const newData = {
      name: data.name,
      image: imageUrl || "",
    };

    postMethodHook(url, newData, refetch, setLoading);
  };

  if(errorMessage){
    swal("error","Image Upload failed","error")
  }

  let require = <span className="text-red-500">*</span>;
  return (
    <div className="bg-white shadow-md rounded-md p-4 md:p-8 my-5 relative">
      <span
        onClick={() => setAddBrand(false)}
        className="btn-square btn btn-warning btn-sm text-white hover:bg-red-500 absolute right-2 top-2"
      >
        X
      </span>
      <form
        onSubmit={handleSubmit(handleAddBrand)}
        className="mt-8 grid grid-cols-6 gap-6"
      >
        <div className="col-span-6 sm:col-span-3">
          <label for="name" className="block text-sm font-medium text-gray-700">
            Brand Name {require}
          </label>

          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            placeholder="Brand name"
            className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

        <div className="col-span-6 w-full">
          <fieldset className="w-full space-y-1 text-gray-800">
            <label for="files" className="block text-sm font-medium">
              Brand Image
            </label>
            <div className="flex">
              <input
                onChange={handleImageUpload}
                type="file"
                name="files"
                id="files"
                className="px-8 w-full md:w-auto py-12 border-2 border-dashed rounded-md border-gray-300 text-gray-600 bg-gray-100"
              />
            </div>
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="profile pic"
                width={100}
                height={100}
                className="w-10 h-10 rounded-md"
              />
            )}
          </fieldset>
        </div>
        <button className="bg-success font-bold flex justify-center uppercase p-4 w-[10rem] py-2 rounded-md text-white">
          {(loading) ? <CustomButtonLoading /> : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default AddBrand;
