import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../src/Components/DashboardLayout";

import { Icon } from "@iconify/react/dist/iconify.js";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { RiAddBoxFill } from "react-icons/ri";
import Select from "react-select";
import { TagsInput } from "react-tag-input-component";
import swal from "sweetalert";
import { calculateDiscount } from "../../../lib/claculateDiscount";
import server_url from "../../../lib/config";
import { getAdminToken } from "../../../lib/getToken";
import DropImageCom from "../../../src/Components/Admin/Variant/DropImageCom";
import { useCustomQuery } from "../../../src/hooks/useMyShopData";
import CustomButtonLoading from "../../../src/Shared/CustomButtonLoading";
import StarRating from "../../../src/Shared/StarRating";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [selectedProductTag, setSelectedProductTag] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [richText, setValueOfRichText] = useState("");
  const [freeDelivery, setFreeDelivery] = useState(false);

  const [childCategories, setChildCategories] = useState([]);
  const [imageUploadErrorMessage, setImageUploadErrorMessage] = useState(null);
  const [selectedOption, setSelectedOption] = useState([]);
  const [slug, setSlug] = useState("");
  const [ratingValue, SetRatingValue] = useState(5);
  const [modalIsOpen, setIsOpen] = useState(false);
  // for child category
  // for child category
  const [selectedOptionCategory, setSelectedOptionCategory] = useState(null);
  const { data: brands } = useCustomQuery(["brands"], "brands");
  const [showVariant, setShowVariant] = useState(false);
  const [selectSize, setSelectSize] = useState(false);
  const [selectColor, setSelectColor] = useState(false);
  const [selectDesign, setSelectDesign] = useState(false);
  const [selectSet, setSelectSet] = useState(false);
  const [selectOther, setSelectOther] = useState(false);
  const [productColor, setProductColor] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [productDesign, setProductDesign] = useState([]);
  const [productSet, setProductSet] = useState([]);
  const [productOther, setProductOrder] = useState([]);

  const [valueOfParantCategory, setValueOfParantCategory] = useState("");
  const [valueOfSubCategory, setValueOfSubCategory] = useState("");
  const [subCategoryItem, setSubCategoryItem] = useState();
  const [secondChildCategoryItem, setSecondChildCategoryItem] = useState();

  const [imageLoading, setImageLoading] = useState(false)

  const [tag, setTag] = useState("");
  const [size, setSize] = useState("");
  const router = useRouter();
  const {
    data: categories,
    isLoading,
    refetch,
  } = useCustomQuery(["categories"], "category/childCategory");

  const { data: categories2 } = useCustomQuery(["categories"], "category");
