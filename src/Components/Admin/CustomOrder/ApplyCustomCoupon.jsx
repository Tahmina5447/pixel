import React, { useContext } from "react";
import { useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import swal from "sweetalert";
import server_url from "../../../../lib/config";


const ApplyCustomCoupon = ({ setCouponDiscount,product, query = {} }) => {
  const [couponCode, setCouponCode] = useState("");
//   const { localStorageCartItems } = useContext(CreateContext);

  const url = `${server_url}/coupons/coupon-verify`;

  const handleApplyCoupon = () => {
    let cartProduct;
    if (query.from === "true") {
      cartProduct = [{ id: query.id, quantity: query.quantity }];
      console.log("hello sdfksjf", query.from, cartProduct);
    } else {
      cartProduct = product.map((it) => {
        const productData = { id: it._id, quantity: it.quantity };
        return productData;
      });
    }

    const data = {
      productIdAndQuantity: cartProduct,
      couponCode,
    };
    

    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          swal("success", data.message, "success");
          setCouponDiscount(data.discount);
        }
        if (data.status === "fail") {
          swal("error", data.message, "error");
        }
      });
  };

  return (
    <div className="my-5">
      <div className="collapse collapse-plus rounded-md">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-base-300 text-black-content font-bold peer-checked:bg-base-300 peer-checked:text-black-content uppercase">
          Apply Coupon
        </div>
        <div className="collapse-content bg-base-300  peer-checked:bg-base-300 ">
          <div className="">
            <div className="form-control">
              <input
                type="text"
                placeholder="Type Coupon Code"
                onChange={(e) => setCouponCode(e.target.value)}
                className="input input-bordered outline-none focus:outline-none max-w-[300px]"
              />
            </div>
            <span
              onClick={handleApplyCoupon}
              disabled={couponCode.length < 3}
              className="btn btn-sm btn-primary gap-2 mt-3"
            >
              Apply Now
              <FaRegPaperPlane />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyCustomCoupon;
