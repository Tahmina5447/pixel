import { useContext, useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import CreateContext from "../Components/CreateContex";
import setCartInLocalStorage from "../../lib/setCartInLocalStorage";
import AlreadyProductHave from "../Components/Home/PopularProducts/AlreadyProductHave";
import { AiOutlineHeart } from "react-icons/ai";
import setWishlistInLocalStorage from "../../lib/setWishlistInLocalStorage";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import RatingReview from "./RatingReview";
import { Icon } from "@iconify/react";
const ProductCard = ({ product }) => {
  // use for toast
  const [isAlreadyAvailable, setIsAlreadyAvailable] = useState(false);
  const [active, setActive] = useState(0);

  const [mewColor, setMewColor] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newDesign, setNewDesign] = useState("");
  const [newSet, setNewSet] = useState("");
  const [newOther, setNewOther] = useState("");
  const [filterItem, setFilteredItem] = useState();

  const navigate = useRouter();

  const handelActive = () => {
    if (active === product?.imageURLs?.length - 1) {
      setActive(0);
    } else {
      setActive(active + 1);
    }
  };

  const handelActiveRe = () => {
    if (active === 0) {
      setActive(product?.imageURLs?.length - 1);
    } else {
      setActive(active - 1);
    }
  };

  const handleBuyNowButtonClick = () => {
    navigate.push(`/checkout/direct-buy/${product?._id}`);
    // window.gtag("event", "begin_checkout", {
    //   currency: "BDT",
    //   value: product?.salePrice,
    //   items: [
    //     {
    //       item_id: product?._id,
    //       item_name: product?.name,
    //       price: product?.salePrice,
    //       quantity: 1
    //     }
    //   ]
    // });
  };

  const {
    addToCartRefresher,
    setAddToCartRefresher,
    setWishlistRefresher,
    wishlistRefresher,
    setBuyNowProduct,
  } = useContext(CreateContext);

  const handleSetLocalStorage = () => {
    setAddToCartRefresher(!addToCartRefresher);
    const localStorageMessage = setCartInLocalStorage(product,filterItem);

    setIsAlreadyAvailable(false);

    if (localStorageMessage) {
      setIsAlreadyAvailable("Already Added In Cart");
    }
  };

  const handleSetLocalStorageWishlist = () => {
    setWishlistRefresher(!wishlistRefresher);
    const localStorageMessageWishlist = setWishlistInLocalStorage(product);

    setIsAlreadyAvailable(false);

    if (localStorageMessageWishlist) {
      setIsAlreadyAvailable("Already Added In Wishlist");
    }
  };


  const filterVariants = (criteria) => {
    const { size, color, design, other, set } = criteria;

    const result = product?.variant.find(
      (item) =>
        (size ? item.size === size : true) &&
        (color ? item.color === color : true) &&
        (design ? item.design === design : true) &&
        (other ? item.other === other : true) &&
        (set ? item.set === set : true)
    );

    setFilteredItem(result);
  };

  useEffect(() => {
    filterVariants({
      color: mewColor,
      size: newSize,
      set: newSet,
      other: newOther,
      design: newDesign,
    });
  }, [mewColor, newSize, newSet, newOther, newDesign, product]);

  const productView = () => {
    navigate.push(`/product/${product?.path}`);
    // window.gtag("event", "view_item", {
    //   currency: "BDT",
    //   value: product?.salePrice,
    //   items: [
    //     {
    //       item_id: product?._id,
    //       item_name: product?.name,
    //       price: product?.salePrice,
    //       quantity: 1
    //     }
    //   ]

    // });
  };

  const handleAddCartButtonClick = () => {
    // window.gtag('event', 'add_to_cart', {
    //   currency: 'BDT',
    //   value: product?.salePrice,
    //   items: [
    //     {
    //       item_id: product?._id,
    //       item_name: product?.name,
    //       price: product?.salePrice,
    //       quantity: 1
    //     }
    //   ]
    // });
  };

  return (
    <div className="bg-white overflow-hidden group w-[180px] md:w-[200px] lg:w-[280px]">
      <div className="mb-auto overflow-hidden relative">
        {/* ----------------out of stock */}
        {product?.quantity < 1 && <p className="text-center text-white bg-red-600 px-3 md:px-4 py-1 absolute z-50 top-3 left-0 font-semibold text-xs avenir2">OUT OF STOCK</p>}

        {/* ----------------------wishlist + cart for pc */}
        <div className="hidden lg:block">
          {product?.quantity < 1 ? (
            <>
            </>
          ) : (
            <>
              <>
                <button
                  onClick={handleSetLocalStorageWishlist}
                  className=" bg-primary text-white p-2 z-50 flex items-center justify-center absolute  right-[-200px] top-[184px] group group-hover:right-2 duration-150"
                >
                  <Icon className="text-2xl" icon="mage:heart" />
                </button>
                <button
                  onClick={handleSetLocalStorage}
                  className=" bg-primary text-white p-2 z-50  flex items-center justify-center absolute  right-[-200px] top-[232px] group-hover:right-2 duration-300"
                >
                  <Icon className="text-2xl" icon="ant-design:shopping-outlined" />
                </button>
              </>
            </>
          )}
        </div>


        {/* -------------image */}
        <Link
          href={`/product/${product?.path}`}
          className="flex items-center justify-center overflow-hidden relative cursor-pointer "
          onClick={() => {
            productView();
          }}
        >
          <Image
            src={product?.imageURLs[active]}
            alt="product image"
            width={700}
            height={507}
            className="h-[180px] lg:h-[280px] md:h-[200px] md:w-[200px] w-[1800px] lg:w-[280px] duration-500 overflow-hidden object-cover"
          />
        </Link>


        {/* --------------image slide button */}
        {product?.imageURLs?.length > 1 && <>
          <button
            onClick={() => handelActiveRe()}
            className=" bg-white/80 py-2 opacity-0 group-hover:opacity-100 px-2 absolute top-[50%] translate-y-[-50%] shadow-lg left-0"
          >
            <Icon
              icon="icon-park-outline:left"
              className=" text-primary text-[25px]"
            />
          </button>
          <button
            onClick={() => handelActive()}
            className=" bg-white/80 py-2 px-2 absolute top-[50%] opacity-0 group-hover:opacity-100 translate-y-[-50%] right-0"
          >
            <Icon
              icon="icon-park-outline:right"
              className=" text-primary text-[25px]"
            />
          </button></>}

      </div>

      {/* ------------------down section and cart + wishlist (for mobile view) button */}
      <div className=" flex flex-col justify-between">
        <div className="w-full block lg:hidden">
          {product?.quantity < 1 ? (
            <>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1 justify-center w-full">
                <button
                  onClick={handleSetLocalStorageWishlist}
                  className=" bg-primary text-white p-2 w-full flex items-center justify-center"
                >
                  <Icon className="text-2xl" icon="mage:heart" />
                </button>
                <button
                  onClick={handleSetLocalStorage}
                  className=" bg-primary text-white p-2 w-full flex items-center justify-center"
                >
                  <Icon className="text-2xl" icon="ant-design:shopping-outlined" />
                </button>
              </div>
            </>
          )}
        </div>

        <div>
          <div className="px-2 lg:px-12 mt-2">
            <h1
              className="text-[13px] text-center hover:text-primary cursor-pointer duration-150 avenir2"
              onClick={() => {
                productView();
              }}
            >
              {product?.name?.length > 50
                ? product?.name.slice(0, 49) + "..."
                : product?.name}
            </h1>
          </div>

          <div className=" mt-2">
            <p className="text-[15px] text-black text-center avenir2">
              ৳ {product?.salePrice}
            </p>

          </div>
        </div>
      </div>

      <>
        {isAlreadyAvailable && (
          <AlreadyProductHave
            setIsAlreadyAvailable={setIsAlreadyAvailable}
            isAlreadyAvailable={isAlreadyAvailable}
          />
        )}
      </>
    </div>
  );
};

export default ProductCard;
