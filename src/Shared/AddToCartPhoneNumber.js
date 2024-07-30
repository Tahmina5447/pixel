import React from "react";
import { useForm } from "react-hook-form";
import { reactLocalStorage } from "reactjs-localstorage";

const AddToCartPhoneNumber = ({
  setGetPhnNumber,
  setPhnNumberModal,
  product,
  handleAddToCart,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const handlePhone = (data) => {
    const phoneNumber = data?.phone;
    setGetPhnNumber(phoneNumber);
    reactLocalStorage.setObject("phone-number", phoneNumber); // Store the phone number as a JSON string
    setPhnNumberModal(false);
    handleAddToCart(product);
  };
  return (
    <div className="">
      <h1 className="text-lg md:text-xl font-bold text-primary py-4">
        Provide your phone number to add product to cart
      </h1>
      <form onSubmit={handleSubmit(handlePhone)}>
        <div className="">
          <input
            type="text"
            id="phone"
            name="phone"
            className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
            placeholder="Enter your phone number"
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
            })}
            onKeyUp={(e) => {
              trigger("phone");
            }}
          />
          <small className="text-[#FF4B2B] text-xs font-medium my-2">
            {errors?.phone?.message}
          </small>
        </div>
        <button
          type="submit"
          className="text-white mt-3 bg-primary rounded px-3 py-1 font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddToCartPhoneNumber;
