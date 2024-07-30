import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { server_url_v2 } from '../../../lib/config';
import CheckOut from '../../../src/Components/Admin/LandingPage/CheckOut';
import Features from '../../../src/Components/Admin/LandingPage/Features';
import GalarySection from '../../../src/Components/Admin/LandingPage/GalarySection';
import Header from '../../../src/Components/Admin/LandingPage/Header';

import { useQuery } from "react-query";

const SingleLandingPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data, error, isLoading } = useQuery(
        ['landingPage', id],
        async () => {
            const response = await fetch(`${server_url_v2}/landing-page/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
    );
    const pageData=data?.data
    const transformedItems = pageData?.products?.map(item => ({
        item_id: item._id,
        item_name: item.productTitle,
        price: item.salePrice,
        quantity: item.quantity,
    }));
    useEffect(() => {
        // window.gtag("event", "view_item", {
        //     currency: "BDT",
        //     value: 0,
        //     items: transformedItems
        // });
    }, [])
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

          gtag('config', 'GTM-WHZ7PFP6');
         `}
                </script> */}
            </Head>
            <div className=''>
                <Header data={pageData} />
            </div>
            <div className='mid-container'>
                <GalarySection data={pageData} />
                <Features data={pageData} />
                <CheckOut data={pageData} />
            </div>
        </>
    );
};


export default SingleLandingPage;
