
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "regenerator-runtime/runtime";
import CreateContext from "../src/Components/CreateContex";
import Layout from "../src/Components/Layout";

import "react-quill/dist/quill.snow.css";
import "../styles/globals.css";
import "react-modern-drawer/dist/index.css";
import "chart.js";
import useSiteApiSettingUpdateWithFetch from "../lib/useSiteApiSettingUpdateWithFetch";


const queryClient = new QueryClient();



function MyApp({ Component, pageProps }) {
  const [addToCartRefresher, setAddToCartRefresher] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenWishlist, setIsOpenWishlist] = useState(false);
  const [localStorageCartItems, setlocalStorageCartItems] = useState(0);
  const [localStorageWishlistItems, setlocalStorageWishlistItems] = useState(0);
  const [wishlistRefresher, setWishlistRefresher] = useState(false);
  const [richTextContent, setRichTextContent] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [reolder, setReloader] = useState(false);
  const [editProduct, setEditProduct] = useState({});
  const [queryFromCategory, setQueryFromCategory] = useState("");
  const [buyNowProduct, setBuyNowProduct] = useState("");
  const [orderResponse, setOrderResponse] = useState(null);
  const [siteApiSettingData, setSiteApiSettingData] = useState({});
  const [historyName, setHistoryName] = useState("")
  const [pathoToken, setPathoToken] = useState("")
  const [noticesData, setnoticesData] = useState()
  // const [loading, setLoading] = useState(true);

  const value = {
    addToCartRefresher,
    setAddToCartRefresher,
    isOpen,
    setIsOpen,
    setlocalStorageCartItems,
    localStorageCartItems,
    wishlistRefresher,
    setWishlistRefresher,
    localStorageWishlistItems,
    setlocalStorageWishlistItems,
    isOpenWishlist,
    setIsOpenWishlist,
    richTextContent,
    setRichTextContent,
    user,
    setUser,
    setToken,
    token,
    reolder,
    setReloader,
    editProduct,
    setEditProduct,
    queryFromCategory,
    setQueryFromCategory,
    buyNowProduct,
    setBuyNowProduct,
    orderResponse,
    setOrderResponse,
    historyName,
    setHistoryName,
    siteApiSettingData,
    setSiteApiSettingData,
    pathoToken,
    setPathoToken,
    noticesData,
    setnoticesData
  };

  /* useEffect(() => {
    useSiteApiSettingUpdateWithFetch({}, setSiteApiSettingData)
  }, [])


  const ganaretToken = () => {
    const data = {
      client_id: siteApiSettingData?.data?.pathaoApiBaseUrl,
      client_secret: siteApiSettingData?.data?.pathaoApiAccessToken,
      username: siteApiSettingData?.data?.redxApiBaseUrl,
      password: siteApiSettingData?.data?.redxApiAccessToken,
      grant_type: "password",
    };

    fetch("/api/aladdin/api/v1/issue-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data) {
          setPathoToken(data.access_token)
        } else {
          console.log(data.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    if(siteApiSettingData?.data?.pathaoApiBaseUrl){
      ganaretToken()
    }
  }, [siteApiSettingData]);

  */
  useEffect(() => {
    useSiteApiSettingUpdateWithFetch({}, setSiteApiSettingData)
  }, []);

  const ganaretToken = () => {
    const data = {
      client_id: siteApiSettingData?.data?.pathaoApiBaseUrl,
      client_secret: siteApiSettingData?.data?.pathaoApiAccessToken,
      username: siteApiSettingData?.data?.redxApiBaseUrl,
      password: siteApiSettingData?.data?.redxApiAccessToken,
      grant_type: "password",
    };

    fetch("/api/aladdin/api/v1/issue-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data) {
          setPathoToken(data.access_token);
        } else {
          console.log(data.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (siteApiSettingData?.data?.pathaoApiBaseUrl) {
        ganaretToken();
      }
    }, 10000);

    return () => clearTimeout(timer); // Clear the timer on unmount or before the effect runs again
  }, [siteApiSettingData]);


  return (
    <QueryClientProvider client={queryClient}>
      <CreateContext.Provider value={value}>
        <Layout>
          <Component {...pageProps} />
        </Layout>

      </CreateContext.Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