// console.log("--------",categories2?.data?.result)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  useEffect(() => {
    if (valueOfParantCategory) {
      const result = categories2?.data?.result?.find(
        (item) => item.parent_category === valueOfParantCategory
      );
      
      setSubCategoryItem(result?.first_child_Category);
    }
  }, [valueOfParantCategory, categories2]);

  useEffect(() => {
    if (valueOfSubCategory && valueOfParantCategory) {
      const result = subCategoryItem?.find(
        (item) => item.firstChildTitle === valueOfSubCategory
      );
      
      setSecondChildCategoryItem(result?.secondChilds);
    }
  }, [valueOfSubCategory,valueOfParantCategory]);

  //   ------------------------product add function --------uses react hooks fForm------------------------



  function convertToUrlPath(e) {
    const inputString = e.target.value.slice(0, 100);
    const lowerCaseString = inputString.toLowerCase();
    const urlPath = lowerCaseString.replace(/[^a-zA-Z0-9]+/g, "-");
    setSlug(urlPath);
  }

  const addProductHandler = (data) => {
    if (Number(data?.salePrice) > Number(data?.price)) {
      return alert("Product sale price can not be lerge from MRP price");
    }
    if (
      Number(data?.buyPrice) > Number(data?.price) ||
      Number(data?.buyPrice) > Number(data.salePrice)
    ) {
      return alert(
        "Product buy price can not be lerge from MRP price or sale Price"
      );
    }
    const discountPrice = calculateDiscount(data?.price, data?.salePrice);

    setLoading(true);
    const product = {
      name: data.name,
      sku: data.sku,
      path: data?.path || slug,
      description: richText,
      category: valueOfParantCategory,
      first_child_category: valueOfSubCategory,
      second_child_category: selectedOptionCategory
        ? selectedOptionCategory.map((child) => child.label)
        : [""],
      // productType: data.productType || "",
      quantity: data.quantity,
      buyingPrice: Number(data.buyPrice),
      productPrice: Number(data.price),
      salePrice: Number(data.salePrice),
      discount: discountPrice,
      // offer_discount: Number(data?.offer_discount),
      // offer_quantity: Number(data?.offer_quantity),
      brand: data.brand,
      stock: data.stock,
      tags: selectedProductTag,
      imageURLs: imageUrl, //------------array
      size: selectedOption,
      type: data?.type,
      ratingValue: ratingValue,
      youtube: data.youtube || "",
      status: data.status,
      weight:data?.weight,
      variantType: data?.variantType,
      // delivery: data?.delivery,
      attributes: {
        colors: selectColor ? productColor : "",
        sizes: selectSize ? productSize : "",
        design: selectDesign ? productDesign : "",
        set: selectSet ? productSet : "",
        others: selectOther ? productOther : "",
      },
    };

    fetch(`${server_url}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAdminToken()}`,
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
          clearFromData();
          router.push("/admin/products");
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
      })
      .catch((error) => {
        swal("Something wrong! please try again", {
          icon: "error",
        });
        setLoading(false);
      });
  };

  const clearFromData = () => {
    reset();
    setSelectedProductTag([]);
    setImageUrl([]);
    setValueOfRichText("");
    setValueOfParantCategory("");
    setValueOfSubCategory("");
    setChildCategories([]);
    setSelectedOption([]);
    setSlug("");
    setSelectedOptionCategory(null);
  };

  // --------------------------------------------handle multi image upload
  const imgUrl = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`;
  const handleImageUpload = async (e) => {

    setImageLoading(true)
    const files = Array.from(e.target.files);

    const uploadPromises = files.map((file) => {
      const formData = new FormData();
      formData.append("image", file);

      return fetch(imgUrl, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.data?.url) {
            return result.data.url;
          } else {
            throw new Error("Image upload failed");
            setImageLoading(false)
          }
        }).catch((error) => {
          setImageLoading(false)
          swal("error", "Image Upload failed", "error")
        });
    });
    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      setImageUrl((prevUrls) => [...prevUrls, ...uploadedUrls]);
      setImageUploadErrorMessage(null);
      setImageLoading(false)
    } catch (error) {
      setImageLoading(false)
      setImageUploadErrorMessage(
        "Image Upload failed, please check your internet connection"
      );
      swal("error", "Image Upload failed, please check your internet connection", "error")
    }
  };

  // ----------------------------filter with parent category--------------------

 // Handles changing the parent category
const handleFilterWithParantCategory = (event) => {
  setValueOfParantCategory(event.target.value);
  setValueOfSubCategory(""); 
  setSecondChildCategoryItem([]);
  setSelectedOptionCategory(null); 
};

// Handles changing the first child category
const handleFilterWithSubCategory = (event) => {
  setValueOfSubCategory(event.target.value);
  setSecondChildCategoryItem([]);
  setSelectedOptionCategory(null);
};


  const handelAddTag = () => {
    const newValue = tag;
    setSelectedProductTag([...selectedProductTag, newValue]);
    setTag("");
  };

  const HandelRemoveTag = (ind) => {
    const remove = selectedProductTag.filter((item, index) => index !== ind);
    setSelectedProductTag(remove);
  };

  const handelAddSize = () => {
    const newValue = size;
    setSelectedOption([...selectedOption, newValue]);
    setSize("");
  };

  const HandelRemoveSize = (ind) => {
    const remove = selectedOption.filter((item, index) => index !== ind);
    setSelectedOption(remove);
  };

  return (
    <DashboardLayout>
      <div className="mid-container ">
        <div className="p-7 bg-white mt-5 rounded">
          <h1 className="text-2xl font-semibold">Add Product</h1>
          <p className="text-neutral">
            Add your product and necessary information from here
          </p>
        </div>

        <form
          onSubmit={handleSubmit(addProductHandler)}
          className="mt-5 px-2 md:px-7"
        >


          <DropImageCom
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            handleImageUpload={handleImageUpload}
            imageLoading={imageLoading}
          />

          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Product Title/Name</p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Product Title"
                onChange={convertToUrlPath}
              />
            </div>
          </div>

          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Product SKU</p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                type="text"
                {...register("sku", { required: true })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Product SKU"
              />
            </div>
          </div>

          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Product Slug</p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                type="text"
                onChange={(e) => setSlug(e.target.value)}
                value={slug}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Product Slug"
              />
            </div>
          </div>

          <div className="block md:flex gap-5 mb-8">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Product Description</p>
            </div>
            <div className="w-full md:w-[70%]">
              <ReactQuill
                theme="snow"
                value={richText}
                onChange={setValueOfRichText}
                style={{ height: 200, marginBottom: 12 }}
              />
              ;
            </div>
          </div>

          <div className="block md:flex items-center gap-5 my-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Parent Category</p>
            </div>
            <div className="w-full md:w-[70%]">
              <select
                onChange={handleFilterWithParantCategory}
                value={valueOfParantCategory}
                required
                className="select select-bordered w-full  focus:outline-none "
                placeholder="Category"
              // {...register("category", { required: true })}
              >
                <option selected hidden>
                  Choose Category
                </option>
                {categories2?.data?.result?.map((category, index) => (
                  <option value={category?.parent_category} key={index}>
                    {category?.parent_category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="block md:flex items-center gap-5 my-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>First child category</p>
            </div>
            <div className="w-full md:w-[70%]">
              <select
                onChange={handleFilterWithSubCategory}
                value={valueOfSubCategory}
                required
                className="select select-bordered w-full  focus:outline-none "
                placeholder="Category"
              // {...register("category", { required: true })}
              >
                <option selected hidden>
                  Choose first child category
                </option>
                {subCategoryItem?.map((category, index) => (
                  <option value={category?.firstChildTitle} key={index}>
                    {category?.firstChildTitle}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div
            className={`block md:flex items-center gap-5 mb-4 ${valueOfParantCategory ? "" : " cursor-not-allowed"
              }`}
          >
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Second Child Category</p>
            </div>
            <div
              className={`w-full md:w-[70%]  ${valueOfParantCategory ? "" : " cursor-not-allowed"
                }`}
            >
              <Select
                defaultValue={selectedOptionCategory}
                onChange={setSelectedOptionCategory}
                isMulti
                name="colors"
                options={secondChildCategoryItem?.map((child) => {
                  return { value: child, label: child };
                })}
                className="basic-multi-select cursor-not-allowed"
                classNamePrefix="select"
              />
            </div>
          </div>



          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Product Brands</p>
            </div>
            <div className="w-full md:w-[70%]">
              <select
                className="select select-bordered w-full  focus:outline-none "
                {...register("brand", { required: true })}
              >
                <option hidden selected>
                  Choose Brand
                </option>
                <option value={"no brand"}>No Brand</option>
                {brands?.data?.result?.map((bnd) => (
                  <option key={bnd?._id} value={bnd.name}>
                    {bnd.name}
                  </option>
                ))}
              </select>
            </div>
          </div>


          <div className="block md:flex gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Rating</p>
            </div>
            <div className="w-full md:w-[70%]">
              <StarRating
                SetRatingValue={SetRatingValue}
                ratingValue={ratingValue}
              />
            </div>
          </div>
          <div className="block md:flex gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Product Weight <small>{` (gm)`}</small></p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                type="text"
                {...register("weight", { required: true })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Product Weight"
                {...register("weight", {
                  required: "Product Weight is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Product Weight  must consist of digits only.",
                  },
                })}
                onKeyUp={(e) => {
                  trigger("weight");
                }}
              />
              <small className="text-[#FF4B2B] text-xs ml-2 font-medium my-2">
                {errors?.weight?.message}
              </small>
            </div>
          </div>

          <div className="block md:flex gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Buy Price</p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                type="text"
                {...register("buyPrice", { required: true })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Buy price"
                {...register("buyPrice", {
                  required: "buyPrice is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "buyPrice must consist of digits only.",
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

          <div className="block md:flex gap-5 mb-4">
            <div className="w-[30%] text-lg font-semibold mt-3">
              <p>Sale Price</p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                type="text"
                {...register("salePrice", { required: true })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Sale Price"
                {...register("salePrice", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "salePrice must consist of digits only.",
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
          <div className="block md:flex gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Product MRP Price</p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                type="text"
                // {...register("price", { required: true })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Price"
                {...register("price", {
                  required: "Phone number is required",
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
          <div className="block md:flex gap-5 mb-4">
            <div className="w-[30%] text-lg font-semibold mt-3">
              <p>youtube Url</p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                type="text"
                {...register("youtube", { required: false })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Youtube URL"
              />
            </div>
          </div>

          <div className=" block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold">
              <p>Product Tags</p>
            </div>
            <div className="w-full md:w-[70%]">
              <div className=" flex items-center gap-1">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  placeholder="Type Tag"
                />
                <button
                  type="button"
                  onClick={() => handelAddTag()}
                  className="py-[12px] rounded-md bg-primary text-white px-4"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex gap-2 items-center flex-wrap">
                {selectedProductTag?.map((item, index) => (
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


          {!showVariant ? (
            <>
              {/* <div className="block md:flex gap-5 mb-4">
                <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
                  <p>Offer Quantity</p>
                </div>
                <div className="w-full md:w-[70%]">
                  <input
                    type="text"
                    // {...register("offer_quantity", { required: false })}
                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                    placeholder="offer quantity"
                    {...register("offer_quantity", {
                      required: false,
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "salePrice must consist of digits only.",
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
              </div> */}

              {/* <div className="block md:flex gap-5 mb-4">
                <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
                  <p>Offer Discount Price</p>
                </div>
                <div className="w-full md:w-[70%]">
                  <input
                    type="text"
                    {...register("offer_discount", { required: false })}
                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                    placeholder="Offer Price"
                    {...register("offer_discount", {
                      required: false,
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "salePrice must consist of digits only.",
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
              </div> */}
            </>
          ) : (
            <></>
          )}

          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Product Stock</p>
            </div>
            <div className="w-full md:w-[70%]">
              <select
                className="select select-bordered w-full  focus:outline-none "
                {...register("stock", { required: true })}
              >
                <option value={true}>In stock</option>
                <option value={false}>Out Stock</option>
              </select>
            </div>
          </div>
          <div className="block md:flex gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Product Stock Quantity</p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                type="text"
                {...register("quantity", { required: false })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Stock Quantity"
                {...register("quantity", {
                  required: false,
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "quantity must consist of digits only.",
                  },
                })}
                onKeyUp={(e) => {
                  trigger("quantity");
                }}
              />
              <small className="text-[#FF4B2B] text-xs ml-2 font-medium my-2">
                {errors?.quantity?.message}
              </small>
            </div>
          </div>


          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Product Variant</p>
            </div>
            <div className="w-full md:w-[70%]">
              <select
                className="select select-bordered w-full  focus:outline-none "
                {...register("variantType", { required: true })}
                value={showVariant}
                onChange={(e) => setShowVariant(e.target.value === "true")}
              >
                <option value={false}>Normal Product</option>
                <option value={true}>Variant Product</option>
              </select>
            </div>
          </div>

          {/* <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Free Delivery</p>
            </div>
            <div className="w-full md:w-[70%]">
              <select
                className="select select-bordered w-full  focus:outline-none "
                {...register("delivery", { required: false })}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          </div> */}

          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Status</p>
            </div>
            <div className="w-full md:w-[70%]">
              <select
                className="select select-bordered w-full  focus:outline-none "
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

          {showVariant ? (
            <div className=" mt-10 mb-7">
              <div className=" flex items-center gap-2">
                <div className="w-full h-[2px] bg-primary rounded-full"></div>
                <h2 className=" w-[300px]">Add Product Variant</h2>
                <div className="w-full h-[2px] bg-primary rounded-full"></div>
              </div>

              <div className=" mt-5">
                <h2 className=" font-bold text-[20px] mb-2">Select Variant</h2>
                <div className=" grid md:grid-cols-5 grid-cols-2 justify-between gap-5">
                  <div className="form-control">
                    <label className="cursor-pointer border rounded-md px-2 border-primary label flex items-center gap-2">
                      <span className="label-text text-[20px] mt-[-5px]">
                        Color
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={selectColor}
                        className="checkbox checkbox-success"
                        onChange={(e) => setSelectColor(e.target.checked)}
                      />
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="cursor-pointer border rounded-md px-2 border-primary label flex items-center gap-2">
                      <span className="label-text text-[20px] mt-[-5px]">
                        Size
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={selectSize}
                        className="checkbox checkbox-success"
                        onChange={(e) => setSelectSize(e.target.checked)}
                      />
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="cursor-pointer border rounded-md px-2 border-primary label flex items-center gap-2">
                      <span className="label-text text-[20px] mt-[-5px]">
                        Design
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={selectDesign}
                        className="checkbox checkbox-success"
                        onChange={(e) => setSelectDesign(e.target.checked)}
                      />
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="cursor-pointer border rounded-md px-2 border-primary label flex items-center gap-2">
                      <span className="label-text text-[20px] mt-[-5px]">
                        Set
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={selectSet}
                        className="checkbox checkbox-success"
                        onChange={(e) => setSelectSet(e.target.checked)}
                      />
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="cursor-pointer border rounded-md px-2 border-primary label flex items-center gap-2">
                      <span className="label-text text-[20px] mt-[-5px]">
                        Other
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={selectOther}
                        className="checkbox checkbox-success"
                        onChange={(e) => setSelectOther(e.target.checked)}
                      />
                    </label>
                  </div>
                </div>

                <div className=" grid md:grid-cols-2 grid-cols-1 gap-5 mt-6 ">
                  {selectColor && (
                    <div className="block  items-center gap-5 mb-4">
                      <div className="w-full text-[16px] font-medium">
                        <p>Product color</p>
                      </div>
                      <div className="w-full">
                        <div>
                          <TagsInput
                            value={productColor}
                            onChange={setProductColor}
                            placeHolder="enter product color"
                          />
                          <p className=" text-[12px] mt-[-2px] ">press enter and add</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectSize && (
                    <div className="block  items-center gap-5 mb-4">
                      <div className="w-full text-[16px] font-medium">
                        <p>Product Size</p>
                      </div>
                      <div className="w-full">
                        <div>
                          <TagsInput
                            value={productSize}
                            onChange={setProductSize}
                            placeHolder="enter product size"
                          />
                          <p className=" text-[12px] mt-[-2px] ">press enter and add</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectDesign && (
                    <div className="block  items-center gap-5 mb-4">
                      <div className="w-full text-[16px] font-medium">
                        <p>Product Design</p>
                      </div>
                      <div className="w-full">
                        <div>
                          <TagsInput
                            value={productDesign}
                            onChange={setProductDesign}
                            placeHolder="enter product design"
                          />
                          <p className=" text-[12px] mt-[-2px] ">press enter and add</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectSet && (
                    <div className="block  items-center gap-5 mb-4">
                      <div className="w-full text-[16px] font-medium">
                        <p>Product Set</p>
                      </div>
                      <div className="w-full">
                        <div>
                          <TagsInput
                            value={productSet}
                            onChange={setProductSet}
                            placeHolder="enter product set"
                          />
                          <p className=" text-[12px] mt-[-2px] ">press enter and add</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectOther && (
                    <div className="block  items-center gap-5 mb-4">
                      <div className="w-full text-[16px] font-medium">
                        <p>Product Other</p>
                      </div>
                      <div className="w-full">
                        <div>
                          <TagsInput
                            value={productOther}
                            onChange={setProductOrder}
                            placeHolder="enter product other"
                          />
                          <p className=" text-[12px] mt-[-2px] ">press enter and add</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="flex justify-end items-center gap-5 mb-4">
            <button className="btn btn-primary ml-auto text-white flex items-center gap-1">
              <RiAddBoxFill size={20} className="text-white" />{" "}
              {loading ? <CustomButtonLoading /> : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddProduct;
