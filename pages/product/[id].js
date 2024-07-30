import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { TiInputChecked } from "react-icons/ti";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import setCartInLocalStorageFromPorductDetails from "../../lib/setCartInLocalStorageFromPorductDetails";
import CreateContext from "../../src/Components/CreateContex";
import CustomProductDetailsSkeleton from "../../src/Components/CustomSkeleton/CustomProductDetailsSkeleton";
import AppAds from "../../src/Components/Home/AppAds/AppAds";
import AlreadyProductHave from "../../src/Components/Home/PopularProducts/AlreadyProductHave";
import Descriptions from "../../src/Components/ProductsDetails/Descriptions/Descriptions";
import CustomMetaSetting from "../../src/Shared/CustomMetaSetting";
import StarRating from "../../src/Shared/StarRating";
import WhatsAppButton from "../../src/Shared/WhatsAppButton";

import Head from "next/head";
import Image from "next/image";
import { BsBagPlus, BsCart4, BsTelephoneFill } from "react-icons/bs";
import { FaCopy } from "react-icons/fa";
import { reactLocalStorage } from "reactjs-localstorage";
import swal from "sweetalert";
import { calculateDiscount } from "../../lib/claculateDiscount";
import { imageGat } from "../../lib/imageGanareatFun";
import NewColorPikerHome from "../../src/Components/ProductSection/NewColorPikerHome";
import ReletedSection from "../../src/Components/ProductSection/ReletedSection";
import { useMyShopData } from "../../src/hooks/useMyShopData";
import AddToCartPhoneNumber from "../../src/Shared/AddToCartPhoneNumber";
import CustomModal from "../../src/Shared/CustomModal";
/**
 * TODO: have to upload two image
 * 1 - Thumbnail image size 150px * 150px
 * 2 - Upload original image size 900w 600h
 */

