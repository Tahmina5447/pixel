import Head from "next/head";
import { useState } from "react";
import useSWR from 'swr';
import server_url, { server_url_v3 } from "../lib/config";
import Banner from "../src/Components/Home/Banner/Banner";
import Category from "../src/Components/Home/Category/Category";
import PopularProducts from "../src/Components/Home/PopularProducts/PopularProducts";
import ProductSection from "../src/Components/ProductSection/ProductSection";
import ScrollButtons from "../src/Shared/ScrollButton/ScrollButtons";
import { useCustomQuery } from "../src/hooks/useMyShopData";
import GoogleMap from "../src/Shared/GoogleMap";
import Magazine from "../src/Components/MagazineSection/Magazine";

const fetcher = url => fetch(url).then(res => res.json());

export async function getStaticProps() {
  const [bannerData, categoryData, productsData, discountedProductsData, newArrival,featuredData,blogData] = await Promise.all([
    fetch(`${server_url}/banner?status=active&sort=position`).then(res => res.json()),
    fetch(`${server_url}/category?status=true`).then(res => res.json()),
    fetch(`${server_url}/product?status=true`).then(res => res.json()),
    fetch(`${server_url}/product?status=true&sort=-discount&limit=10`).then(res => res.json()),
    fetch(`${server_url}/product?status=true&sort=-createdAt&limit=10`).then(res => res.json()),
    fetch(`${server_url}/product?status=true&category=Featured`).then(res => res.json()),
    fetch(`${server_url_v3}/custom?modelName=Blog`).then(res => res.json()),
  ]);

  return {
    props: {
      banners: bannerData,
      category: categoryData,
      products: productsData,
      discountedProducts: discountedProductsData,
      newArrival: newArrival,
      featuredData:featuredData,
      blogData:blogData,
    },
    revalidate: 1500
  };
}

export default function Home({ banners, category, products, discountedProducts, newArrival,featuredData,blogData }) {
  const [userInterest, setUserInterest] = useState("");
  const { data: userProducts, isLoading } = useCustomQuery(
    ["products", userInterest],
    `product/user-interested-product?interest=${userInterest}`
  );




  const bannerData = banners;
  const categoryData = category;
  const productsData = products;
  const featured = featuredData?.data?.products;
  const discountedProductsData = discountedProducts?.data?.products;
  const newArrivalProducts = newArrival?.data?.products;
  const blogs = blogData;
  
  // const newArrivals = [...newArrivalProducts].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
 

  return (
    <>
      <Head>
        <title>Pixels</title>
        <meta name="description" content="Best e-commerce website" />
        <link rel="icon" href="/favicon.ico" />

        {/* <script>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'GTM-NZS2HHNK');
         `}
        </script> */}
      </Head>
      <Banner data={bannerData} catagories={categoryData} />
      <Category catagories={categoryData} />

      <ProductSection
        heading={"New Drops"}
        subtitle={
          ""
        }
        data={newArrivalProducts}
      />

      <div className="">
        <ProductSection
          heading={"Bestselling"}
          subtitle={""}
          data={discountedProductsData}
        />
      </div>
      {featured?.length > 0 && <div className="">
        <ProductSection
          heading={"Featured"}
          subtitle={""}
          data={featured}
        />
      </div>}

      <Magazine data={blogs} />
      <GoogleMap />

    </>
  );
}
