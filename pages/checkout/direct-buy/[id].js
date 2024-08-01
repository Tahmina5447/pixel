import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import AuthUser from "../../../lib/AuthUser";
import server_url from "../../../lib/config";
import { usePostOrder } from "../../../lib/usePostOrder";
import BDAutoCity from "../../../src/Components/BDAutoCity";
import PaymentIndex from "../../../src/Components/CheckoutPayment/PaymentIndex";
import CheckoutProductItemsDirectBuy from "../../../src/Components/CheckoutProductItems/CheckoutProductItemsDirectBuy";
import SizeAndColorInCheckoutDirectBuy from "../../../src/Components/CheckoutProductItems/SizeAndColorInCheckoutDirectBuy";
import ApplyCoupon from "../../../src/Components/Coupons/ApplyCoupon";
import CreateContext from "../../../src/Components/CreateContex";
import CustomModal from "../../../src/Shared/CustomModal";
import { getTotalItemWeightCharge } from './../../../lib/getTotalItemWeightCharge';
const DirectBuy = () => {
  const router = useRouter();
  const id = router.query.id;
  const { quantity, size, color, set, design, other } = router.query;

  const [product, setProduct] = useState([]);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [inputSize, setInputSize] = useState({});
  const [userColor, setUserColor] = useState("");
  const [size2, setSize2] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState({});
  const [productData, setProductData] = useState({});
  const [selectedCity, setSelectedCity] = useState("");
  const [cityErrorMessage, setCityErrorMessage] = useState(false);
  const [shippingCost, setShippingCost] = useState(120);
  const [originalPriceTotal, setOriginalPriceTotal] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [productId, setProductId] = useState(0);
  const [modalIsOpenSizeAndColor, setIsOpenSizeAndColor] = useState(false);
  const [mewColor, setMewColor] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newDesign, setNewDesign] = useState("");
  const [newSet, setNewSet] = useState("");
  const [newOther, setNewOther] = useState("");
  const [filterItem, setFilteredItem] = useState();

  // when user click in size set product item
  const [productItem, setProductItem] = useState({});
  const [qyt, setQyt] = useState(1);

  const [selectedValue, setSelectedValue] = useState("1");
  const [paymentDetailsLast, setPaymentDetailsLast] = useState();
  const [loading2, setLoading2] = useState(false);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    if (quantity) {
      setQyt(quantity);
    }
  }, [quantity]);

  const {
    buyNowProduct,
    setAddToCartRefresher,
    addToCartRefresher,
    setOrderResponse,
    setQueryFromCategory,
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

  useEffect(() => {
    if (size) {
      setNewSize(size);
    }
    if (color) {
      setMewColor(color);
    }
    if (set) {
      setNewSet(set);
    }
    if (design) {
      setNewDesign(design);
    }
    if (other) {
      setNewOther(other);
    }

    // if(!size && !color && !set && !design && !other){
    //   setIsOpenSizeAndColor(true)
    // }
  }, [size, color, set, design, other]);

  useEffect(() => {
    if (selectedValue === "2") {
      setIsOpen(true);
    }
  }, [selectedValue]);

  // -------------------find product using id----------------
  const productUrl = `${server_url}/product/${id}`;

  useEffect(() => {
    if (
      productData?.variantType &&
      !size &&
      !color &&
      !set &&
      !design &&
      !other
    ) {
      setIsOpenSizeAndColor(true);
    }
  }, [productData, size, color, set, design, other]);

  useEffect(() => {
    setLoading(true);
    if (id) {
      fetch(productUrl)
        .then((res) => res.json())
        .then((data) => {

          console.log("form data", data)
          setProduct({ items: [data?.data] });
          setOriginalPriceTotal(data?.data?.productPrice);
          setCartTotal(data?.data?.salePrice);
          setProductId(data?.data?._id);
          setProductData(data?.data);
          setProductItem(data?.data);
          if (data?.data?.variant) {
            setInputSize(data?.data?.variant[0]);
          }
          if (data?.data?.productColor?.length > 0) {
            setUserColor(data?.data?.productColor[0]);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [id]);
  // cartTotal and originalProductPrice

  useEffect(() => {
    setCouponDiscount(0);
    // setOriginalPriceTotal(inputSize.productPrice * qyt);

    let total;

    if (productData?.variantType) {
      if (qyt >= (Number(filterItem?.offer_quantity) || 0)) {
        total =
          (productData?.variantType
            ? filterItem?.salePrice
            : productData?.salePrice) *
          qyt -
          (Number(filterItem?.offer_discount) * qyt || 0);
      } else {
        total =
          (productData.variantType
            ? filterItem?.salePrice
            : productData?.salePrice) * qyt;
      }
    } else {
      if (qyt >= (Number(productData?.offer_quantity) || 0)) {
        total =
          (productData?.variantType
            ? filterItem?.salePrice
            : productData?.salePrice) *
          qyt -
          (Number(productData?.offer_discount) * qyt || 0);
      } else {
        total =
          (productData?.variantType
            ? filterItem?.salePrice
            : productData?.salePrice) * qyt;
      }
    }

    setCartTotal(total);
  }, [productData, qyt, inputSize, filterItem]);

  useEffect(() => {
    if (filterItem) {
      setMewColor(filterItem.color);
      setNewSize(filterItem.size);
      setNewOther(filterItem.other);
      setNewSet(filterItem.set);
      setNewDesign(filterItem.design);
    }
  }, [filterItem]);

  let productsArr = [];
  if (productData?.name) {
    productsArr = [
      {
        _id: productData?._id,
        productTitle: productData?.name,
        salePrice: productData?.variantType
          ? filterItem?.salePrice
          : productData?.salePrice,
        originalProductPrice: productData?.variantType
          ? filterItem?.productPrice
          : productData?.productPrice,
        quantity: qyt,
        weight:productData?.weight,
        imageURL: productData?.imageURLs[0],
        type: productData?.type,
        variant: filterItem?._id,
        parent_category: productData?.parent_category,
        first_child_category: productData?.first_child_category,
        second_child_category: productData?.second_child_category,
        size: newSize,
        color: mewColor,
        set: newSet,
        design: newDesign,
        other: newOther,
        variantType: productData?.variantType,
        offer_quantity: productData?.variantType
          ? filterItem?.offer_quantity
          : productData?.offer_quantity,
        offer_discount: productData?.variantType
          ? filterItem?.offer_discount
          : productData?.offer_discount,
      },
    ];
  }

const weightCharge=getTotalItemWeightCharge(productsArr)
const shippingCostWithWeightCharge=(Number(shippingCost)+weightCharge)
// console.log("weigh charge-------------------",shippingCostWithWeightCharge)

  const onSubmitForm = async (data) => {
    if (product.items.length < 1) {
      return swal("error", "Product cart is empty!!", "error");
    }
    setCityErrorMessage(false);

    let newOrder = {
      orderItem: [
        {
          product: productData._id,
          name: productData.name,
          price: productData?.variantType
            ? filterItem?.salePrice
            : productData?.salePrice,
          originalProductPrice: productData?.variantType
            ? filterItem?.productPrice
            : productData?.productPrice,
          quantity: qyt,
          imageURL: productData?.imageURLs[0],
          type: productData?.type,
          variant: filterItem?._id,
          category: productData.category,
          size: newSize,
          color: mewColor,
          set: newSet,
          design: newDesign,
          other: newOther,
          variantType: productData?.variantType,
          offer_quantity: productData?.variantType
            ? filterItem.offer_quantity
            : productData?.offer_quantity,
          offer_discount: productData?.variantType
            ? filterItem.offer_discount
            : productData?.offer_discount,
        },
      ],
      user: user?._id,
      orderSource: "Direct Buy",
      shippingPrice: productData?.delivery ? 0 : shippingCostWithWeightCharge,
      totalAmount:
        cartTotal +
        (productData?.delivery ? 0 : shippingCostWithWeightCharge) -
        couponDiscount,
      afterDiscountPrice: cartTotal - couponDiscount,
      originalProductPrice: originalPriceTotal,
      discount: originalPriceTotal - cartTotal + couponDiscount,
      couponDiscount,
      shippingAddress: {
        address: data.address,
        city: selectedCity,
        thana: data.thana || "",
        email: data.email,
        firstName: data.firstName, //frisName mane backend a fullName hisabe jacche, ekhan theke firstName e pathate hobe
        lastName: data.lastName || "",
        phone: data.phone,
        postalCode: data.postal || "",
        note: data?.Note,
      },
    };

    if (selectedValue === "1") {
      newOrder.paymentDetails = {
        method: "cod",
      };
      const url = `${server_url}/order`;
      usePostOrder(url, newOrder, setOrderResponse, router, setLoading2);
    } else {
      newOrder.paymentDetails = { ...paymentDetailsLast };

      console.log(newOrder);

      const url = `${server_url}/order`;
      usePostOrder(url, newOrder, setOrderResponse, router, setLoading2);
    }

    return;
  };

  const handleSaveSizeInLocal = (size) => {
    setInputSize(size);
  };

  const filterVariants = (criteria) => {
    const { size, color, design, other, set } = criteria;

    const result = productData?.variant?.find(
      (item) =>
        (size ? item.size === size : true) &&
        (color ? item.color === color : true) &&
        (design ? item.design === design : true) &&
        (other ? item.other === other : true) &&
        (set ? item.set === set : true)
    );

    setFilteredItem(result);
  };

  useEffect(() => {
    filterVariants({
      color: mewColor,
      size: newSize,
      set: newSet,
      other: newOther,
      design: newDesign,
    });
  }, [mewColor, newSize, newSet, newOther, newDesign, productData]);

  return (
    <>
      <div className="bg-accent">
        <div className="mid-container">
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className=" block md:grid grid-cols-7 justify-center gap-5 py-16">

              {/* old code avboe */}

              <div className="w-full md:col-span-4 bg-primary/20 p-5 md:p-9 rounded-xl shadow h-fit mb-3 md:mb-0 ">
                <h1 className="font-semibold mb-4">
                  Fill the form below with correct information to confirm the
                  order

                </h1>
                <div className="grid grid-cols-1 ">
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
                      placeholder="Enter Your Name"
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

                </div>
                <div className="grid grid-cols-1 gap-5">

                </div>

                {/* <h1 className="font-semibold my-2">02. Shipping Address</h1> */}
                <div className="w-full my-3">
                  <label className="leading-7 text-sm">Select your area</label>
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
                    placeholder="Address"
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


              </div>

              {/* Cart Product */}
              <>
                <div className="w-full md:col-span-3 bg-white rounded-xl shadow p-5 relative">
                  <h1 className="mb-1 font-semibold title-font">
                    Product List
                  </h1>

                  <div className=" overflow-y-scroll max-h-96">
                    {product?.items?.length ? (
                      product?.items?.map((productData) => (
                        // row

                        <CheckoutProductItemsDirectBuy
                          product={productData}
                          handleSaveSizeInLocal={handleSaveSizeInLocal}
                          qyt={qyt}
                          setQyt={setQyt}
                          setIsOpenSizeAndColor={setIsOpenSizeAndColor}
                          inputSize={filterItem}
                          setProductItem={setProductItem}
                          mewColor={mewColor}
                          newSize={newSize}
                          newSet={newSet}
                          newDesign={newDesign}
                          newOrder={newOther}
                          cartTotal={cartTotal}
                        />
                      ))
                    ) : (
                      <div className="w-full h-[100px] my-3 skeleton"></div>
                    )}
                  </div>

                  <div className="mt-14">
                    <h1 className="font-semibold border-b-[1px] pb-2 mb-5">
                      Order Summery
                    </h1>


                    <div className="flex justify-between items-center text-sm mb-2">
                      <h1 className="font-medium">Subtotal</h1>
                      <p className="font-bold">
                        ৳ {product?.items?.length ? cartTotal : "..."}{" "}
                      </p>
                    </div>
                    {couponDiscount > 0 && (
                      <small className="text-green-500 text-end block font-bold">
                        You got Coupon Discount {couponDiscount} TK.
                      </small>
                    )}

                    <div className="flex justify-between items-center  text-sm mb-2">
                      <h1 className="font-medium">Delivery Fee</h1>
                      {productData?.delivery ? (
                        <p className="font-bold">Free</p>
                      ) : (
                        <p className="font-bold">৳{shippingCostWithWeightCharge}</p>
                      )}
                    </div>
                    <div className="flex justify-between items-center  text-sm">
                      <h1 className="font-medium">Total</h1>
                      <p className="text-green-800 font-bold">
                        ৳{" "}
                        {product?.items?.length
                          ? cartTotal +
                          (productData?.delivery ? 0 : shippingCostWithWeightCharge) -
                          couponDiscount
                          : "..."}
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
                                <h2>
                                  Payment trxId : {paymentDetailsLast?.trxId}
                                </h2>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 mt-5">


                      <button
                        type="submit"
                        disabled={loading2}
                        className="text-white btn btn-success border-0 py-2 px-6 focus:outline-none w-full rounded hover:bg-green-900"
                      >
                        {loading2 ? "Loading..." : "Confirm Order"}
                      </button>
                    </div>
                    {/* --------------coupon method ------------------- */}
                    <ApplyCoupon
                      setCouponDiscount={setCouponDiscount}
                      query={{
                        from: "true",
                        id: productId,
                        quantity: qyt,
                      }}
                      product={productsArr}
                    />
                  </div>
                </div>
              </>
            </div>
          </form>
        </div>

        <CustomModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
          <PaymentIndex
            order={order}
            setIsOpen={setIsOpen}
            setPaymentDetailsLast={setPaymentDetailsLast}
          />
        </CustomModal>
        <CustomModal
          modalIsOpen={modalIsOpenSizeAndColor}
          setIsOpen={setIsOpenSizeAndColor}
        >
          {/* -----------this modal for when user change size and color */}
          <SizeAndColorInCheckoutDirectBuy
            product={productItem}
            setIsOpen={setIsOpenSizeAndColor}
            userSizeAndColor={{
              newSize,
              setNewSize,
              mewColor,
              setMewColor,
              newSet,
              setNewSet,
              newDesign,
              setNewDesign,
              newOther,
              setNewOther,
            }}
          />
        </CustomModal>
      </div>
    </>
  );
};

export default DirectBuy;
