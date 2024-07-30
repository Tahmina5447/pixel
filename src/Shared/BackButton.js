import { useRouter } from "next/router";
import React from "react";
import { MdArrowBack } from "react-icons/md";

const BackButton = () => {
  const router = useRouter();
  function handleBackClick() {
    router.back();
  }

  return (
    <span
      onClick={handleBackClick}
      className="flex items-center duration-150 gap-1 btn-primary text-white btn-sm cursor-pointer justify-center w-20 rounded-md font-bold"
    >
      <span className="flex items-center font-bold">
        <MdArrowBack className="" />
        Back
      </span>
    </span>
  );
};

export default BackButton;
