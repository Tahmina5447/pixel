import React from "react";

const AlreadyProductHave = ({ setIsAlreadyAvailable, isAlreadyAvailable }) => {
  setTimeout(() => {
    setIsAlreadyAvailable(false);
  }, 1000);

  return (
    <div className="toast toast-middle toast-end" style={{ zIndex: "110" }}>
      <div className="alert bg-red-400 font-bold relative">
        <span className="text-xs pr-2 text-white">{isAlreadyAvailable}</span>
        <span
          className="btn btn-square btn-xs bg-transparent border-none text-white absolute top-0 right-0"
          onClick={() => setIsAlreadyAvailable(false)}
        >
          X
        </span>
      </div>
    </div>
  );
};

export default AlreadyProductHave;
