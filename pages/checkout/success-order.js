import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
const SuccessOrder = () => {

  const router = useRouter()

  return (
    // <RequireAuth>
    <div className="my-8">
      <div className=" flex items-center py-10 justify-center flex-col">
        <div>
          <Image
            src={"/assets/success.png"}
            width={500}
            height={500}
            alt="success"
            className="w-[200px] h-full"
          />
        </div>
        <div className=" text-center">
          <h2 className=" text-[40px] font-bold">Your Order create Success</h2>
        </div>
        <div className=" mt-7">
          <button
            onClick={() => router.push("/")}
            className=" bg-primary text-white py-3 px-8 rounded-lg"
          >
            Continue shopping
          </button>
        </div>
      </div>
    </div>
    // </RequireAuth>
  );
};

export default SuccessOrder;
