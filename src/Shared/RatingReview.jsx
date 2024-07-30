import React from "react";

const RatingReview = () => {
  return (
    <div className="flex justify-start items-center gap-1">
      <div className="rating rating-xs ">
        <input
          type="radio"
          name="rating-1"
          className="mask mask-star-2 bg-orange-400"
        />
        <input
          type="radio"
          name="rating-2"
          className="mask mask-star-2 bg-orange-400"
        />
        <input
          type="radio"
          name="rating-3"
          className="mask mask-star-2 bg-orange-400"
        />
        <input
          type="radio"
          name="rating-4"
          className="mask mask-star-2 bg-orange-400"
        />
        <input
          type="radio"
          name="rating-5"
          className="mask mask-star-2 bg-orange-400"
          defaultChecked
        />
      </div>
      <p className="text-gray-500 text-sm mt-1">3 Ratings</p>
    </div>
  );
};

export default RatingReview;
