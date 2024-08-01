import React, { useEffect } from "react";
import BDAutoCity from "../../BDAutoCity";
import { useForm } from "react-hook-form";
import { useState } from "react";
import UserInformation from "../CustomOrder/UserInformation";
import ApplyCustomCoupon from "../CustomOrder/ApplyCustomCoupon";
import CheckoutProductItems from "../../CheckoutProductItems/CheckoutProductItems";
import { useRouter } from "next/router";
import { useContext } from "react";
import CreateContext from "../../CreateContex";
import swal from "sweetalert";
import { handlePostMethod } from "../../../../lib/usePostHooks";
import {
  sumOfCartPrice2,
  sumOfSalePrice2,
} from "../../../../lib/commonFunction";
import { usePostOrder } from "../../../../lib/usePostOrder";
import CustomModal from "../../../Shared/CustomModal";
import SizeAndColorInCheckout from "../../CheckoutProductItems/SizeAndColorInCheckout";
import server_url from "../../../../lib/config";
import { getTotalItemWeightCharge } from "../../../../lib/getTotalItemWeightCharge";

const CheckOut = ({ data, loading }) => {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [inputSize, setInputSize] = useState("");
  const [userColor, setUserColor] = useState("");
  // const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState({});
  const [productData, setProductData] = useState({});
  const [selectedCity, setSelectedCity] = useState("");
  const [cityErrorMessage, setCityErrorMessage] = useState(false);
  const [originalPriceTotal, setOriginalPriceTotal] = useState(0);
  const [totalPriceOfCartItem, setTotalPriceOfCartItem] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [shippingCost, setShippingCost] = useState();
  const [modalIsOpenSizeAndColor, setIsOpenSizeAndColor] = useState(false);
  const [databaseCartAndPriceTotal, setDatabaseCartAndPriceTotal] = useState({
    cartTotal: 0,
    originalProductPrice: 0,
  });

  const [finalTotal, setFinalTotal] = useState(0);

  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    setAllProducts(data?.products);
  }, [data?.products]);

  // when user click in size set product item
  const [productItem, setProductItem] = useState({});

  const router = useRouter();

  const {
    buyNowProduct,
    setAddToCartRefresher,
    addToCartRefresher,
    setOrderResponse,
    setQueryFromCategory,
  } = useContext(CreateContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
    setValue,
  } = useForm();

  // -------------------find product using id----------------
  const getTotalSalePrice = (products) => {
    let totalSalePrice = 0;
    // Iterate through each product and calculate the total sale price
    products?.forEach((product) => {
      totalSalePrice += product.salePrice * product.quantity;
    });

    return totalSalePrice;
  };

  const getTotalproductPrice = (products) => {
    let totalSalePrice = 0;
    // Iterate through each product and calculate the total sale price
    products?.forEach((product) => {
      totalSalePrice += product.price * product.quantity;
    });

    return totalSalePrice;
  };

  useEffect(() => {
    setCouponDiscount(0);
    setOriginalPriceTotal(getTotalproductPrice(allProducts));
    setCartTotal(getTotalSalePrice(allProducts));
  }, [allProducts]);

  // console.log("form local storage", productIdAndQuantity);
  let productsArr = [];
  if (allProducts) {
    productsArr = allProducts?.map((p) => ({
      product: p._id,
      name: p.productTitle,
      weight:p?.weight,
      price: p.salePrice,
      originalProductPrice: p.price,
      quantity: p.quantity,
      imageURL: p.image,
      size: p.size,
      color: p.color,
      set: p.set,
      design: p.design,
      other: p.other,
      type: p?.type,
      variant: p?.userSize?._id,
      variantType: p?.variantType,
      parent_category: p?.parent_category,
      offer_quantity: p?.variantType
        ? p?.userSize.offer_quantity
        : p?.offer_quantity,
      offer_discount: p?.variantType
        ? p?.userSize.offer_discount
        : p?.offer_discount,
    }));
  }

  const weightCharge=getTotalItemWeightCharge(productsArr)
  const shippingCostWithWeightCharge=(Number(shippingCost)+weightCharge)

  useEffect(() => {
    if (allProducts) {
      const productIdAndQuantity = allProducts?.map((item) => {
        return { id: item?._id, quantity: item?.quantity };
      });
      const url =
        "http://localhost:5000/api/v1/order/get-total-price";
      handlePostMethod(url, productIdAndQuantity, setTotalPriceOfCartItem);
    }
    if (allProducts?.length > 0) {
      const totalOriginal = sumOfSalePrice2(allProducts);
      setOriginalPriceTotal(totalOriginal);
      // its function response product id and q to product sale price total and original price total
      sumOfCartPrice2(allProducts, setDatabaseCartAndPriceTotal);
    } else {
      setOriginalPriceTotal(0);
      setDatabaseCartAndPriceTotal({
        cartTotal: 0,
        originalProductPrice: 0,
      });
    }
    setCouponDiscount(0);
  }, [allProducts]);

  const onSubmitForm = async (data) => {
    // if (!selectedCity) {
    //     return setCityErrorMessage(true);
    // }
    // setCityErrorMessage(false);
    setIsOpen(true);

    const newOrder = {
      orderItem: productsArr,
      // user: isExistUser ? user?._id : "",
      orderSource: "landingPage",
      shippingPrice: shippingCostWithWeightCharge,
      totalAmount: finalTotal + shippingCostWithWeightCharge - couponDiscount,
      afterDiscountPrice: finalTotal - couponDiscount,
      originalProductPrice: originalPriceTotal,
      discount: originalPriceTotal - finalTotal + couponDiscount,
      couponDiscount,
      shippingAddress: {
        address: data.address,
        city: selectedCity,
        thana: data.thana || "",
        email: data?.email || "",
        firstName: data.firstName, //frisName mane backend a fullName hisabe jacche, ekhan theke firstName e pathate hobe
        lastName: data.lastName || "",
        phone: data.phone,
        postalCode: data.postal || "",
        note: data?.Note,
      },
    };
    newOrder.paymentDetails = {
      method: "cod",
    };

    const url = `${server_url}/order`;
    usePostOrder(url, newOrder, setOrderResponse, router);

    // setOrder(newOrder);
  };



  const handleIncreaseProduct = (product) => {
    const update = allProducts?.map((pro) => {
      if (pro._id !== product._id) return pro;
      return { ...pro, quantity: pro.quantity + 1 };
    });
    setAllProducts(update);
  };

  const handleDecreseProduct = (product) => {
    const update = allProducts?.map((pro) => {
      if (pro._id !== product._id) return pro;
      return { ...pro, quantity: pro.quantity === 1 ? 1 : pro.quantity - 1 };
    });
    setAllProducts(update);
  };

  useEffect(() => {
    calculateTotalSalePrice(allProducts);
  }, [allProducts]);

  function calculateTotalSalePrice(products) {
    // Calculate total sale price taking quantity into account
    const total = products?.reduce(
      (total, product) =>
        total +
        (product?.variantType
          ? product?.userSize?.offer_quantity <= product.quantity
            ? product.salePrice * product.quantity -
            product.userSize?.offer_discount * product.quantity
            : product.salePrice * product.quantity
          : product?.offer_quantity <= product.quantity
            ? product.salePrice * product.quantity -
            product.offer_discount * product.quantity
            : product.salePrice * product.quantity),
      0
    );
    setFinalTotal(total);
  }

  return (
    <div className="pt-10 md:pt-20">
      <div
        id="palace-order"
        className="border-2 md:border-[5px] border-primary rounded-lg px-4 py-3 md:px-8 md:py-6 my-8"
      >
        <div className="bg-primary px-4 py-2 rounded-lg mb-5">
          <h1 className="text-[18px] md:text-[28px] font-bold text-center text-white">
            Fill the form below with correct information to confirm the order
          </h1>
        </div>

        {/* ---------order form------------- */}
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className=" block md:flex justify-center gap-5">
            <div className="w-full md:w-[55%] bg-primary/20 p-5 md:p-9 rounded-xl shadow h-fit mb-3 md:mb-0 ">
              {/* <h1 className="font-semibold mb-2">01. Personal Address</h1> */}
              <div className="grid grid-cols-1">
                <div className=" p mb-4">
                  <label htmlFor="name" className="leading-7 text-sm ">
                    {/* ekhane first name chilo, ekhon sudo diract fulll name hobe, tai ekhane first name er poriborte sudo label ta change hobe, last name a kichu jabe na, tai empnty string jabe */}
                    Your Name
                  </label>
                  <input
                    type="name"
                    id="firstName"
                    name="first_name"
                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                    placeholder="Enter Your name"
                    {...register("firstName", {
                      required: "Full Name is required",
                    })}
                    onKeyUp={(e) => {
                      trigger("firstName");
                    }}
                  />
                  <small className="text-[#FF4B2B] text-xs font-medium my-2">
                    {errors?.firstName?.message}
                  </small>
                </div>

                <div className=" p mb-4">
                  <label htmlFor="name" className="leading-7 text-sm ">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                    placeholder="Your Phone Number"
                    {...register("phone", {
                      required: "Phone is required",
                      minLength: {
                        value: 11,
                        message: "Phone number must be 11 digit.",
                      },
                      maxLength: {
                        value: 11,
                        message: "Phone number must be 11 digit.",
                      },
                    })}
                    onKeyUp={(e) => {
                      trigger("phone");
                    }}
                  />
                  <small className="text-[#FF4B2B] text-xs font-medium my-2">
                    {errors?.phone?.message}
                  </small>
                </div>
              </div>

              {/* <h1 className="font-semibold my-2">02. Shipping Address</h1> */}
              <div className="w-full my-3">
                <label htmlFor="message" className="leading-7 text-sm">
                  Select your area
                </label>
                {/* <select
                                    value={shippingCost}
                                    onChange={(event) => setShippingCost(event.target.value)}
                                    className="w-full text-black rounded py-2.5 px-3"
                                >
                                    <option value={deliveryCost?.inDhaka}>Inside Dhaka City (ঢাকা সিটির ভিতর)</option>
                                    <option value={deliveryCost?.outDhaka}>Outside Dhaka City(সাভার, আশুলিয়া, কেরানিগঞ্জ)</option>
                                    <option value={deliveryCost?.others}>অন্যান্য</option>
                                </select> */}
                <BDAutoCity
                  setShippingCost={setShippingCost}
                  shippingCost={shippingCost}
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="address" className="leading-7 text-sm">
                  Your Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  placeholder="address"
                  {...register("address", {
                    required: "Address is required",
                    minLength: {
                      value: 12,
                      message: "Address must be at least 12 characters long",
                    },
                  })}
                  onKeyUp={(e) => {
                    trigger("address");
                  }}
                />
                <small className="text-[#FF4B2B] text-xs font-medium my-2">
                  {errors?.address?.message}
                </small>
              </div>
              <div className="relative mb-4">
                <label htmlFor="address" className="leading-7 text-sm">
                  Your Note (Optional)
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  placeholder="Note..."
                  {...register("Note", {
                    required: false,
                  })}
                  onKeyUp={(e) => {
                    trigger("Note");
                  }}
                />
              </div>
            </div>

            {/* Cart Product */}
            <div className="w-full md:w-[45%] bg-white rounded-xl shadow p-5 relative">
              {/* {
                                productItem &&
                                <p className="text-primary mb-2 font-bold">প্রডাক্ট এর সাইজ বাটনে ক্লিক করে সাইজ সিলেক্ট করুন |</p>
                            } */}
              <h1 className="mb-1 font-semibold title-font">Product List</h1>

              <div className=" overflow-y-scroll max-h-96">
                {allProducts?.length &&
                  allProducts?.map((product, index) => (
                    <>
                      <div key={index} className="">
                        <CheckoutProductItems
                          product={product}
                          handleDecreseProduct={handleDecreseProduct}
                          handleIncreaseProduct={handleIncreaseProduct}
                          sizeIndex={sizeIndex}
                          setProductItem={setProductItem}
                          setIsOpenSizeAndColor={setIsOpenSizeAndColor}
                        />
                      </div>
                    </>
                  ))}
              </div>

              <div className="mt-5">
                <h1 className="font-semibold border-b-[1px] pb-2 mb-5">
                  Order Summery
                </h1>

                {/* <div className="flex justify-between items-center text-sm mb-2">
                  <h1 className="font-medium">Products Total</h1>
                  <p>৳ {originalPriceTotal}</p>
                </div> */}
                <div className="flex justify-between items-center text-sm mb-2">
                  <h1 className="font-medium">Subtotal</h1>
                  <p className="font-bold">৳ {finalTotal - couponDiscount}</p>
                </div>
                {couponDiscount > 0 && (
                  <small className="text-green-500 text-end block font-bold">
                    You got Coupon Discount {couponDiscount} TK.
                  </small>
                )}
                {/* <div className="flex justify-between items-center text-sm mb-2">
                  <h1 className="font-medium">Discount Amount</h1>
                  <p>৳ {originalPriceTotal - finalTotal + couponDiscount}</p>
                </div> */}
                <div className="flex justify-between items-center  text-sm mb-2">
                  <h1 className="font-medium">Delivery Fee</h1>
                  <p className="font-bold">৳{shippingCostWithWeightCharge}</p>
                </div>
                <div className="flex justify-between items-center  text-sm">
                  <h1 className="font-medium">Total</h1>
                  <p className="text-green-800 font-bold">
                    ৳ {finalTotal + shippingCostWithWeightCharge - couponDiscount}
                  </p>
                </div>
                <p className="text-xs text-end">
                  VAT included, where applicable
                </p>

                <div className="grid grid-cols-1 gap-5 mt-5">
                  <button
                    disabled={!allProducts?.length}
                    type="submit"
                    className="text-white btn btn-success border-0 py-2 px-6 focus:outline-none w-full rounded hover:bg-green-900"
                  >
                    Confirm Order
                  </button>
                </div>
                {/* --------------coupon method ------------------- */}
                <ApplyCustomCoupon
                  setCouponDiscount={setCouponDiscount}
                  product={allProducts}
                />
              </div>
            </div>
          </div>
        </form>
        {/* =------------------------ */}
      </div>

      <CustomModal
        modalIsOpen={modalIsOpenSizeAndColor}
        setIsOpen={setIsOpenSizeAndColor}
      >
        {/* -----------this modal for when user change size and color */}
        <SizeAndColorInCheckout
          product={productItem}
          setIsOpen={setIsOpenSizeAndColor}
        />
      </CustomModal>
    </div>
  );
};

export default CheckOut;
