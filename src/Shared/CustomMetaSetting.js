import Head from 'next/head';
import React from 'react';

const CustomMetaSetting = ({
    productTitle,
    productUrl,
    description,
    imageUrl
}) => {

    return (
        <>
            <title>{productTitle}</title>

            <meta name="og:title" content={productTitle} />
            <meta name="og:type" content="product" />
            <meta name="og:description" content={productTitle} />
            <meta name="og:image" content={imageUrl} />

            {/* <meta name="og:url" content="https://www.daraz.com.bd/products/15-pcsset-crystal-flower-leaves-hollow-lotus-gem-ring-set-ring-for-girls-ring-couple-ring-i221168699-s1168130579.html/" />
            <meta name="og:title" content="15 Pcs/set  Crystal Flower Leaves Hollow Lotus Gem  Ring Set - Ring For Girls - Ring - Couple Ring" />
            <meta name="og:type" content="product" />
            <meta name="og:description" content="25% OFF For New Users! - Buy 15 Pcs/set  Crystal Flower Leaves Hollow Lotus Gem  Ring Set - Ring For Girls - Ring - Couple Ring at lowest prices in Bangladesh. Express Home Delivery in Dhaka, CTG & Countrywide" />
            <meta name="og:image" content="https://static-01.daraz.com.bd/p/mdc/a67fb0a8fda6f303dc04de90da52965a.jpg" /> */}

        </>
    );
};

export default CustomMetaSetting;