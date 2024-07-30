import React from "react";

const LoadingRound = () => {
  return (
    <div className=" w-screen h-full fixed flex justify-center items-center bg-opacity-70 bg-white top-0 left-0 z-50">
      <div className="loaderRound "></div>
    </div>
  );
};

export default LoadingRound;
