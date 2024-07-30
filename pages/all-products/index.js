import React, { useState } from "react";
import { useQuery } from "react-query";
import { products } from "../../lib/helper";
import ProductCard from "../../src/Shared/ProductCard";
import CustomPagination from "../../src/Shared/CustomPagination";
import CustomProductSectionSkeleton from "../../src/Components/CustomSkeleton/CustomProductSectionSkeleton";
const Shop = () => {
    const [queryFilterPrice, setQueryFilterPrice] = useState("");
    const [currentItems, setCurrentItems] = useState([]);

    const { data, isLoading, refetch } = useQuery(
        ["products", queryFilterPrice],
        () => products(queryFilterPrice)
    );



    return (
        <div className="bg-white">
            <div className="px-5 md:px-[3rem]">

                {!isLoading ? (
                    <div>
                        <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-3 ">
                            {currentItems?.map((item) => (
                                <ProductCard key={item._id} product={item}></ProductCard>
                            ))}
                        </div>

                        <CustomPagination
                            arrayData={data?.data?.products}
                            setCurrentItems={setCurrentItems}
                            itemsPerPage={16}
                        />
                    </div>
                ) : (
                    <CustomProductSectionSkeleton />
                )}
            </div>
         
        </div>
    );
};

export default Shop;
