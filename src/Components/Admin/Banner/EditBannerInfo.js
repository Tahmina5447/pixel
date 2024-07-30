import React, { useState } from "react";
import { singleImageUploader } from "../../../../lib/imageUploader";
import { useForm } from "react-hook-form";
import server_url from "../../../../lib/config";
import { updateMethodHook } from "../../../../lib/usePostHooks";
import Image from "next/image";


const EditBannerInfo = ({ banner, refetch }) => {
  const [imageUrl, setImageUrl] = useState(banner.image);
  const [errorMessage, setImageUploadErrorMessage] = useState(null);

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

  const url = `${server_url}/banner/${banner._id}`;
  const handleUpdateBanner = (data) => {
    if (!imageUrl) {
      return swal("error", "please upload a image", "error");
    }

    const newData = {
      title: data.title || banner.title,
      image: imageUrl,
    };
    updateMethodHook(url, newData, refetch);
  };

  let require = <span className="text-red-500">*</span>;

  return (
    <form
      onSubmit={handleSubmit(handleUpdateBanner)}
      className="mt-8 grid grid-cols-6 gap-6"
    >
      <div className="col-span-6 sm:col-span-3">
        <label for="title" className="block text-sm font-medium text-gray-700">
          Title {require}
        </label>

        <input
          type="text"
          id="title"
          defaultValue={banner.title}
          {...register("title", { required: false })}
          placeholder="Banner Title"
          className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>

      <div className="col-span-6 ">
        <fieldset className="w-full space-y-1 text-gray-800">
          <label for="files" className="block text-sm font-medium">
            Banner Image
          </label>
          <div className="flex">
            <input
              onChange={handleImageUpload}
              type="file"
              name="files"
              id="files"
              className="px-8 py-12 w-full md:w-auto border-2 border-dashed rounded-md border-gray-300 text-gray-600 bg-gray-100"
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
      <button className="bg-success font-bold uppercase p-4 w-[10rem] py-2 rounded-md text-white">
        Save
      </button>
    </form>
  );
};

export default EditBannerInfo;
