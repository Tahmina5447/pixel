import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NavbarProductCard = ({ product,setSearchEnable, setSearchValue=()=>{} }) => {
    const productView = () => {
        // window.gtag("event", "view_item", {
        //     currency: "BDT",
        //     value: product?.salePrice,
        //     items: [
        //         {
        //             item_id: product?._id,
        //             item_name: product?.name,
        //             price: product?.salePrice,
        //             quantity: 1
        //         }
        //     ]
        // });
    }
    return (
        <>
            <Link
                key={product._id}
                href={`/product/${product?.path}`} 
                onClick={()=>{
                    setSearchEnable(false);
                    setSearchValue(''); 
                }}
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
        </>
    );
};

export default NavbarProductCard;