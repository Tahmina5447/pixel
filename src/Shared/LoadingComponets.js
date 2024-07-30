import React from "react";

const LoadingComponets = () => {
  const sytle = {
    top: "50%",
    left: "50%",
    transform: " translate(-50%, 0)",
  };

  return (
    <div className="relative h-[30vh] w-full ">
      <div className="loaderRectangle absolute " style={sytle}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingComponets;
