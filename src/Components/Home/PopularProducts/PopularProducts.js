import { useEffect, useState } from "react";
import { MdOutlineUnfoldMore } from "react-icons/md";
import ProductCard from "../../../Shared/ProductCard";
import CustomProductSectionSkeleton from "../../CustomSkeleton/CustomProductSectionSkeleton";
import { useCustomQuery } from "../../../hooks/useMyShopData";

const PopularProducts = () => {


  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);


  const { data, isLoading } = useCustomQuery(
    ["products", limit, page],
    `product/user-interested-product?page=${page}&limit=${limit}`,
    { keepPreviousData: true }
  );



  const [visible, setVisible] = useState(10);


  useEffect(() => {
    if (data?.data) {
      setProducts((prevProducts) => [...prevProducts, ...data.data]);
    }
  }, [data]);

  const showMoreItems = () => {
    setPage((prevPage) => prevPage + 1);
    setLimit(5);
  };

  return (
    <>
      {isLoading ? <CustomProductSectionSkeleton /> :
        <div className="py-1 md:py-10 bg-accent">
          <div className="mid-container">
            <div className="md:mb-7 mb-[-30px] mx-auto md:w-[600px]">
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold capitalize text-[#444]  mt-3 md:mt-8 md:mb-2">
                  Just For You
                </h1>
                <p className=" text-neutral">
                  Find Products Tailored to Your Unique Style and Preferences
                </p>
              </div>
            </div>
            <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
              {products.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          </div>
          {data?.total > products.length && <div className="w-full text-center">
            <button
              onClick={showMoreItems}
              className="bg-primary  px-3 py-2 font-bold mt-5 rounded-md mx-auto flex items-center gap-1 hover:bg-opacity-0 duration-150 text-white hover:text-primary border border-primary"
            >
              <MdOutlineUnfoldMore size={22} />
              Load More
            </button>
            {isFetching && <CustomProductSectionSkeleton />}
          </div>}
        </div>

      }
    </>
  );
};

export default PopularProducts;
