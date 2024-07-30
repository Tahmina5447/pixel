import Head from "next/head";
import { useState } from "react";
import ProductSection from "../../src/Components/ProductSection/ProductSection";
import server_url from "../../lib/config";
import { useCustomQuery } from "../../src/hooks/useMyShopData";

const fetcher = url => fetch(url).then(res => res.json());

export async function getStaticProps() {
  const [ discountedProductsData] = await Promise.all([
    fetch(`${server_url}/product?status=true&sort=-discount&limit=10`).then(res => res.json())
  ]);

  return {
    props: {
      discountedProducts: discountedProductsData,
    },
    revalidate: 1500
  };
}

export default function Offer({discountedProducts}) {
  const [userInterest, setUserInterest] = useState("");
  const { data: userProducts, isLoading } = useCustomQuery(
    ["products", userInterest],
    `product/user-interested-product?interest=${userInterest}`
  );

  const discountedProductsData = discountedProducts?.data?.products;
  return (
    <>
      <Head>
        <title>Pixels</title>
        <meta name="description" content="Best e-commerce website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className=" mt-4">
        <ProductSection
          heading={"Offer Sale"}
          subtitle={""}
          data={discountedProductsData}
        />
      </div>
    </>
  );
}
