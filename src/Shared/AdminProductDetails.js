import React, { useContext, useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

import { FaCommentsDollar, FaPiggyBank, FaTruck } from "react-icons/fa";
import RatingReview from "../../src/Shared/RatingReview";
import Descriptions from "../../src/Components/ProductsDetails/Descriptions/Descriptions";
import RelatedProduct from "../../src/Components/ProductsDetails/RelatedProduct/RelatedProduct";
import StarRating from "./StarRating";
import Image from "next/image";
import { calculateDiscount } from "../../lib/claculateDiscount";
const images = [
  {
    original: "https://api.lorem.space/image/shoes?w=720&h=720",
    thumbnail: "https://api.lorem.space/image/shoes?w=150&h=150",
  },
  {
    original: "https://api.lorem.space/image/watch?w=720&h=720",
    thumbnail: "https://api.lorem.space/image/watch?w=150&h=150",
  },
  {
    original: "https://api.lorem.space/image/burger?w=720&h=720",
    thumbnail: "https://api.lorem.space/image/burger?w=150&h=150",
  },
];

const AdminProductDetails = ({ product }) => {
  const [rating, setRating] = useState();


  const {
    name,
    brand,
    salePrice,
    productPrice,
    discount,
    description,
    imageURLs,
    size,
  } = product || {};
  const productImage = imageURLs && imageURLs[0]
  const discountPrice = calculateDiscount(product?.productPrice, product?.salePrice)
  return (
    <div>
      <div className=" w-full h-[80vh] md:h-[60vh] overflow-y-scroll">
        <div className="flex gap-5 bg-white shadow-sm mb-5 mt-2 sm:p-5 rounded-xl">
          <div className="w-[400px]">
            <Image
              src={productImage}
              width={300}
              height={300}
              className="w-full"
              alt="product image"
            />
          </div>
          <div className="w-2/3">
            <h1 className=" font-semibold text-2xl">{name}</h1>
            {/* <p className="text-sm">SKU <span className='text-[17px]'>:</span> {product?.sku}</p> */}
            {product.ratingValue && (
              <StarRating
                SetRatingValue={setRating}
                ratingValue={product.product?.ratingValue}
                disabled={true}
              />
            )}
            <p className="text-sm mb-2">
              Category <span className="text-[17px]">:</span> {product?.category}
            </p>
            <p className="text-sm mb-2">
              First Child Category <span className="text-[17px]">:</span>{" "}
              {product?.first_child_category}
            </p>
            <p className="text-sm mb-2">
              Second Child Category: {product?.second_child_category?.map((child,index)=><span key={index} className="text-[17px] mr-1">{child},</span>)} 
              
            </p>
            <hr />

            <h1 className="uppercase font-semibold text-red-600 text-3xl mt-5">
              {salePrice} ৳
            </h1>

            <div className="flex item-center gap-2 mt-1 mb-5">
              <p className="text-sm text-gray-500 line-through mt-[2px]">
                ৳ {productPrice}
              </p>
              <p>{discountPrice}%</p>
            </div>

            {size?.length >= 1 && (
              <div className="flex mb-5">
                <p>Size: </p>
                {size?.map((item, index) => (
                  <span
                    key={index}
                    className="mx-1 border px-2 rounded cursor-pointer"
                  >
                    {item?.label ? item?.label : item}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: product?.description }}>
          {/* -----------product details----------------- */}
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetails;
