import { Icon } from "@iconify/react";
import React from "react";

const WhatsAppButton = ({
  productQuantity,
  productUrl,
  productName,
  productPrice,
  number,
}) => {
  const productDetails = {
    name: productName,
    price: productPrice,
    url: productUrl,
  };

  const whatsappMessage = `Hello,

I am interested in this product:
${productDetails.name}

You can view it here: ${productDetails.url}

Price: ${productDetails.price}৳

Thank you!`;

  const whatsappLink = `https://wa.me/+88${number}/?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  console.log("WhatsApp Link: ", whatsappLink); // Debug log

  return (
    <>
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <button
          title={productQuantity < 1 ? "Out of Stock" : "WhatsApp Order"}
          className="flex gap-1 items-center btn bg-[#934682] hover:bg-[#934682] w-full text-base-100 font-bold  rounded"
          disabled={productQuantity < 1}
        >
          <Icon
            icon="logos:whatsapp-icon"
            className="text-white text-sm md:text-[18px]"
          />
          WhatsApp
        </button>
      </a>
    </>
  );
};

export default WhatsAppButton;
