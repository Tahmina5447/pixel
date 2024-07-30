import Link from "next/link";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import LoadingComponets from "../../Shared/LoadingComponets";
import ProductCard from "../../Shared/ProductCard";
import { AiFillEye } from "react-icons/ai";
import CreateContext from "../CreateContex";
import { products } from "../../../lib/helper";
import CustomProductSectionSkeleton from "../CustomSkeleton/CustomProductSectionSkeleton"
const ReletedSection = ({
    query,
    heading,
    subtitle = "",
    viewQuery,
    sliceItem = 10,
}) => {
    const [queryFilter, setQuery] = useState(query);
    const { queryFromCategory, setQueryFromCategory } = useContext(CreateContext);
    const { data, isLoading, refetch } = useQuery(["products", queryFilter], () =>
        products(queryFilter)
    );



    return (
        <>
            <div className=" md:py-10 ">
                <div className="">
                    <div className="md:mb-7 mb-[-30px] mx-auto md:w-[600px]">
                        <div className="text-center mb-10">
                            <p className="text-text-xl md:text-[28px] capitalize avenir">
                                {heading}
                            </p>
                            <p className=" text-neutral">{subtitle}</p>
                        </div>
                    </div>
                    {!isLoading ? (
                        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-1 md:gap-3 lg:gap-5">
                            {data?.data?.products.slice(0, sliceItem)?.map((item) => (
                                <div className="flex justify-center">
<ProductCard key={item._id} product={item}></ProductCard>
                                </div>
                                
                            ))}
                        </div>
                    ) : (
                        <CustomProductSectionSkeleton />
                    )}
                </div>
                <div className="text-center mt-10 mb-2">
              
                    <Link
                        onClick={() => setQueryFromCategory(viewQuery)}
                        href={"/shop"}
                        className="inline-block py-1 text-[10px] md:text-normal bg-white  border-b border-primary text-primary duration-150  avenir2"
                    >
                        VIEW ALL
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ReletedSection;
