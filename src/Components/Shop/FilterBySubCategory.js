import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const FilterBySubCategory = ({ categories, setQueryFilter, refetch }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    getProducts();
  }, [selectedCategories]);

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
      params.append("subCategory", category);
    });
    const url = `${params.toString()}`;

    setQueryFilter(url);
    refetch(["products", url]);
  };
  const handleClearFilters = () => {
    setSelectedCategories([]);
  };
  return (
    <>
      <div className="">
        {/* ------------------category filter */}
        {categories?.data?.result?.map((item) => {
          return (
            <>
              {item?.childCategory.map((child, index) => {
                return (
                  <label
                    key={index}
                    className="label justify-start gap-2 cursor-pointer"
                  >
                    <input
                      onChange={handleFilterBySubCategory}
                      type="checkbox"
                      className="checkbox border-2 border-[#777] checkbox-sm rounded-xs checkbox-primary"
                      value={child}
                      checked={selectedCategories.includes(child)}
                    />
                    <span className="text-[#777] font-bold text-sm  capitalize hover:text-primary">
                      {child}
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

export default FilterBySubCategory;
