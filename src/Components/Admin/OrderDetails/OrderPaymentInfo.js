import React, { useState } from "react";
import CustomModal from "../../../Shared/CustomModal";
import ExtraDiscountOrder from "../../../Shared/ExtraDiscountOrder";
const OrderPaymentInfo = ({ orderInfo, refetch }) => {
  const [show, setShow] = useState(false);
 

 


  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold mb-2">Payment Info</h2>
        <span onClick={() => setShow(!show)} className="btn btn-primary btn-xs text-white">Edit Price</span>
      </div>
      <div className=" font-bold grid gap-2 uppercase text-xs">
        <p className="shadow-sm py-1 px-2 rounded-sm flex justify-between items-center">
          Invoice: <span> #{orderInfo.invoiceNumber}</span>
        </p>
        <div className="shadow-sm py-1 px-2 rounded-sm">
          <p className="flex justify-between items-center">Payment Method:<span>{orderInfo.paymentDetails.method}</span> </p>
          {orderInfo.paymentDetails.method !== "cod" && (
            <>
              <p className="flex justify-between items-center">Acc. No: <span>{orderInfo.paymentDetails.number}</span></p>
              <p className="flex justify-between items-center">TrxID:<span> {orderInfo.paymentDetails.trxId}</span></p>
            </>
          )}
        </div>
        <p className="shadow-sm py-1 px-2 rounded-sm flex justify-between items-center">
          Original Product Price: <span>৳{orderInfo.originalProductPrice}.00</span>
        </p>
        <p className="shadow-sm py-1 px-2 flex justify-between items-center rounded-sm">Coupon Discount: <span> ৳{orderInfo.couponDiscount}.00</span></p>
        <p className={`shadow-sm py-1 px-2 flex justify-between items-center rounded-sm ${orderInfo.extraDiscount>0?"text-success":"text-black"}`}>Extra discount: <span> ৳{orderInfo.extraDiscount}.00</span></p>
        <p className="shadow-sm py-1 px-2 flex justify-between items-center rounded-sm">Total discount: <span> ৳{orderInfo.discount}.00</span></p>
        <p className="shadow-sm py-1 text-success font-extrabold px-2 flex justify-between items-center rounded-sm">Delivery charges: <span> ৳{orderInfo.shippingPrice}.00</span></p>
        <p className="shadow-sm py-1 text-success font-extrabold px-2 flex justify-between items-center rounded-sm">Total Product Price: <span>৳{orderInfo.afterDiscountPrice}.00</span></p>
        <p className="shadow-sm py-1 px-2 rounded-sm font-bold text-xl flex justify-between items-center">Total Amount:<span> ৳{orderInfo.totalAmount}.00</span></p>
      </div>
      <CustomModal modalIsOpen={show} setIsOpen={setShow}>
        <ExtraDiscountOrder orderInfo={orderInfo} refetch={refetch} />
      </CustomModal>
    </div>
  );
};

export default OrderPaymentInfo;
