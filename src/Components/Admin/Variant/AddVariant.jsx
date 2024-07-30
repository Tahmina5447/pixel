import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { handleMultiImageUpload } from "../../../../lib/imageUploader";
import { BiImageAdd } from "react-icons/bi";
import Image from "next/image";
import { BsCloudUploadFill } from "react-icons/bs";
import ColorPicker from "../../../Shared/ColorPicker";
import ColorPicker2 from "../../../Shared/ColorPicker2";
import swal from "sweetalert";
import CustomButtonLoading from "../../../Shared/CustomButtonLoading";
import { Icon } from "@iconify/react";
import server_url from "../../../../lib/config";

const AddVariant = ({ id, setOpen, product, setReload }) => {
  const [imageUrl, setImageUrl] = useState();
  const [productColor, setProductColor] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUploadErrorMessage, setImageUploadErrorMessage] = useState(null);
  const [imageIndex, setImageIndex] = useState();
  const [size2, setSize2] = useState([]);
  const [inputText, setInputText] = useState("");

  const handelAddTag = () => {
    const newValue = inputText;
    setSize2([...size2, newValue]);
    setInputText("");
  };

  const HandelRemoveTag = (ind) => {
    const remove = size2.filter((item, index) => index !== ind);
    setSize2(remove);
  };

  console.log(id);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue
  } = useForm();


  useEffect(()=>{
    setValue("buyPrice",product?.buyingPrice)
    setValue("salePrice",product?.salePrice)
    setValue("price",product?.productPrice)
  },[product])


  const addProductHandler = (data) => {
    setLoading(true);
    const product = {
      imageURLs: imageUrl,
      quantity: Number(data.quantity),
      buyingPrice: Number(data.buyPrice),
      productPrice: Number(data.price),
      salePrice: Number(data.salePrice),
      discount: Math.ceil(
        (1 - Number(data.salePrice) / Number(data.price)) * 100
      ),
      productColor: productColor,
      size: data?.size,
      imageIndex:imageIndex,
      size2:size2,
    };

    console.log(product);
    // ------------------------------------------------post method here

    fetch(`${server_url}/variant/create/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          setLoading(false);
          swal("Product Added Successfully.", {
            icon: "success",
          });
          setOpen(false);
          setReload((pre) => !pre);
        } else {
          setLoading(false);
          swal(
            result.error.includes("E11000")
              ? result.error.split(":").slice(-1)[0] + " already used! its uniq"
              : result.error,
            {
              icon: "error",
            }
          );
        }
      });
  };

  // --------------------------------------------handle multi image upload
  const handleImageUpload = (e) => {
    handleMultiImageUpload(
      e,
      imageUrl,
      setImageUrl,
      setImageUploadErrorMessage
    );
  };

  return (
    <div className=" md:w-[700px] w-full">
      <h2 className=" text-[20px] font-bold">Product Variant Add</h2>
      <div>
        <form
          onSubmit={handleSubmit(addProductHandler)}
          className="mt-5 px-2 md:px-7"
        >
          <div className="block gap-5 mb-4">
            <div className=" text-lg font-semibold mt-3">
              <p>Select Images</p>
            </div>
            <div className="w-full  ">
              <div className="flex flex-wrap gap-2">
                {product?.imageURLs?.map((img, index) => {
                  return (
                    <div
                      className={` w-[100px] h-auto p-1 bg-white shadow-md rounded-md mt-3 ${
                        index === imageIndex ? " border-2 border-red-500" : ""
                      }`}
                      key={index}
                      onClick={() => setImageIndex(index)}
                    >
                      <Image
                        src={img}
                        width="100"
                        height="2"
                        alt="category image"
                        className="w-full h-full object-contain "
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {product?.type === "clothing" && (
            <div className="block md:flex items-center gap-5 mb-4">
              <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
                <p>Select Product Color</p>
              </div>
              <div className="w-full md:w-[70%]">
                <div className="flex gap-2 my-2">
                  <span>
                    <span
                      className="w-7 h-7 rounded-full inline-block shadow-md hover:scale-105 cursor-crosshair hover:border-red-500 hover:border"
                      style={{ background: productColor, color: productColor }}
                    ></span>
                  </span>
                </div>

                <div>
                  <div>
                    <span
                      onClick={() => setIsOpen(true)}
                      className="btn btn-xs btn-info text-white hover:text-black"
                    >
                      Pick Color
                    </span>
                  </div>
                </div>

                <ColorPicker2
                  productColor={productColor}
                  setProductColor={setProductColor}
                  setIsOpen={setIsOpen}
                  modalIsOpen={modalIsOpen}
                />
              </div>
            </div>
          )}

          {product?.type === "other" && (
            <div className="block gap-5 mb-4">
              <div className=" text-lg font-semibold mt-3">
                <p>Product Size</p>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  {...register("size", { required: false })}
                  className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  placeholder="Product Size"
                />
              </div>
            </div>
          )}

          {product?.type === "clothing" && (
            <div className=" block items-center gap-5 mb-4">
              <div className="w-full text-lg font-semibold">
                <p>Product size</p>
              </div>
              <div className="w-full">
                <div className=" flex items-center gap-1">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                    placeholder="Type Tag"
                  />
                  <button
                    type="button"
                    disabled={!inputText}
                    onClick={() => handelAddTag()}
                    className="py-[12px] rounded-md bg-primary text-white px-4"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 flex gap-2 items-center flex-wrap">
                  {size2?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-200 p-1 gap-1 rounded-md"
                    >
                      <h2>{item}</h2>{" "}
                      <button
                        type="button"
                        onClick={() => HandelRemoveTag(index)}
                      >
                        <Icon icon="ic:outline-close" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="block gap-5 mb-4">
            <div className="w-full text-lg font-semibold mt-3">
              <p>Buy Price</p>
            </div>
            <div className="w-full">
              <input
                type="number"
                {...register("buyPrice", { required: true })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Buy price"
              />
            </div>
          </div>

          <div className="block gap-5 mb-4">
            <div className="text-lg font-semibold mt-3">
              <p>Sale Price</p>
            </div>
            <div className="w-full">
              <input
                type="number"
                {...register("salePrice", { required: true })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Sale Price"
              />
            </div>
          </div>

          <div className="block gap-5 mb-4">
            <div className="w-full text-lg font-semibold mt-3">
              <p>Product Price</p>
            </div>
            <div className="w-full">
              <input
                type="number"
                {...register("price", { required: true })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Price"
              />
            </div>
          </div>

          <div className="block gap-5 mb-4">
            <div className="w-full text-lg font-semibold mt-3">
              <p>Product Quantity</p>
            </div>
            <div className="w-full">
              <input
                type="number"
                {...register("quantity", { required: true })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Quantity"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-center items-center gap-5 mb-4">
              <button className="btn btn-primary ml-auto text-white">
                {loading ? <CustomButtonLoading /> : "Add Variant"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVariant;
