import React, { useContext, useEffect, useState } from "react";
import { BsCloudUploadFill } from "react-icons/bs";
import DashboardLayout from "../../../src/Components/DashboardLayout";

import { TagsInput } from "react-tag-input-component";
import { useForm } from "react-hook-form";
import { BiImageAdd } from "react-icons/bi";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import swal from "sweetalert";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import Select from "react-select";
import AdminDashboardBreadcrumb from "../../../src/Shared/AdminDashboardBreadcrumb";
import ColorPicker from "../../../src/Shared/ColorPicker";
import { useCustomQuery } from "../../../src/hooks/useMyShopData";
import CustomButtonLoading from "../../../src/Shared/CustomButtonLoading";
import Image from "next/image";
import CustomModal from "../../../src/Shared/CustomModal";
import AddVariant from "../../../src/Components/Admin/Variant/AddVariant";
import VariantList from "../../../src/Components/Admin/Variant/VariantList";
import server_url from "../../../lib/config";
import { getAdminToken } from "../../../lib/getToken";
import DropImageCom from "../../../src/Components/Admin/Variant/DropImageCom";

const sizeOptions = [
  { value: "Default", label: "Default" },
  { value: "Small", label: "Small" },
  { value: "Medium", label: "Medium" },
  { value: "Large", label: "Large" },
  { value: "xl", label: "xl" },
  { value: "Xll", label: "Xll" },
];

const UpdateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [selectedProductTag, setSelectedProductTag] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [richText, setValueOfRichText] = useState("");
  const [valueOfParantCategory, setValueOfParantCategory] = useState("");
  const [childCategories, setChildCategories] = useState([]);
  const [imageUploadErrorMessage, setImageUploadErrorMessage] = useState(null);
  const [product, setProduct] = useState({});
  const [selectedOption, setSelectedOptionSize] = useState([]);
  const [ratingValue, SetRatingValue] = useState(0);
  // const [productColor, setProductColor] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  // for child category
  const [selectedOptionCategory, setSelectedOptionCategory] = useState(null);
  const { data: brands } = useCustomQuery(["brands"], "brands");
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
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
  const [subCategoryItem, setSubCategoryItem] = useState();
  const [variantLoading, setVariantLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const router = useRouter();
  const id = router.query.id;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    trigger,
  } = useForm();

  const { data: categories2 } = useCustomQuery(["categories"], "category");

  useEffect(() => {
    if (valueOfParantCategory) {
      const result = categories2?.data?.result?.find(
        (item) => item.parentCategory === valueOfParantCategory
      );
      setSubCategoryItem(result);
    }
  }, [valueOfParantCategory, categories2]);

  let url = `${server_url}/product/${id}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setProduct(data.data);
          setSelectedProductTag(data.data.tags);
          setChildCategories(data?.data?.subCategory);
          setSelectedOptionSize(data.data.size);
          setImageUrl(data.data.imageURLs);
          setValueOfRichText(data.data.description);
          SetRatingValue(data?.data?.ratingValue || 0);
          setValueOfParantCategory(data.data.category);
          setValue("type", data.data.type);
          setValue("buyPrice", data.data.buyingPrice);
          setValue("price", data.data.productPrice);
          setValue("salePrice", data.data.salePrice);
          setValue("offer_quantity", data.data.offer_quantity);
          setValue("offer_discount", data.data.offer_discount);
          setValue("stock", data.data.stock);
          setValue("delivery", data.data.delivery);
          setValue("variantType", data.data.variantType ? "true" : "false");
          setValue("quantity", data.data.quantity)
          setShowVariant(data?.data?.variantType);
          setSelectColor(data?.data?.attributes?.colors ? true : false);
          setSelectDesign(data?.data?.attributes?.design ? true : false);
          setSelectSet(data?.data?.attributes?.set ? true : false);
          setSelectSize(data?.data?.attributes?.sizes ? true : false);
          setSelectOther(data?.data?.attributes?.others ? true : false);
          setProductColor(
            data?.data?.attributes?.colors ? data?.data?.attributes?.colors : []
          );
          setProductSize(
            data?.data?.attributes?.sizes ? data?.data?.attributes?.sizes : []
          );
          setProductDesign(
            data?.data?.attributes?.design ? data?.data?.attributes?.design : []
          );
          setProductSet(
            data?.data?.attributes?.set ? data?.data?.attributes?.set : []
          );
          setProductOrder(
            data?.data?.attributes?.others ? data?.data?.attributes?.others : []
          );
        }
      });
  }, [id, reload]);

  /*  if (product.name) {
   
  } */

  useEffect(() => {
    if (childCategories?.length > 0) {
      const option = childCategories?.map((child) => {
        return { value: child, label: child };
      });
      setSelectedOptionCategory(option);
    }
  }, [childCategories]);

  const {
    data: categories,
    isLoading,
    refetch,
  } = useCustomQuery(["categories"], "category/childCategory");

  //   ------------------------product add function --------uses react hooks fForm------------------------
  // --------------------update product handler--------------------
  const addProductHandler = (data) => {
    setLoading(true);
    const updateProduct = {
      name: data.name || product.name,
      sku: data.sku || product.name,
      path: data?.path || product.path,
      description: richText,
      category: valueOfParantCategory,
      subCategory: selectedOptionCategory
        ? selectedOptionCategory.map((child) => child.label)
        : [""],
      // productType: data.productType,
      quantity: Number(data.quantity) || product.quantity,
      buyingPrice: Number(data.buyPrice) || product.buyingPrice,
      productPrice: Number(data.price) || product.productPrice,
      salePrice: Number(data.salePrice) || product.salePrice,
      discount:
        Math.ceil((1 - Number(data.salePrice) / Number(data.price)) * 100) ||
        product.discount,
      brand: data.brand,
      tags: selectedProductTag,
      stock: data.stock,
      quantity: data.quantity,
      offer_discount: Number(data?.offer_discount) || product.offer_discount,
      offer_quantity: Number(data?.offer_quantity) || product.offer_quantity,
      imageURLs: imageUrl, //------------array
      size: selectedOption,
      type: data?.type || product?.type,
      ratingValue: data.ratingValue || product.ratingValue,
      youtube: data.youtube || product.youtube,
      status: data.status,
      variantType: data?.variantType === "true" ? true : false,
      delivery: data?.delivery,
      // attributes: {
      //   colors: selectColor ? productColor : "",
      //   sizes: selectSize ? productSize : "",
      //   design: selectDesign ? productDesign : "",
      //   set: selectSet ? productSet : "",
      //   others: selectOther ? productOther : "",
      // },
    };

    // ------------------------------------------------post method here
    fetch(`${server_url}/product/${product._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAdminToken()}`,
      },
      body: JSON.stringify(updateProduct),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == "success") {
          setLoading(false);
          swal("Product updated successfully.", {
            icon: "success",
          });
          setReload(!reload);
        } else {
          setLoading(false);
          swal(result.error, {
            icon: "error",
          });
        }
      });
  };

  const UpdateVariant = (data) => {
    setVariantLoading(true);
    const updateProduct = {
      name: product.name,
      sku: product.name,
      path: product.path,
      description: richText,
      category: valueOfParantCategory,
      subCategory: selectedOptionCategory
        ? selectedOptionCategory.map((child) => child.label)
        : [],
      // productType: data.productType,
      quantity: product.quantity,
      buyingPrice: product.buyingPrice,
      productPrice: product.productPrice,
      salePrice: product.salePrice,
      discount: product.discount,
      tags: selectedProductTag,
      stock: product.stock,
      offer_discount: product.offer_discount,
      offer_quantity: product.offer_quantity,
      imageURLs: imageUrl, //------------array
      size: selectedOption,
      type: product?.type,
      ratingValue: product.ratingValue,
      youtube: product.youtube,
      status: product.status,
      attributes: {
        colors: selectColor ? productColor : "",
        sizes: selectSize ? productSize : "",
        design: selectDesign ? productDesign : "",
        set: selectSet ? productSet : "",
        others: selectOther ? productOther : "",
      },
    };

    // ------------------------------------------------post method here
    fetch(`http://localhost:5000/api/v1/product/${product._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAdminToken()}`,
      },
      body: JSON.stringify(updateProduct),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == "success") {
          setVariantLoading(false);
          swal("Product updated successfully.", {
            icon: "success",
          });
          setReload(!reload);
        } else {
          setVariantLoading(false);
          swal(result.error, {
            icon: "error",
          });
        }
      });
  };

  // --------------------------------------------handle image upload
  const imgUrl = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`;


  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setImageLoading(true);
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
      setImageLoading(false);
    } catch (error) {
      setImageLoading(false);
      setImageUploadErrorMessage(
        "Image Upload failed, please check your internet connection"
      );
      swal("error", "Image Upload failed", "error")
    }
  };

  // ------------------------remove image-----------------------------
  const handleRemoveImage = (index) => {
    imageUrl.splice(index, 1);
  };

  // ----------------------------filter with parent category--------------------

  const handleFilterWithParantCategory = (event) => {
    setValueOfParantCategory(event.target.value);
  };

  return (
    <DashboardLayout>
      <div className="mid-container">
        <AdminDashboardBreadcrumb
          title={"Update Product"}
        // subtitle={" Update your product and necessary information from here"}
        />

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
                defaultValue={product.name}
                type="text"
                {...register("name", { required: false })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Product Title"
              />
            </div>
          </div>

          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Product SKU</p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                defaultValue={product.sku}
                type="text"
                {...register("sku", { required: false })}
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
                defaultValue={product.path}
                type="text"
                {...register("path")}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Product Slug"
              />
            </div>
          </div>

          <div className="block md:flex gap-5 mb-4">
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

          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Parent Category</p>
            </div>
            <div className="w-full md:w-[70%]">
              <select
                onChange={handleFilterWithParantCategory}
                value={valueOfParantCategory}
                className="select select-bordered w-full  focus:outline-none "
                placeholder="Category"
              // {...register("category", { required: false })}
              >
                <option disabled selected>
                  Category
                </option>
                {categories?.data?.parentCategories.map((category, index) => (
                  <option value={category} key={index}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* -----------------------------------child category---------------------- */}
          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Child Category</p>
            </div>
            <div className="w-full md:w-[70%]">
              {selectedOptionCategory && (
                <>
                  <Select
                    defaultValue={selectedOptionCategory}
                    onChange={setSelectedOptionCategory}
                    isMulti
                    name="colors"
                    options={subCategoryItem?.childCategory?.map((child) => {
                      return { value: child, label: child };
                    })}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </>
              )}
            </div>
          </div>


          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Product Brands</p>
            </div>
            <div className="w-full md:w-[70%]">
              <select
                defaultValue={product.brand}
                className="select select-bordered w-full  focus:outline-none "
                {...register("brand", { required: false })}
              >
                <option
                  value={"no brand"}
                  selected={product.brand === "no brand"}
                >
                  No Brand
                </option>
                {brands?.data?.result?.map((bnd) => (
                  <option
                    key={bnd?._id}
                    selected={product.brand === bnd.name}
                    value={bnd.name}
                  >
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
              <input
                type="number"
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Type Product Rating 0 to 5"
                id="number-input"
                {...register("ratingValue", {
                  required: false,
                  min: 0,
                  max: 5,
                  validate: (value) => /^[0-9]*$/.test(value), // only allow integer values
                })}
                defaultValue={product.ratingValue}
              />
              {errors.ratingValue && (
                <p>Enter a valid number between 0 and 5</p>
              )}
            </div>
          </div>

          {!showVariant && (
            <>
              <div className="block md:flex gap-5 mb-4">
                <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
                  <p>Buy Price</p>
                </div>
                <div className="w-full md:w-[70%]">
                  <input
                    type="text"
                    // {...register("buyPrice", { required: false })}
                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                    placeholder="Buy price"
                    {...register("buyPrice", {
                      required: false,
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "salePrice must consist of digits only.",
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
                    defaultValue={product.salePrice}
                    type="text"
                    // {...register("salePrice", {
                    //   required: false,
                    //   pattern: /^[0-9]+$/,
                    // })}
                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                    placeholder="Sale Price"
                    {...register("salePrice", {
                      required: false,
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
                  <p>Product Price</p>
                </div>
                <div className="w-full md:w-[70%]">
                  <input
                    type="text"
                    // {...register("price", { required: false })}
                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                    placeholder="price"
                    {...register("price", {
                      required: false,
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
            </>
          )}

          <div className="block md:flex gap-5 mb-4">
            <div className="w-[30%] text-lg font-semibold mt-3">
              <p>youtube Url</p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                type="text"
                defaultValue={product.youtube}
                {...register("youtube", { required: false })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Youtube URL"
              />
            </div>
          </div>
          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold">
              <p>Product Tags</p>
            </div>
            <div className="w-full md:w-[70%]">
              <div>
                <TagsInput
                  value={selectedProductTag}
                  onChange={setSelectedProductTag}
                  placeHolder="enter tag name"
                />
                <em className="text-xs">press enter or comma to add new tag</em>
              </div>
            </div>
          </div>


          {!showVariant ? (
            <>
              <div className="block md:flex gap-5 mb-4">
                <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
                  <p>Offer Quantity</p>
                </div>
                <div className="w-full md:w-[70%]">
                  <input
                    type="text"
                    // {...register("offer_quantity", { required: false })}
                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                    placeholder="quantity"
                    {...register("offer_quantity", {
                      required: false,
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "offer_quantity must consist of digits only.",
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

              <div className="block md:flex gap-5 mb-4">
                <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
                  <p>Offer Discount Price</p>
                </div>
                <div className="w-full md:w-[70%]">
                  <input
                    type="text"
                    // {...register("offer_discount", { required: false })}
                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                    placeholder="Offer Price"
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
                onChange={(e) => setShowVariant(e.target.value === "true")}
              >
                <option value={"false"}>Normal Product</option>
                <option value={"true"}>Variant Product</option>
              </select>
            </div>
          </div>

          <div className="block md:flex items-center gap-5 mb-4">
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
          </div>

          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Status</p>
            </div>
            <div className="w-full md:w-[70%]">
              <select
                defaultValue={product.status}
                className="select select-bordered w-full  focus:outline-none "
                {...register("status", { required: false })}
              >
                <option value={true} selected={product.status === true}>
                  Publish
                </option>
                <option value={false} selected={product.status === false}>
                  Review
                </option>
              </select>
            </div>
          </div>

          <div className="flex justify-end items-center gap-5 mb-4">
            <button className="btn btn-primary ml-auto text-white">
              {loading ? <CustomButtonLoading /> : "Update Product"}
            </button>
          </div>
        </form>

        <div className=" md:px-10">
          {showVariant && (
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
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end items-center gap-5 mb-4">
                <button
                  onClick={() => UpdateVariant()}
                  className="btn btn-primary ml-auto text-white"
                >
                  {variantLoading ? <CustomButtonLoading /> : "Update Variant"}
                </button>
              </div>
            </div>
          )}
        </div>

        {showVariant && (
          <div>
            <div className="flex items-center gap-3 py-5  w-full ">
              <div className="w-full h-[1px] bg-gray-300"></div>
              <h2 className="text-[20px] font-semibold">Variant</h2>
              <div className="w-full h-[1px] bg-gray-300"></div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                {/* <h2 className=" font-bold text-[25px]">Variant </h2> */}
                {/* <button
                    onClick={() => setOpen(true)}
                    type="button"
                    className="btn btn-primary ml-auto text-white"
                  >
                    {"Add Variant"}
                  </button> */}
              </div>
              <div className="mt-4">
                <div className="overflow-x-auto">
                  <table className="table table-compact w-full">
                    <thead>
                      <tr>
                        <th className="bg-[#f3f3f3] text-center">Image</th>
                        {product?.attributes?.colors && (
                          <th className="bg-[#f3f3f3] text-center">Color</th>
                        )}
                        {product?.attributes?.sizes && (
                          <th className="bg-[#f3f3f3] text-center">Size</th>
                        )}
                        {product?.attributes?.design && (
                          <th className="bg-[#f3f3f3] text-center">Design</th>
                        )}
                        {product?.attributes?.set && (
                          <th className="bg-[#f3f3f3] text-center">Set</th>
                        )}
                        {product?.attributes?.others && (
                          <th className="bg-[#f3f3f3] text-center">Other</th>
                        )}
                        <th className="bg-[#f3f3f3] text-center">Quantity</th>
                        <th className="bg-[#f3f3f3] text-center">Offer</th>
                        <th className="bg-[#f3f3f3] text-center">Buy Price</th>
                        <th className="bg-[#f3f3f3] text-center">Sale Price</th>
                        <th className="bg-[#f3f3f3] text-center">
                          Product Price
                        </th>
                        <th className="bg-[#f3f3f3] text-center">Discount</th>
                        <th className="bg-[#f3f3f3] text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product?.variant?.map((pro, index) => (
                        <VariantList
                          key={pro._id}
                          product={pro}
                          item={product}
                          productId={id}
                          index={index}
                          setReloader={setReload}
                          reolder={reload}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <CustomModal modalIsOpen={open} setIsOpen={setOpen}>
        <AddVariant
          id={product?._id}
          setOpen={setOpen}
          product={product}
          setReload={setReload}
        />
      </CustomModal>
    </DashboardLayout>
  );
};

export default UpdateProduct;
