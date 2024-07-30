import React, { useState } from "react";

function StarRating({ SetRatingValue, ratingValue = 0, disabled = false }) {
  function handleRatingChange(event) {
    SetRatingValue(parseInt(event.target.value));
  }

  return (
    <div className="rating">
      <input
        type="radio"
        name="rating"
        className="mask mask-star-2 bg-orange-400"
        value="1"
        checked={ratingValue === 1}
        onChange={handleRatingChange}
        disabled={disabled}
      />
      <input
        type="radio"
        name="rating"
        className="mask mask-star-2 bg-orange-400"
        value="2"
        checked={ratingValue === 2}
        onChange={handleRatingChange}
        disabled={disabled}
      />
      <input
        type="radio"
        name="rating"
        className="mask mask-star-2 bg-orange-400"
        value="3"
        checked={ratingValue === 3}
        onChange={handleRatingChange}
        disabled={disabled}
      />
      <input
        type="radio"
        name="rating"
        className="mask mask-star-2 bg-orange-400"
        value="4"
        checked={ratingValue === 4}
        onChange={handleRatingChange}
        disabled={disabled}
      />
      <input
        type="radio"
        name="rating"
        className="mask mask-star-2 bg-orange-400"
        value="5"
        checked={ratingValue === 5}
        onChange={handleRatingChange}
        disabled={disabled}
      />
      {!disabled && <p>You selected {ratingValue} star.</p>}
    </div>
  );
}

export default StarRating;
