import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const FilterByCategoryRow = ({
  categories,
  setQueryFilterPrice,
  queryFilter,
  refetch,
}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
// console.log("--------------main",selectedCategories)

  useEffect(() => {
    getProducts();
  }, [selectedCategories]);

  const handleFilterByCategory = (event) => {
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
      params.append("category", category);
    });
    const url = `${params.toString()}`;
    setQueryFilterPrice(url);
    refetch(["products", url]);
  };

  return (
    <>
      <form className="">
        {/* ------------------category filter */}
        {categories?.data?.result?.map((item) => (
          <label
            key={item?._id}
            className="label justify-start gap-2 cursor-pointer hover:text-primary"
          >
            <input
              onChange={handleFilterByCategory}
              type="checkbox"
              className="checkbox border-2 border-[#777] checkbox-sm rounded-xs checkbox-primary"
              value={item?.parent_category}
              checked={selectedCategories.includes(item?.parent_category)}
            />
            <span className="text-[#777] font-bold text-sm mt-[2px]  capitalize hover:text-primary">
              {item?.parent_category}
            </span>
          </label>
        ))}
      </form>
      <div className=" mt-3 mb-1">
        <button
          onClick={() => setSelectedCategories([])}
          type="button"
          className="text-sm font-bold flex items-center  justify-center w-full gap-1 text-[#39404a] px-3 py-[6px] rounded-md bg-[#e8e8e8] outline-none duration-150 hover:bg-primary hover:text-white"
        >
          <FaTrashAlt />
          <span className="font-bold">Clear</span>
        </button>
      </div>
    </>
  );
};

export default FilterByCategoryRow;
