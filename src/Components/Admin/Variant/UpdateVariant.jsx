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
import server_url from "../../../../lib/config";
import { Icon } from "@iconify/react";

const UpdateVariant = ({
  variant,
  id,
  setOpen,
  imageUrl2,
  setReload,
  productId,
  item,
}) => {
  const [imageUrl, setImageUrl] = useState();
  const [productColor, setProductColor] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUploadErrorMessage, setImageUploadErrorMessage] = useState(null);
  const [imageIndex, setImageIndex] = useState();
  const [size2, setSize2] = useState([]);
  const [inputText, setInputText] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const handelAddTag = () => {
    const newValue = inputText;
    setSize2([...size2, newValue]);
    setInputText("");
  };

  const HandelRemoveTag = (ind) => {
    const remove = size2.filter((item, index) => index !== ind);
    setSize2(remove);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    trigger,
    setValue,
  } = useForm();

  useEffect(() => {
    setImageUrl(variant?.variant);
    setProductColor(variant?.productColor);
    setValue("buyPrice", variant?.buyingPrice);
    setValue("price", variant?.productPrice);
    setValue("salePrice", variant?.salePrice);
    setValue("discount", variant?.discount);
    setValue("offer_quantity", variant?.offer_quantity);
    setValue("offer_discount", variant?.offer_discount);
    setValue("size", variant?.size);
    setImageUrl(variant?.image);
    setSize2(variant?.size2);
    setImageIndex(variant?.imageIndex);
  }, [variant]);

  const addProductHandler = (data) => {
    setLoading(true);
    const product = {
      image: imageUrl ? imageUrl : "",
      buyingPrice: Number(data.buyPrice),
      productPrice: Number(data.price),
      salePrice: Number(data.salePrice),
      discount: Math.ceil(
        (1 - Number(data.salePrice) / Number(data.price)) * 100
      ),
      offer_quantity: Number(data?.offer_quantity),
      offer_discount: Number(data?.offer_discount),
    };

    console.log("++++++++", product);

    // ------------------------------------------------post method here

    fetch(`${server_url}/product/${item?._id}/variants/${variant?._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          setLoading(false);
          swal("Variant Update Successfully.", {
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

  // --------------------------------------------handle image upload
  const imgUrl = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`;
  const handleImageUpload = (e) => {
    setImageLoading(true);
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
        setImageLoading(false);
      })
      .catch((error) => {
        setImageLoading(false);
      });
  };

  return (
    <div className=" md:w-[700px] w-full">
      <h2 className=" text-[20px] font-bold">Product Variant Update</h2>
      <div>
        <div>
          <form
            onSubmit={handleSubmit(addProductHandler)}
            className="mt-5 px-2 md:px-7"
          >
            <div className="block md:flex items-center gap-5 mb-4">
              <div className="w-full  ">
                <div className="relative border-4 border-dashed w-full h-[150px]  text-center">
                  {imageLoading ? (
                    <>
                      <div className=" flex items-center w-full justify-center h-full">
                        <div className="dot-spinner2">
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <BsCloudUploadFill
                        size={35}
                        className="text-primary mx-auto block  mt-8"
                      />
                      <p className="text-xl font-bold  text-slate-900">
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
                    </>
                  )}
                </div>
                {imageUrl && (
                  <div className="  w-[100px] h-auto p-1 bg-white shadow-md rounded-md mt-3 ">
                    <Image
                      src={imageUrl}
                      width="100"
                      height="2"
                      alt="category image"
                      className="w-full h-full object-contain "
                    />
                  </div>
                )}
              </div>
            </div>

            {item?.type === "clothing" && (
              <div className="block md:flex items-center gap-5 mb-4">
                <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
                  <p>Select Product Color</p>
                </div>
                <div className="w-full md:w-[70%]">
                  <div className="flex gap-2 my-2">
                    <span>
                      <span
                        className="w-7 h-7 rounded-full inline-block shadow-md hover:scale-105 cursor-crosshair hover:border-red-500 hover:border"
                        style={{
                          background: productColor,
                          color: productColor,
                        }}
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

            {item?.attributes?.colors && (
              <div className="block gap-5 mb-4">
                <div className="w-full text-[14px] font-semibold mt-3">
                  <p>Product Color</p>
                </div>
                <div className="w-full">
                  <input
                    readOnly
                    value={variant?.color}
                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  />
                </div>
              </div>
            )}
            {item?.attributes?.sizes && (
              <div className="block gap-5 mb-4">
                <div className="w-full text-[14px] font-semibold mt-3">
                  <p>Product Size</p>
                </div>
                <div className="w-full">
                  <input
                    readOnly
                    value={variant?.size}
                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  />
                </div>
              </div>
            )}
            {item?.attributes?.design && (
              <div className="block gap-5 mb-4">
                <div className="w-full text-[14px] font-semibold mt-3">
                  <p>Product Design</p>
                </div>
                <div className="w-full">
                  <input
                    readOnly
                    value={variant?.design}
                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  />
                </div>
              </div>
            )}
            {item?.attributes?.set && (
              <div className="block gap-5 mb-4">
                <div className="w-full text-[14px] font-semibold mt-3">
                  <p>Product Set</p>
                </div>
                <div className="w-full">
                  <input
                    readOnly
                    value={variant?.set}
                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  />
                </div>
              </div>
            )}
            {item?.attributes?.others && (
              <div className="block gap-5 mb-4">
                <div className="w-full text-[14px] font-semibold mt-3">
                  <p>Product Other</p>
                </div>
                <div className="w-full">
                  <input
                    readOnly
                    value={variant?.other}
                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="block gap-5 mb-4">
              <div className="w-full text-[14px] font-semibold mt-3">
                <p>Buy Price</p>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  // {...register("buyPrice", { required: true })}
                  className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  placeholder="Buy price"
                  {...register("buyPrice", {
                    required: true,
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Phone number must consist of digits only.",
                    },
                  })}
                  onKeyUp={(e) => {
                    trigger("buyPrice");
                  }}
                />
                <small className="text-[#FF4B2B] text-xs ml-2 font-medium my-2">
                  {errors?.buyPrice?.message}
                </small>
              </div>
            </div>

            <div className="block gap-5 mb-4">
              <div className="text-[14px] font-semibold mt-3">
                <p>Sale Price</p>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  {...register("salePrice", { required: true })}
                  className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  placeholder="Sale Price"
                  {...register("salePrice", {
                    required: true,
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Phone number must consist of digits only.",
                    },
                  })}
                  onKeyUp={(e) => {
                    trigger("salePrice");
                  }}
                />
                <small className="text-[#FF4B2B] text-xs ml-2 font-medium my-2">
                  {errors?.salePrice?.message}
                </small>
              </div>
            </div>

            <div className="block gap-5 mb-4">
              <div className="w-full text-[14px] font-semibold mt-3">
                <p>Product Price</p>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  // {...register("price", { required: true })}
                  className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  placeholder="Price"
                  {...register("price", {
                    required: true,
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Phone number must consist of digits only.",
                    },
                  })}
                  onKeyUp={(e) => {
                    trigger("price");
                  }}
                />
                <small className="text-[#FF4B2B] text-xs ml-2 font-medium my-2">
                  {errors?.price?.message}
                </small>
              </div>
            </div>

            <div className="block gap-5 mb-4">
              <div className="w-full text-[14px] font-semibold mt-3">
                <p>Offer Quantity</p>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  // {...register("offer_quantity", { required: false })}
                  className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  placeholder="quantity"
                  {...register("offer_quantity", {
                    required: false,
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Phone number must consist of digits only.",
                    },
                  })}
                  onKeyUp={(e) => {
                    trigger("offer_quantity");
                  }}
                />
                <small className="text-[#FF4B2B] text-xs ml-2 font-medium my-2">
                  {errors?.offer_quantity?.message}
                </small>
              </div>
            </div>

            <div className="block  gap-5 mb-4">
              <div className="w-full  text-[14px] font-semibold mt-3">
                <p>Offer Discount Price</p>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  // {...register("offer_discount", { required: false })}
                  className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  placeholder="offer Price"
                  {...register("offer_discount", {
                    required: false,
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Phone number must consist of digits only.",
                    },
                  })}
                  onKeyUp={(e) => {
                    trigger("offer_discount");
                  }}
                />
                <small className="text-[#FF4B2B] text-xs ml-2 font-medium my-2">
                  {errors?.offer_discount?.message}
                </small>
              </div>
            </div>

            <div>
              <div className="flex justify-center items-center gap-5 mb-4">
                <button className="btn btn-primary ml-auto text-white">
                  {loading ? <CustomButtonLoading /> : "Update Variant"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateVariant;
