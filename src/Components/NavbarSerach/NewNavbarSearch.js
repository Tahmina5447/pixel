import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import CreateContext from '../CreateContex';
import { useCustomQuery } from '../../hooks/useMyShopData';
import { setCookie } from '../../hooks/useCustomCookie';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';

const NewNavbarSearch = () => {
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
        setCookie("searchQuery", e.target.search?.value, 7);
        setSearchEnable(false);
        setQueryFromCategory(`search=${searchValue}`);
        router.push(`/shop`);
    };

    const handleIntersProductSave = (product) => {
        setCookie("searchQuery", searchValue, 7);
        setSearchEnable(false);
    };

    return (
        <div className='w-full'>

            <div className=' w-full '>
                <div className="relative  w-full">
                    <div className="overflow-hidden z-0 rounded-full relative p-2">
                        <form onSubmit={handleSearchSubmit} className="relative flex z-50 bg-white rounded-full">
                            <input type="text"
                                placeholder="Search here"
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                    setSearchEnable(true);
                                }}
                                className="rounded-full flex-1 px-2 sm:px-6 py-1 sm:py-3 text-gray-700 focus:outline-none" />
                            <button type="submit" className=" hidden sm:block bg-primary text-white rounded-full font-semibold px-6  hover:bg-indigo-400 focus:bg-indigo-600 focus:outline-none"><span className='hidden sm:block'>Search</span><span className='block sm:hidden'><Icon icon="ion:search-sharp" /></span></button>
                        </form>
                        <div className="glow glow-1 z-10 bg-[#4c2745] absolute"></div>
                        <div className="glow glow-2 z-20 bg-[#4077FF] absolute"></div>
                        <div className="glow glow-3 z-30 bg-[#85D7FC] absolute"></div>
                        <div className="glow glow-4 z-40 bg-primary absolute"></div>
                    </div>
                </div>

            </div>
            {/* search product list */}
            {result?.status === "success" &&
                searchEnable &&
                searchValue.length > 1 && (
                    <div
                        ref={containerRef}
                        className=" max-h-[350px] bg-white border-gray-200 border p-3 rounded-md overflow-y-scroll shadow-xl absolute top-20 z-10 "
                    >
                        {result.data.products.length > 0 ? (
                            result.data.products.slice(0, 10).map((product) => (
                                <Link
                                    key={product._id}
                                    href={`/product/${product?.path}`}
                                    onClick={() => handleIntersProductSave(product)}
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
                                </Link>
                            ))
                        ) : (
                            <div className="text-center uppercase py-8">
                                Product Not found
                            </div>
                        )}
                    </div>
                )}
        </div>

    );
};

export default NewNavbarSearch;