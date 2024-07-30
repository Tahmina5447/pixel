import React, { useState } from "react";
import DashboardLayout from "../../../src/Components/DashboardLayout";
import AdminDashboardBreadcrumb from "../../../src/Shared/AdminDashboardBreadcrumb";

import { BsCloudUploadFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Image from "next/image";
import { getAdminToken } from "../../../lib/getToken";
import { Icon } from "@iconify/react/dist/iconify.js";
import CustomButtonLoading from "../../../src/Shared/CustomButtonLoading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCategory = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState([{ firstChildTitle: "", secondChilds: [] }]);
  const [sub, setSub] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Handle category addition
 

  // Handle image upload
  const imgUrl = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`;
  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    fetch(imgUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        setImageUrl(result.data?.url);
      })
      .catch((error) => {
        swal("error", "Image Upload failed! please try again", "error");
      });
  };

  // Handle adding more fields
  const handleAddMore = () => {
    setFields([...fields, { firstChildTitle: "", secondChilds: [] }]);
  };

// console.log(".................",fields)

  // Handle input change
  const handleFieldChange = (index, event) => {
    const { name, value } = event.target;
    const newFields = [...fields];
    newFields[index][name] = value;
    setFields(newFields);
  };

  // Handle adding second child category
  const handleAddSecondChild = (index) => {
    if (sub) {
      const newFields = [...fields];
      newFields[index].secondChilds = [...newFields[index].secondChilds, sub];
      setFields(newFields);
      setSub("");
    }
  };

  // Handle removing second child category
  const handleRemoveSecondChild = (fieldIndex, childIndex) => {
    const newFields = [...fields];
    newFields[fieldIndex].secondChilds.splice(childIndex, 1);
    setFields(newFields);
  };



  const handleCategoryAdd = (data) => {
    setLoading(true);
    const categories = {
      parent_category: data.parent_category,
      first_child_Category: fields,
      imageURLs: imageUrl,
      status: data.status,
    };

    fetch("http://localhost:5000/api/v1/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAdminToken()}`,
      },
      body: JSON.stringify(categories),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          setLoading(false);
          swal("Success", "Category Added", "success");
          reset();
          setFields([{ firstChildTitle: "", secondChilds: [] }]);
          setImageUrl(null);
        } else {
          setLoading(false);
          swal("Error", "Something went wrong", "error");
        }
      });
  };

  return (
    <DashboardLayout>
      <div className="mid-container">
        <AdminDashboardBreadcrumb
          title={"Add Category"}
          subtitle={"Add your Product category and necessary information from here"}
        />
        <form onSubmit={handleSubmit(handleCategoryAdd)} className="mt-5 ">
          <div className="flex flex-col lg:flex-row gap-5 mb-5">
            <div className="bg-white rounded-md w-full p-4">
              <div className="block md:flex items-center gap-5 mb-4">
                <div className="w-full md:w-[30%] text-sm">
                  <p>Category Icon:</p>
                </div>
                <div className="w-full md:w-[70%]">
                  <div className="relative border-4 border-dashed w-full h-[150px] text-center">
                    <BsCloudUploadFill
                      size={35}
                      className="text-primary mx-auto block mt-8"
                    />
                    <p className="text-sm font-bold text-slate-900">
                      Drag your image here
                    </p>
                    <span className="text-xs font-bold text-slate-900">
                      (Only *.jpeg and *.png images will be accepted)
                    </span>
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      className="opacity-0 absolute top-0 left-0 bottom-0 right-0 w-full h-full cursor-pointer"
                    />
                  </div>
                  {imageUrl && (
                    <div className="w-[100px] h-auto p-1 bg-white shadow-md rounded-md mt-3">
                      <Image
                        src={imageUrl}
                        width="100"
                        height="2"
                        alt="category image"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="block md:flex items-center gap-5 mb-4">
                <div className="w-full md:w-[30%] text-sm">
                  <p>Parent Category:</p>
                </div>
                <div className="w-full md:w-[70%]">
                  <input
                    type="text"
                    {...register("parent_category", { required: true })}
                    className="w-full text-sm rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                    placeholder="Type Parent Category"
                  />
                </div>
              </div>
              <div className="block md:flex items-center gap-5 mb-4">
                <div className="w-full md:w-[30%] text-sm mt-3">
                  <p>Status:</p>
                </div>
                <div className="w-full md:w-[70%]">
                  <select
                    className="select select-bordered w-full focus:outline-none text-sm"
                    {...register("status", { required: true })}
                  >
                    <option disabled selected>
                      Status
                    </option>
                    <option value={false}>Review</option>
                    <option value={true}>Publish</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="bg-white rounded-md w-full px-4 pb-4">
                {fields.map((field, index) => (
                  <div key={index} className="border-b pt-4 border-primary">
                    <div className="block md:flex items-center gap-5 mb-4">
                      <div className="w-full md:w-[30%] text-sm">
                        <p>Child Category:</p>
                      </div>
                      <div className="w-full md:w-[70%]">
                        <input
                          type="text"
                          name="firstChildTitle"
                          className="w-full text-sm rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                          placeholder="Type first child title"
                          value={field.firstChildTitle}
                          onChange={(e) => handleFieldChange(index, e)}
                        />
                      </div>
                    </div>

                    <div className="md:flex block items-center gap-5 mb-4">
                      <div className="w-full md:w-[30%] text-sm">
                        <p>Second Child Category:</p>
                      </div>
                      <div className="w-full md:w-[70%]">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={sub}
                            onChange={(e) => setSub(e.target.value)}
                            className="w-full rounded input text-sm input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                            placeholder="Type second child category"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddSecondChild(index)}
                            className="py-[12px] rounded-md text-xs bg-primary text-white px-4"
                          >
                            Add
                          </button>
                        </div>

                        <div className="mt-2 flex gap-2 items-center flex-wrap">
                          {field.secondChilds?.map((item, childIndex) => (
                            <div
                              key={childIndex}
                              className="flex items-center bg-gray-200 p-1 gap-1 rounded-md"
                            >
                              <h2>{item}</h2>{" "}
                              <button type="button" onClick={() => handleRemoveSecondChild(index, childIndex)}>
                                <Icon icon="ic:outline-close" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button type="button" className="text-sm font-medium bg-primary rounded px-3 py-1 text-white mt-4" onClick={handleAddMore}>
                  Add More
                </button>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <button
              type={"submit"}
              className="btn btn-primary text-white"
              value={"Add Category"}
              disabled={!imageUrl}
            >
              {loading ? <CustomButtonLoading /> : "Add Category"}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </DashboardLayout>
  );
};

export default AddCategory;
