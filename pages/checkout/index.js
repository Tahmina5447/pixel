import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  sumOfCartPrice,
  sumOfProductPrice,
  sumOfSalePrice,
} from "../../lib/commonFunction";
import updateCartLocalStorage from "../../lib/updateCartLocalStorage";
import { handlePostMethod } from "../../lib/usePostHooks";
import BdCity from "../../src/Components/BdCity";
import PaymentIndex from "../../src/Components/CheckoutPayment/PaymentIndex";
import CheckoutProductItems from "../../src/Components/CheckoutProductItems/CheckoutProductItems";
import CreateContext from "../../src/Components/CreateContex";
import CustomModal from "../../src/Shared/CustomModal";
import CartProductItems from "../../src/Shared/drawer/CartProductItems";
import ApplyCoupon from "../../src/Components/Coupons/ApplyCoupon";
import AuthUser from "../../lib/AuthUser";
import swal from "sweetalert";
import SizeAndColorInCheckout from "../../src/Components/CheckoutProductItems/SizeAndColorInCheckout";
import RequireAuth from "../../src/RequireAuth/RequireAuth";
import BDAutoCity from "../../src/Components/BDAutoCity";
import server_url from "../../lib/config";
import { usePostOrder, usePostOrder2 } from "../../lib/usePostOrder";
import { getTotalItemWeightCharge } from "../../lib/getTotalItemWeightCharge";
const Checkout = () => {
  const [userDetails, setUserDetails] = useState();
  const [sizeIndex, setSizeIndex] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenSizeAndColor, setIsOpenSizeAndColor] = useState(false);
  const [order, setOrder] = useState({});
  const [totalPriceOfCartItem, setTotalPriceOfCartItem] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");
  const [cityErrorMessage, setCityErrorMessage] = useState(false);
  const [shippingCost, setShippingCost] = useState(120);
  const [originalPriceTotal, setOriginalPriceTotal] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [databaseCartAndPriceTotal, setDatabaseCartAndPriceTotal] = useState({
    cartTotal: 0,
    originalProductPrice: 0,
  });
  const [isDelivery, setIsDelivery] = useState(false);

  const [finalTotal, setFinalTotal] = useState(0);
  const [paymentDetailsLast, setPaymentDetailsLast] = useState();

  // when user click in size set product item
  const [productItem, setProductItem] = useState({});

  const [selectedValue, setSelectedValue] = useState("1");
  const [loading2, setLoading2] = useState(false);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const router = useRouter();
  const {
    localStorageCartItems,
    buyNowProduct,
    setAddToCartRefresher,
    addToCartRefresher,
    setOrderResponse,
    setQueryFromCategory,
    setlocalStorageCartItems,
  } = useContext(CreateContext);
  const { userInfo: user } = AuthUser();

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
  } = useForm({
    defaultValues: {
      firstName: user?.fullName?.split(" ")[0],
      email: user?.email,
    },
  });

  // cartTotal and originalProductPrice
  const { cartTotal: cartTotalFromLocalStorage } = localStorageCartItems || [];
  let cartTotal = cartTotalFromLocalStorage;

  useEffect(() => {
    if (selectedValue === "2") {
      setIsOpen(true);
    }
  }, [selectedValue]);

  console.log(paymentDetailsLast);

  useEffect(() => {
    if (localStorageCartItems.cartTotal) {
      const productIdAndQuantity = localStorageCartItems?.items?.map((item) => {
        return { id: item?._id, quantity: item?.quantity };
      });
      const url =
        "http://localhost:5000/api/v1/order/get-total-price";
      handlePostMethod(url, productIdAndQuantity, setTotalPriceOfCartItem);
    }
    if (localStorageCartItems?.items?.length > 0) {
      const totalOriginal = sumOfSalePrice(localStorageCartItems);
      setOriginalPriceTotal(totalOriginal);
      // its function response product id and q to product sale price total and original price total
      sumOfCartPrice(localStorageCartItems, setDatabaseCartAndPriceTotal);
    } else {
      setOriginalPriceTotal(0);
      setDatabaseCartAndPriceTotal({
        cartTotal: 0,
        originalProductPrice: 0,
      });
    }
    setCouponDiscount(0);
  }, [localStorageCartItems]);

  useEffect(() => {
    localStorageCartItems?.items?.forEach((data) => {
      if (data?.delivery) {
        setIsDelivery(true);
      } else {
        setIsDelivery(false);
      }
    });
  }, [localStorageCartItems?.items, finalTotal]);

  // console.log("form local storage", productIdAndQuantity);
  let productsArr = [];
  if (localStorageCartItems) {
    productsArr = localStorageCartItems?.items?.map((p) => ({
      product: p._id,
      name: p.productTitle,
      price: p.salePrice,
      weight:p?.weight,
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
      category: p.category,
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

  const onSubmitForm = async (data) => {
    if (localStorageCartItems.items.length < 1) {
      return swal("error", "Product cart is empty!!", "error");
    }

    setCityErrorMessage(false);

    let newOrder = {
      orderItem: productsArr,
      user: user?._id,
      orderSource: "Cart Order",
      shippingPrice: shippingCostWithWeightCharge,
      totalAmount: finalTotal + shippingCostWithWeightCharge - couponDiscount,
      afterDiscountPrice: finalTotal - couponDiscount,
      originalProductPrice: originalPriceTotal,
      discount: originalPriceTotal - finalTotal + couponDiscount,
      couponDiscount,
      shippingAddress: {
        address: data.address,
        city: "",
        thana: data.thana || "",
        email: data.email || "",
        firstName: data.firstName, //frisName mane backend a fullName hisabe jacche, ekhan theke firstName e pathate hobe
        lastName: data.lastName || "",
        phone: data.phone,
        note: data?.Note,
        postalCode: data.postal || "",
      },
    };

    if (selectedValue === "1") {
      newOrder.paymentDetails = {
        method: "cod",
      };
      const url = `${server_url}/order`;
      usePostOrder2(
        url,
        newOrder,
        setOrderResponse,
        router,
        setLoading2,
        setlocalStorageCartItems
      );
    } else {
      newOrder.paymentDetails = { ...paymentDetailsLast };
      // console.log(newOrder);
      const url = `${server_url}/order`;
      usePostOrder2(
        url,
        newOrder,
        setOrderResponse,
        router,
        setLoading2,
        setlocalStorageCartItems
      );
    }

    return;
    // usePostOrder(url, newOrder, setOrderResponse, router);
  };

  const handleIncreaseProduct = (product) => {
    const action = "add";
    updateCartLocalStorage({ product, action });
    setAddToCartRefresher(!addToCartRefresher);
    // let newCount = count + 1;
    // setCount(newCount);
  };
  const handleDecreseProduct = (product) => {
    const action = "minus";
    updateCartLocalStorage({ product, action });
    setAddToCartRefresher(!addToCartRefresher);
  };

  const handleSaveSizeInLocal = (product, size) => {
    product.userSize = size;
    const action = "size";
    updateCartLocalStorage({ product, action });
    setAddToCartRefresher(!addToCartRefresher);
  };

  useEffect(() => {
    calculateTotalSalePrice(localStorageCartItems?.items);
  }, [localStorageCartItems?.items]);

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

  useEffect(() => {
    if (localStorageCartItems?.items?.length === 0) {
      router.push("/");
    }
  }, [localStorageCartItems?.items]);

  return (
    // <RequireAuth>
    <div className="bg-accent">
      <div className="mid-container">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className=" block md:grid grid-cols-7 justify-center gap-5 py-16">
            <div className="w-full md:col-span-4 bg-primary/20 p-5 md:p-9 rounded-xl shadow h-fit mb-3 md:mb-0 ">
              <h1 className="font-semibold mb-4">
                Fill the form below with correct information to confirm the
                order
              </h1>
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
                    placeholder="your Nmae"
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
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                    placeholder="Mobile Number"
                    {...register("phone", {
                      required: "Phone number is required",
                      minLength: {
                        value: 11,
                        message: "Phone number must be 11 digit.",
                      },
                      maxLength: {
                        value: 11,
                        message: "Phone number must be 11 digit.",
                      },
                      pattern: {
                        value: /^[0-9]{11}$/,
                        message: "Phone number must consist of digits only.",
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
                {/* ----------last name ta comment karon full name jacche ekhon jodi kichu na jay tobe, empnty string jay */}
                {/*  <div className=" p mb-4">
                    <label htmlFor="name" className="leading-7 text-sm ">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="last-name"
                      className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                      placeholder="last Name"
                      {...register("lastName")}
                      onKeyUp={(e) => {
                        trigger("lastName");
                      }}
                    />
                  </div> */}
              </div>
              <div className="grid grid-cols-1 gap-5">
                {/*    <div className=" p mb-4">
                    <label htmlFor="name" className="leading-7 text-sm ">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                      placeholder="Email Address"
                      disabled
                      {...register("email")}
                      onKeyUp={(e) => {
                        trigger("email");
                      }}
                    />
                    <small className="text-[#FF4B2B] text-xs font-medium my-2">
                      {errors?.email?.message}
                    </small>
                  </div> */}
                {/*  <div className=" p mb-4">
                    <label htmlFor="name" className="leading-7 text-sm ">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                      placeholder="Phone Number"
                      {...register("phone", {
                        required: "Phone is required",
                      })}
                      onKeyUp={(e) => {
                        trigger("phone");
                      }}
                    />
                    <small className="text-[#FF4B2B] text-xs font-medium my-2">
                      {errors?.phone?.message}
                    </small>
                  </div> */}
              </div>

              {/* <h1 className="font-semibold my-2">02. Shipping Address</h1> */}
              <div className="w-full my-3">
                <label className="leading-7 text-sm">Select your area</label>
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
                    trigger("address");
                  }}
                />
              </div>

              {/* -----------------thana and postal code coment kora hoyche and er poriborte empty stirng pathanu hoyeche jeno error na dey */}
              {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  <div className=" p mb-4">
                    <label htmlFor="name" className="leading-7 text-sm ">
                      Thana
                    </label>
                    <input
                      type="text"
                      id="thana"
                      name="thana"
                      className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                      placeholder="Khilkhet"
                      {...register("thana", {
                        required: "thana Name is required",
                      })}
                      onKeyUp={(e) => {
                        trigger("thana");
                      }}
                    />
                    <small className="text-[#FF4B2B] text-xs font-medium my-2">
                      {errors?.thana?.message}
                    </small>
                  </div>
                  <div className=" p mb-4">
                    <label htmlFor="name" className="leading-7 text-sm ">
                      ZIP / Postal
                    </label>
                    <input
                      type="text"
                      id="postal"
                      name="postal"
                      className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                      placeholder="2345"
                      {...register("postal", {
                        required: "ZIP/ Postal is required",
                      })}
                      onKeyUp={(e) => {
                        trigger("postal");
                      }}
                    />
                    <small className="text-[#FF4B2B] text-xs font-medium my-2">
                      {errors?.postal?.message}
                    </small>
                  </div>
                </div> */}
            </div>

            {/* Cart Product */}
            <div className="w-full md:col-span-3 bg-white rounded-xl shadow p-5 relative">
              {/* {productItem && (
                <p className=" text-white bg-yellow-500 mb-2 text-[14px] py-2 px-3 rounded-md font-bold">
                  প্রডাক্ট এর সাইজ বাটনে ক্লিক করে সাইজ সিলেক্ট করুন |
                </p>
              )} */}
              <h1 className="mb-1 font-semibold title-font">Product List</h1>
              <div className=" overflow-y-scroll max-h-96">
                {localStorageCartItems &&
                  localStorageCartItems?.items?.map((product) => (
                    // row

                    <CheckoutProductItems
                      product={product}
                      handleDecreseProduct={handleDecreseProduct}
                      handleIncreaseProduct={handleIncreaseProduct}
                      sizeIndex={sizeIndex}
                      setProductItem={setProductItem}
                      setIsOpenSizeAndColor={setIsOpenSizeAndColor}
                    />
                  ))}
              </div>

              <div className="mt-14">
                <h1 className="font-semibold border-b-[1px] pb-2 mb-5">
                  Order Summery
                </h1>

                {/* <div className="flex justify-between items-center text-sm mb-2">
                  <h1 className="font-medium">Products Total</h1>
                  <p>৳ {originalPriceTotal}</p>
                </div> */}
                <div className="flex justify-between items-center text-sm mb-2">
                  <h1 className="font-medium">Subtotal</h1>
                  <p className="font-bold">৳ {finalTotal}</p>
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

                <h2 className=" mt-5 font-semibold">Payment Info :</h2>
                <div className="bg-gray-100 py-5 px-5 rounded-md">
                  <div className="flex items-start flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="radio-7"
                        id="1"
                        value="1" // Explicitly set value for Cash on Delivery
                        className="radio radio-info cursor-pointer"
                        defaultChecked
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="1"
                        className="cursor-pointer uppercase text-sm font-semibold"
                      >
                        Cash on Delivery
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="radio-7"
                        id="2"
                        value="2" // Explicitly set value for Payment Method
                        className="radio radio-info"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="2"
                        className="cursor-pointer font-semibold uppercase text-sm"
                      >
                        Payment Method
                      </label>
                    </div>
                  </div>
                  <div>
                    {selectedValue === "2" && (
                      <div>
                        {paymentDetailsLast && (
                          <div className=" text-sm mt-2 font-semibold">
                            <h2>
                              Payment Method : {paymentDetailsLast?.method}
                            </h2>
                            <h2>
                              Payment number : {paymentDetailsLast?.number}
                            </h2>
                            <h2>Payment trxId : {paymentDetailsLast?.trxId}</h2>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 mt-5">
                  {/* <div
                    onClick={() => {
                      router.push("/shop");
                      setQueryFromCategory("");
                    }}
                    className="text-white btn btn-primary border-0 py-2 px-6 focus:outline-none w-full rounded"
                  >
                    Continue Shopping
                  </div> */}

                  <button
                    type="submit"
                    disabled={loading2}
                    className="text-white btn btn-success border-0 py-2 px-6 focus:outline-none w-full rounded hover:bg-green-900"
                  >
                    {loading2 ? "Loading..." : "Confirm Order"}
                  </button>
                </div>
                {/* --------------coupon method ------------------- */}
                <ApplyCoupon setCouponDiscount={setCouponDiscount} />
              </div>
            </div>
          </div>
        </form>
      </div>

      <CustomModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
        <PaymentIndex
          order={order}
          setIsOpen={setIsOpen}
          orderItem="true"
          setPaymentDetailsLast={setPaymentDetailsLast}
        />
      </CustomModal>
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
    // </RequireAuth>
  );
};

export default Checkout;
