import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const FilterBySecondChildCategory = ({ categories, setQueryFilter, refetch }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        getProducts();
    }, [selectedCategories]);
    // console.log("sub -------------------",selectedCategories)

    const handleFilterBySubCategory = (event) => {
        const category = event.target.value;
        if (event.target.checked) {
            setSelectedCategories([...selectedCategories, category]);
        } else {
            setSelectedCategories(
                selectedCategories.filter((item) => item !== category)
            );
        }
    };

    const getProducts = async () => {
        const params = new URLSearchParams();
        selectedCategories.forEach((category) => {
            params.append("first_child_category", category);
        });
        const url = `${params.toString()}`;

        setQueryFilter(url);
        refetch(["products", url]);
    };
    const handleClearFilters = () => {
        setSelectedCategories([]);
    };

    const firstChild = categories?.data?.result?.map((child) => child)

    return (
        <>
            <div className="">
                {firstChild?.map((item) => {
                    const secondChild = item?.first_child_Category?.map((child) => child)
                    return (
                        <>
                            {secondChild?.secondChilds?.map((data, index) => {
                                console.log("eeeeeeeeeeeeeeeeee", data)
                                return (
                                    <label
                                        key={index}
                                        className="label justify-start gap-2 cursor-pointer"
                                    >
                                        <input
                                            onChange={handleFilterBySubCategory}
                                            type="checkbox"
                                            className="checkbox border-2 border-[#777] checkbox-sm rounded-xs checkbox-primary"
                                            value={data}
                                            checked={selectedCategories.includes(data)}
                                        />
                                        <span className="text-[#777] font-bold text-sm  capitalize hover:text-primary">
                                            {data}
                                        </span>
                                    </label>
                                );
                            })}
                        </>
                    );
                })}
            </div>
            <div className=" mt-3 mb-1">
                <button
                    onClick={handleClearFilters}
                    type="button"
                    className="text-sm flex items-center justify-center w-full gap-1 text-[#39404a] px-3 py-[6px] rounded-md bg-[#e8e8e8] outline-none duration-150 hover:bg-primary hover:text-white"
                >
                    <FaTrashAlt />
                    <span className="font-bold">Clear</span>
                </button>
            </div>
        </>
    );
};

export default FilterBySecondChildCategory;
