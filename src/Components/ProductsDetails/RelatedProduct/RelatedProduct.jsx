import { useQuery } from "react-query";
import { products } from "../../../../lib/helper";
import ProductCard from "../../../Shared/ProductCard";

const RelatedProduct = () => {
  const { data, isLoading, refetch } = useQuery(["products"], products);
  const relatedProducts = data?.data?.products?.slice(0, 6);
  return (
    <>
      <div className=" py-10">
        <div className="mid-container">
          <div className="mb-7 mx-auto md:w-[600px]">
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Related Products</h1>
              <p className=" text-neutral">
                See all our Related products. You can choose your best products
                from this list and get some special offer with free shipping.
              </p>
            </div>
          </div>
          <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5">
            {relatedProducts?.map((item) => (
              <ProductCard key={item._id} product={item}></ProductCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RelatedProduct;
