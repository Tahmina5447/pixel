import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import CreateContext from '../../CreateContex';
import { useCustomQuery } from '../../../hooks/useMyShopData';
import { useState } from 'react';
import { useRef } from 'react';
import { setCookie } from "../../../hooks/useCustomCookie"
import swal from 'sweetalert';

const SelectProduct = ({ setGetProductId, setShow, getProductId }) => {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");
    const [searchEnable, setSearchEnable] = useState(false);
    const containerRef = useRef(null);
    const { queryFromCategory, setQueryFromCategory } = useContext(CreateContext);
    //   const [result, setResult] = useState([]);
    const { data: result, loading } = useCustomQuery(
        ["product", searchValue],
        `product?search=${searchValue}`
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setSearchEnable(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [containerRef]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // setCookie("searchQuery", e.target.search.value, 7);
        // setSearchEnable(false);
        // setQueryFromCategory(`search=${searchValue}`);
        // router.push(`/shop`);
        setShow(true)
    };



    const handleIntersProductSave = (product, id) => {
        const isSelected = Boolean(getProductId.find((grpStud) => grpStud._id === product._id))


        if (isSelected) {
            swal("error", "Product already add", "error");
        } else {

            const items = {
                price: product?.productPrice,
                salePrice: product?.salePrice,
                originalPrice: product?.price,
                weight:product?.weight,
                discount: 0,
                _id: product?._id,
                createdAt: new Date().toString(),
                imageUrls: product?.imageURLs,
                image: product.imageURLs[0],
                parent_category: product?.parent_category,
                quantity: 1,
                productTitle: product?.name,
                sku: "",
                userSize: product.variant[0] || "",
                size: product.size,
                variant:product?.variant,
                productColor: product.productColor,
                userColor: product.productColor[0] || "",
                itemTotal: product?.salePrice,
                offer_quantity:product?.offer_quantity,
                offer_discount:product?.offer_discount
            };
            setGetProductId((pre) => [...pre, items]);
        }
        setSearchEnable(false);

    };

    return (
        <div className='p-3 rounded-lg bg-white shadow-md'>
            <p className='font-bold text-sm mb-1'>Select Product</p>
            <div className="navbar-center block lg:flex justify-center items-center w-full relative">
                <div className="form-control w-full">
                    <form
                        onSubmit={handleSearchSubmit}
                        className="input-group input-group-md"
                    >
                        <input
                            type="text"
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                                setSearchEnable(true);
                            }}
                            placeholder="I am looking for...."
                            className="input input-bordered  block w-full h-10"
                            style={{ outline: "none" }}
                            name="search"
                        />
                        <button
                            type="submit"
                            className="btn btn-square btn-sm bg-primary border-none h-10 w-14 text-white"
                        >
                            {/* <AiOutlineSearch className='text-white' size={22} /> */}
                            All
                        </button>
                    </form>
                    {/* search product list */}
                    {result?.status === "success" &&
                        searchEnable &&
                        searchValue.length > 1 && (
                            <div
                                ref={containerRef}
                                className="w-full max-h-[350px] bg-white border-gray-200 border p-3 rounded-md overflow-y-scroll shadow-xl absolute top-10 z-10 left-0 right-0"
                            >
                                {result.data.products.length > 0 ? (
                                    result.data.products.slice(0, 10).map((product) => (
                                        <button
                                            key={product._id}
                                            onClick={() => handleIntersProductSave(product, product?._id)}
                                        >
                                            <div className="flex  gap-2 justify-between mt-2 bg-white hover:shadow-md duration-200 p-1 rounded-md cursor-pointer">
                                                <Image
                                                    width={100}
                                                    height={100}
                                                    src={product.imageURLs[0]}
                                                    alt="product image"
                                                    className="w-[15%] h-16 object-cover rounded-md"
                                                />
                                                <div className="w-[85%] block md:flex justify-between">
                                                    <div className=" text-xs md:text-[17px] leading-5">
                                                        {product.name}
                                                    </div>
                                                    <p className=" text-xs md:text-sm font-bold mt-1">
                                                        {product.salePrice}Tk.
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <div className="text-center uppercase py-8">
                                        Product Not found
                                    </div>
                                )}
                            </div>
                        )}
                </div>
            </div>
        </div>

    );
};
export default SelectProduct;