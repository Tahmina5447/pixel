import ImageGallery from "react-image-gallery";
import { BsCheck2 } from "react-icons/bs";
import { MdAddShoppingCart } from "react-icons/md";

import { FaCommentsDollar, FaPiggyBank, FaTruck } from "react-icons/fa";
import BreadCrumb from "../../src/Shared/Breadcrumb";
import Image from "next/image";

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

/**
 * TODO: have to upload two image
 * 1 - Thumbnail image size 150px * 150px
 * 2 - Upload original image size 900w 600h
 */

const ProductDetails = () => {
  // get id from useParams

  return (
    <>
      <div className="mid-container">
        <BreadCrumb />
        <div className="grid grid-cols-12 gap-4">
          <div className="md:col-span-4 col-span-12">
            <ImageGallery
              showPlayButton={false}
              items={images}
              showNav={false}
            />
          </div>
          <div className="md:col-span-5 col-span-12">
            <h1 className="uppercase font-semibold text-2xl">
              Name of product
            </h1>
            <p className="text-sm">Category: Dynamic</p>
            <p className="text-sm mb-10">Model: Dynamic</p>
            <hr /> {/*--------*/}
            <h1 className="uppercase font-semibold text-3xl mt-5">$00.00</h1>
            {/* Product Features */}
            <ul className="my-5">
              <li className="flex gap-2 items-center">
                <BsCheck2 />
                <p>Lorem ipsum dolor sit amet.</p>{" "}
              </li>
              <li className="flex gap-2 items-center">
                <BsCheck2 />
                <p>Adipisicing elit. Incidunt, est.</p>
              </li>
              <li className="flex gap-2 items-center">
                <BsCheck2 />
                <p>Ipsum dolor sit amet consectetur.</p>
              </li>
            </ul>
            <hr /> {/*--------*/}
            <div className="flex my-5">
              <p>Size: </p>
              <span className="mx-2 border-2 px-1 rounded">Small</span>{" "}
              <span className="mx-2 border-2 px-1 rounded">Medium</span>{" "}
              <span className="mx-2 border-2 px-1 rounded"> Large </span>{" "}
              <span className="mx-2 border-2 px-1 rounded">Extra </span>{" "}
              <span className="mx-2 border-2 px-1 rounded">Large</span>
            </div>
            <div className="grid grid-cols-12 mb-5">
              <div className="col-span-6 flex items-center gap-1 justify-center border-2">
                <input
                  type="number"
                  name=""
                  id=""
                  value={0}
                  className="border-none outline-none w-2/4"
                />
                <input
                  type="button"
                  value="-"
                  className="bg-gray-300 w-6 h-6 rounded-full cursor-pointer"
                />
                <input
                  type="button"
                  value="+"
                  className="bg-gray-300 rounded-full h-6 w-6 cursor-pointer"
                />
              </div>
              <div className="bg-primary text-white col-span-6 flex justify-center items-center py-2 rounded hover:bg-secondary hover:text-primary">
                <MdAddShoppingCart size={20} /> <p> ADD TO CART </p>
              </div>
            </div>
          </div>
          <div className="md:col-span-3 col-span-12">
            <div className="border-2 p-3 rounded flex flex-col items-start justify-start">
              <div className="flex items-center gap-3 w-fu border-b-2 py-3">
                <FaTruck className="text-3xl text-gray-700" />
                <div>
                  <h3 className="text-lg font-semibold">
                    Free Shipping & Returns
                  </h3>
                  <p className="text-sm">For all orders over $99</p>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full border-b-2 py-3">
                <FaPiggyBank className="text-3xl text-gray-700" />
                <div>
                  <h3 className="text-lg font-semibold">Secure Payment</h3>
                  <p className="text-sm">We ensure secure payment</p>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full py-3">
                <FaCommentsDollar className="text-3xl text-gray-700" />
                <div>
                  <h3 className="text-lg font-semibold">
                    Money Back Guarantee
                  </h3>
                  <p className="text-sm">Any back within 30 days</p>
                </div>
              </div>
            </div>

            <div className="my-5 relative">
              <Image
                alt="adsImage"
                width={200}
                height={200}
                src="https://api.lorem.space/image/fashion?w=700&h=700"
                className="rounded w-full"
              />
              <div className="absolute text-white bottom-3 left-3">
                <h1 className="text-4xl relative font-extrabold">
                  30%
                  <span className="absolute text-sm">off</span>
                </h1>
                <h3 className="text-2xl">ULTIMATE SALE</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-8 gap-4">
          <div className="md:col-span-6 col-span-12"></div>

          <div className="md:col-span-2 col-span-12">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
              repellendus unde quasi consectetur iste incidunt nemo quam,
              recusandae delectus corrupti fuga at dolorem laudantium ad natus?
              Consectetur asperiores ducimus nisi.
            </p>
          </div>
        </div>
      </div>
      <div className="my-10">
      </div>
    </>
  );
};

export default ProductDetails;