const ProductDetails = () => {
  const [sizeIndex, setSizeIndex] = useState();
  const [inputSize, setInputSize] = useState("");
  const [userProductColor, setUserProductColor] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phnNumberModal, setPhnNumberModal] = useState(false);
  const [getPhnNumber, setGetPhnNumber] = useState();
  const [isAlreadyAvailable, setIsAlreadyAvailable] = useState(false);
  const [seleteVariant, setSeleteVariant] = useState({});
  const [qyt, setQyt] = useState(1);
  const [mewColor, setMewColor] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newDesign, setNewDesign] = useState("");
  const [newSet, setNewSet] = useState("");
  const [newOther, setNewOther] = useState("");
  const [filterItem, setFilteredItem] = useState(null);
  const [mobilePhoneOpen, setMobilePhoneOpen] = useState(false);
  const [imageGallery, setImageGallery] = useState([]);
  const [click, setClick] = useState();
  const [loading, setLoading] = useState(false);
  const [productData2, setProductData2] = useState(null)
  const [product, setProductData] = useState(null)

  const { data: shopData } = useMyShopData();


  const { addToCartRefresher, setAddToCartRefresher, setQueryFromCategory } =
    useContext(CreateContext);

  const handleCopy = (bkashNumber) => {
    navigator.clipboard.writeText(bkashNumber);
    swal("success", "Number Copy", "success");
  };

  const handleSetLocalStorage = () => {
    handleAddToCart(product);
  };




  useEffect(() => {
    const findIndex = (arr, el) => {
      return arr.indexOf(el);
    };

    if (click === "click") {
      const idx = findIndex(imageGallery, filterItem?.image);
      setCurrentIndex(idx);
    }
  }, [click, filterItem]);

  useEffect(() => {
    if (filterItem) {
      setMewColor(filterItem.color);
      setNewSize(filterItem.size);
      setNewOther(filterItem.other);
      setNewSet(filterItem.set);
      setNewDesign(filterItem.design);
    }
  }, [filterItem]);

  const handleAddToCart = (product) => {
    setAddToCartRefresher(!addToCartRefresher);
    const localStorageMessage = setCartInLocalStorageFromPorductDetails(
      product,
      filterItem,
      userProductColor,
      inputSize,
      qyt
    );
    setIsAlreadyAvailable(false);
    if (localStorageMessage) {
      setIsAlreadyAvailable("Added In Cart");
    }
  };

  const isLoading = false;





  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/v1/product/getOne/${id}`);
        const data = await response.json();
        setProductData(data.data);
        setProductData2(data)
        setFilteredItem(data?.data?.variant[0]);
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id]);



  useEffect(() => {
    if (product) {
      setInputSize(productData2?.data?.size[0]);
      setUserProductColor(productData2?.data?.productColor[0]);
      setSeleteVariant(productData2?.data?.variant[0]);
      setCurrentIndex(0);
    }
  }, [product, productData2]);

  const { asPath } = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const handleBuyNowButtonClick = () => {
    // window.gtag("event", "begin_checkout", {
    //   currency: "BDT",
    //   value: product?.salePrice,
    //   items: [
    //     {
    //       item_id: product?._id,
    //       item_name: product?.name,
    //       price: product?.salePrice,
    //       quantity: 1,
    //     },
    //   ],
    // });
  };
  const handleAddCartButtonClick = () => {
    // window.gtag("event", "add_to_cart", {
    //   currency: "BDT",
    //   value: product?.salePrice,
    //   items: [
    //     {
    //       item_id: product?._id,
    //       item_name: product?.name,
    //       price: product?.salePrice,
    //       quantity: 1,
    //     },
    //   ],
    // });
  };

  const handelCategoryParams = (cat) => {
    const params = new URLSearchParams();
    params.append("category", cat);
    const url = `${params.toString()}`;
    return url;
  };

  const discountPrice = calculateDiscount(
    product?.variantType ? filterItem?.productPrice : product?.productPrice,
    product?.variantType
      ? Number(filterItem?.offer_quantity) <= qyt
        ? filterItem?.salePrice - Number(filterItem?.offer_discount)
        : filterItem?.salePrice
      : Number(product?.offer_quantity) <= qyt
        ? product?.salePrice - Number(product?.offer_discount)
        : product?.salePrice
  );

  const filterVariants = (criteria, product) => {
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
    }, product);
  }, [mewColor, newSize, newSet, newOther, newDesign, product]);

  const subtotal =
    Number(product?.offer_quantity) <= qyt
      ? seleteVariant?.salePrice * qyt - Number(product?.offer_discount)
      : seleteVariant?.salePrice * qyt;

  useEffect(() => {
    if (product) {
      const image = imageGat({
        productImage: product?.imageURLs,
        products: product?.variant,
      });
      setImageGallery(image);
    }
  }, [product]);

  const productUrl = `https://www.epocketbd.com/product/${product?.path}`;
  const productTitle = product?.name || "We Are Best E-commerce in Bangladesh";
  const description = product?.description || "Check out this amazing product!";
  const imageUrl = product?.imageURLs && product?.imageURLs[0];

  

  return (
    <>
      <Head>
        <meta property="og:url" content={productUrl} />
        <meta property="og:title" content={productTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="product" />
        <CustomMetaSetting
          productTitle={product?.name}
          productUrl={productUrl}
          description={product?.name}
          imageUrl={product?.imageURLs && product?.imageURLs[0]}
        />
      </Head>

      {!productData2 && <CustomProductDetailsSkeleton />}
      {productData2 && (
        <div className="bg-white py-1">
          <div className="mid-container">
            <div className=" text-black/60 mt-5 text-sm hidden md:block"><Link className="text-black/80 mr-2" href="/">{`Home >`}</Link>{product?.name}</div>
            <div className="overflow-hidden mt-5">
              <div className="grid grid-cols-12 gap-5 md:gap-16 ">
                <div className="md:col-span-6 col-span-12  md:overflow-hidden ">
                  <Carousel
                    selectedItem={currentIndex} // Set the current index
                    onChange={(index) => setCurrentIndex(index)}
                    showArrows={true}
                    showStatus={false}
                    showIndicators={true}
                    autoPlay={false}
                    stopOnHover={true}
                    axis="horizontal"
                    preventMovementUntilSwipeScrollTolerance={true}
                    swipeScrollTolerance={50}
                    className=""
                    emulateTouch={false}
                    showThumbs={true}
                    renderThumbs={() =>
                      imageGallery?.map((image, index) => (
                        <Image
                          key={index}
                          src={image}
                          alt="product details thumbs image"
                          width={100}
                          height={100}
                          className="w-10"
                        />
                      ))
                    }
                  >
                    {imageGallery?.map((url, index) => (
                      <div key={index}>
                        <Image
                          src={url}
                          width={1000}
                          height={700}
                          className="w-full  h-[460px]"
                          alt={"product details page image"}
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
                {product === null ? (
                  <>
                    <CustomProductDetailsSkeleton />
                  </>
                ) : (
                  <>
                    <div className="md:col-span-6 col-span-12">
                      <div className="flex items-center gap-2 mb-2">
                        {/* <Link
                          href={`/category/${product?.category}`}
                          onClick={() =>
                            setQueryFromCategory(
                              handelCategoryParams(product?.category)
                            )
                          }
                        >
                          <span className=" text-[#9234D2] hover:text-black duration-150 ">
                            <TiInputChecked className="text-xl  font-bold inline-block" />
                            <span className="text-sm  font-extrabold">
                              {product?.category}
                            </span>
                          </span>
                        </Link> */}
                        {/* {product?.brand !== "no brand" &&
                          product?.brand !== "Choose Brand" && (
                            <span className="  hover:text-black">
                              <span className="text-sm  font-extrabold">
                                Brand:{" "}
                              </span>
                              <span className="text-sm  font-extrabold">
                                {product?.brand}
                              </span>
                            </span>
                          )} */}
                      </div>

                      <h1 className="text-2xl lg:text-[34px] avenir2 leading-10">
                        {product?.name}
                      </h1>
                      {/* <div className="flex  items-end gap-2">
                        <StarRating
                          ratingValue={product?.ratingValue}
                          disabled={true}
                        />
                        {product?.stock ? (
                          <p className="text-green-600 font-bold mt-1">
                            {" "}
                            In Stock
                          </p>
                        ) : (
                          <p className="text-red-600 font-bold mt-1">
                            Out Of Stock
                          </p>
                        )}
                      </div> */}
                      <div className="my-3 text-normal md:text-lg flex items-center gap-1 text-[15px]">
                        <Icon className="text-[#D4A14C] " icon="subway:star-1" />
                        <Icon className="text-[#D4A14C] " icon="subway:star-1" />
                        <Icon className="text-[#D4A14C] " icon="subway:star-1" />
                        <Icon className="text-[#D4A14C] " icon="subway:star-1" />
                        <Icon className="text-[#D4A14C] " icon="subway:star-1" />
                        <span className="text-xs md:text-sm mt-0 md:mt-1 text-gray-500">{`(5 Reviews)`}</span>
                      </div>

                      {((product?.brand !== "no brand") && (product?.brand !== "Choose Brand")) && <span className="  hover:text-black">
                        <span className="text-sm  font-extrabold">Brand: </span>
                        <span className="text-sm  font-extrabold">
                          {product?.brand}
                        </span>
                      </span>}

                      <p className="text-2xl md:text-4xl text-[gray-300] mt-3 md:mt-5 mb-2 avenir2">
                        ৳{" "}
                        {product?.variantType
                          ? Number(filterItem?.offer_quantity) <= qyt
                            ? filterItem?.salePrice -
                            Number(filterItem?.offer_discount)
                            : filterItem?.salePrice
                          : Number(product?.offer_quantity) <= qyt
                            ? product?.salePrice -
                            Number(product?.offer_discount)
                            : product?.salePrice}
                        .00
                      </p>

                      <NewColorPikerHome
                        title="Colors"
                        productColor={product?.attributes?.colors}
                        setMewColor={setMewColor}
                        newColor={mewColor}
                        click={click}
                        setClick={setClick}
                      />

                      <NewColorPikerHome
                        title="Size"
                        productColor={product?.attributes?.sizes}
                        setMewColor={setNewSize}
                        newColor={newSize}
                        click={click}
                        setClick={setClick}
                      />
                      <NewColorPikerHome
                        title="Design"
                        productColor={product?.attributes?.design}
                        setMewColor={setNewDesign}
                        newColor={newDesign}
                        click={click}
                        setClick={setClick}
                      />
                      <NewColorPikerHome
                        title="Set"
                        productColor={product?.attributes?.set}
                        setMewColor={setNewSet}
                        newColor={newSet}
                        click={click}
                        setClick={setClick}
                      />
                      <NewColorPikerHome
                        title="Other"
                        productColor={product?.attributes?.others}
                        setMewColor={setNewOther}
                        newColor={newOther}
                        click={click}
                        setClick={setClick}
                      />

                      <div className="mt-6 mb-5 flex items-center gap-3">
                        {!product?.stock && (
                          <p className="text-red-600 font-bold mt-1 col-span-2"></p>
                        )}

                        <div className="flex items-center gap-3 ">
                          <div className="flex items-center  justify-start border-gray-300 py-2.5 px-2 border rounded">
                            <label
                              onClick={() => {
                                if (qyt < 2) {
                                  return setQyt(1);
                                } else {
                                  setQyt(qyt - 1);
                                }
                              }}
                              className="btn-xs text-xl cursor-pointer flex items-center"
                            >
                              <Icon
                                icon="ic:outline-minus"
                                className="text-black/60 text-sm "
                              />
                            </label>
                            <div className="px-2.5 text-black/60 ">
                              {qyt}
                            </div>

                            <label
                              onClick={() => setQyt(qyt + 1)}
                              className="btn-xs text-xl cursor-pointer font-bold flex items-center"
                            >
                              <Icon
                                icon="ic:baseline-add"
                                className=" text-black/60 text-sm "
                              />
                            </label>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            handleSetLocalStorage();
                            handleAddCartButtonClick();
                          }}
                          className="rounded-full border border-primary px-6 py-3 md:py-4 w-full hover:bg-primary hover:text-white duration-300"
                          disabled={!product?.stock}
                          title={
                            !product?.stock ? "Out of Stock" : "ADD TO BASKET"
                          }
                        >
                          <h1 className="text-sm md:text-[16px] avenir2">ADD TO BASKET</h1>
                        </button>
                      </div>
                      <Link
                          href={
                            !product?.stock
                              ? "#"
                              : `/checkout/direct-buy/${product?._id
                              }?quantity=${qyt}&size=${newSize ? newSize : ""
                              }&color=${mewColor ? mewColor : ""}&set=${newSet ? newSet : ""
                              }&design=${newDesign ? newDesign : ""}&other=${newOther ? newOther : ""
                              }`
                          }
                        >
                          <button
                            disabled={!product?.stock}
                            title={!product?.stock ? "Out of Stock" : "ORDER NOW"}
                            onClick={handleBuyNowButtonClick}
                            className="border border-primary px-6 py-3 md:py-4 w-full bg-primary text-white "
                          >
                            <h1 className="text-sm md:text-[16px] avenir2">ORDER NOW</h1>
                          </button>
                        </Link>


                    </div>
                  </>
                )}
              </div>
              <div className=" bg-white  mb-10 p-1 md:p-5 rounded-xl">
                <div className="mt-5 md:mt-0">
                  <Descriptions
                    description={product?.description}
                    youtube={product?.youtube}
                    id={product?._id}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mid-container hidden md:block" style={{ padding: 0 }}>
            <div className=" my-8">
              <ReletedSection
                query={`&${handelCategoryParams(product?.category)}`}
                heading={"Related Product"}
                viewQuery={`&${handelCategoryParams(product?.category)}`}
                sliceItem={5}
              />
            </div>
          </div>
        </div>
      )}

      <>
        {isAlreadyAvailable && (
          <AlreadyProductHave
            setIsAlreadyAvailable={setIsAlreadyAvailable}
            isAlreadyAvailable={isAlreadyAvailable}
          />
        )}
      </>

      <CustomModal modalIsOpen={phnNumberModal} setIsOpen={setPhnNumberModal}>
        <AddToCartPhoneNumber
          setPhnNumberModal={setPhnNumberModal}
          setGetPhnNumber={setGetPhnNumber}
          product={product}
          handleAddToCart={handleAddToCart}
        />
      </CustomModal>

      <CustomModal modalIsOpen={mobilePhoneOpen} setIsOpen={setMobilePhoneOpen}>
        <div>
          <h2 className="text-[20px]  font-medium">Call to order :</h2>
          <div className=" flex items-center gap-2">
            <h3 className="text-[22px] font-bold">{shopData?.data?.phone}</h3>
            <FaCopy
              onClick={() => handleCopy("01918282804")}
              className="ml-2 cursor-pointer"
            />
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default ProductDetails;
