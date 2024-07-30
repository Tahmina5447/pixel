import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { useQuery } from "react-query";
import server_url from "../../../lib/config";
import { getCategories } from "../../../lib/helper";
import CreateContext from "../../../src/Components/CreateContex";
import getFetchFunction from "../../../lib/getFetchFunction";

const DashboardLayout = dynamic(
  () => import("../../../src/Components/DashboardLayout"),
  {
    loading: () => <p>Loading...</p>,
  }
);
const ProductsTableItemsRow = dynamic(
  () => import("../../../src/Shared/TableItem/ProductsTableItemsRow"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const ExportExcel = dynamic(
  () => import("../../../src/Components/Admin/ExportImport/ExportProducts"),
  {
    loading: () => <p>Loading...</p>,
  }
);
const ReactPaginate = dynamic(() => import("react-paginate"), {
  loading: () => <p>Loading...</p>,
});

const Product = () => {
  const [products, setProducts] = useState([]);
  const { reolder, setReloader } = useContext(CreateContext);
  //-------------------its reloader use for when we delete or update and set !reolder, then depenciy reloded

  // ---------------for pagination-----------------------
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);
  // ---------------for pagination-----------------------

  const productUrl = {
    url: `http://localhost:5000/api/v1/product/?limit=1000&page=1&sort=-createdAt`,
  };

  //---------------------------------------------------------------catgories filter-----------------------------
  const handleFilterWithParantCategory = async (event) => {
    productUrl.url = `http://localhost:5000/api/v1/product/?limit=1000&page=1&category=${event.target.value}`;
    getFetchFunction(productUrl.url, setProducts);
  };

  // ---------------------------------------------------handle sroting L to H & h to L
  const filterWithPrice = (event) => {
    if (event.target.value === "lowStock") {
      const url = `${server_url}/product?sort=quantity`;
      getFetchFunction(url, setProducts);
    }
    if (event.target.value === "highStock") {
      const url = `${server_url}/product?sort=-quantity`;
      getFetchFunction(url, setProducts);

    }
    if (event.target.value === "in-stock") {
      const url = `${server_url}/product?stock=true`;
      getFetchFunction(url, setProducts);
    }
    if (event.target.value === "out-of-sotck") {
      const url = `${server_url}/product?stock=false`;
      getFetchFunction(url, setProducts);
    }
    if (event.target.value === "salePrice" || event.target.value === "-salePrice") {
      const url = `${server_url}/product?sort=${event.target.value}`;
      getFetchFunction(url, setProducts);
    }
    if (event.target.value == "all") {
      const url = `${server_url}/product`;
      getFetchFunction(url, setProducts);
    }


  };

  // --------------------------------------------------------search with product name-------------------
  const handleSearchFilter = (event) => {
    productUrl.url += `&search=${event.target.value}`;
    getFetchFunction(productUrl.url, setProducts);
  };

  useEffect(() => {
    fetch(productUrl?.url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data.products);
      })
      .catch((error) => {
        // Handle errors
        console.error("Fetch error:", error);
      });
  }, [reolder]);

  // -----------------------------------------------------catgories------------------------
  const {
    data: categories,
    isLoading: isLoadingCategory,
    refetch: refetchCategory,
  } = useQuery(["categories"], getCategories);

  /*  if (isLoading) {
    return <p>loading...</p>;
  } */

  // --------------------------for pagination----------------------

  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(products?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, products]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products?.length;
    setItemOffset(newOffset);
  };

  // --------------------------for pagination----------------------
  return (
    <DashboardLayout>
      <div className="">
        <div className="flex items-baseline gap-5">
          <h1 className="font-semibold mt-5 mb-2 text-xl">Products</h1>
          <div>
            <ExportExcel />
          </div>
        </div>

        <div className="p-8 rounded bg-white shadow flex justify-center items-center gap-4 flex-wrap md:flex-nowrap">
          <div className="w-full md:w-[40%]">
            <input
              type="text"
              id="name"
              onChange={handleSearchFilter}
              className="w-full rounded-lg input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
              placeholder="Search by product name"
            />
          </div>
          <div className="w-full md:w-[20%]">
            <select
              onChange={handleFilterWithParantCategory}
              className="select select-bordered w-full  focus:outline-none "
              placeholder="Category"
            >
              <option disabled selected>
                Category
              </option>
              {categories?.data?.result.map((category) => (
                <option value={category?.parentCategory} key={category._id}>
                  {category?.parentCategory}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-[20%]">
            <select
              onChange={filterWithPrice}
              className="select select-bordered  w-full  focus:outline-none"
            >
              <option disabled selected>
                Filter Stock
              </option>
              <option value={"all"} >
                all
              </option>
              <option value={"salePrice"}>Price Low to High</option>
              <option value={"-salePrice"}>Price High to Low</option>
              <option value={"lowStock"}>Low to High stock</option>
              <option value={"highStock"}> High to low stock</option>
              <option value={"in-stock"}> Display in-stock</option>
              <option value={"out-of-sotck"}> Display out-of-stock</option>
            </select>
          </div>
          <Link
            href={"/admin/products/add-product"}
            className="w-full md:w-[20%] inline-block"
          >
            <button className="btn btn-primary font-bold w-full text-white ">
              Add Product
            </button>
          </Link>
        </div>

        <div className="mt-6">
          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th className="bg-[#f3f3f3] text-start">S/N</th>
                  <th className="bg-[#f3f3f3] text-start">SKU</th>
                  <th className="bg-[#f3f3f3] text-start">Product Name</th>
                  <th className="bg-[#f3f3f3] text-start">Category</th>
                  <th className="bg-[#f3f3f3] text-start">Price</th>
                  <th className="bg-[#f3f3f3] text-center">Stock</th>
                  <th className="bg-[#f3f3f3] text-center">Details</th>
                  <th className="bg-[#f3f3f3] text-start">Status</th>
                  <th className="bg-[#f3f3f3] text-start">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((product, index) => (
                  <ProductsTableItemsRow
                    key={product._id}
                    product={product}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
            <div className="flex justify-center">
              {/* paginate */}

              <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                previousLabel="<<"
                renderOnZeroPageCount={null}
                containerClassName="btn-group pagination "
                pageLinkClassName="btn btn-sm bg-white hover:bg-[#5ab1bb]  text-black"
                previousLinkClassName="btn btn-sm bg-white hover:bg-[#5ab1bb]  text-black"
                nextLinkClassName="btn btn-sm bg-white hover:bg-[#5ab1bb]  text-black"
                activeClassName="pagination-active"
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Product;
