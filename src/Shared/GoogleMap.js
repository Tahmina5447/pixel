import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";

const data = [
  {
    title: "Dhaka Branch",
    address:
      "Shop 10, Ground floor, Grand Plaza Shopping Mall, Moghbazar Wireless, 227 Outer Circular Road, Dhaka",
    phone: "01992636297",
    time: "11 AM - 8:30 PM Everyday",
    brack: "Jummah break at 12.30 - 2.30pm on Friday",
    image: '/assets/dhaka.jpeg',
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9602320647227!2d90.4084487!3d23.7487975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9093c07fd8f%3A0x6ce5aef6e33fec22!2sPixels%20Dhaka!5e0!3m2!1sen!2sbd!4v1711624259388!5m2!1sen!2sbd",
  },
  {
    title: "Khulna Branch",
    address:
      "Shop 23, Baitul Aman Mosque Market, Moylapota Mor, Khulna Sadar, Khulna.",
    phone: "01711371672",
    time: "11 AM - 9 PM (Friday Closed)",
    brack: "",
    image: '/assets/khulna.jpeg',
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.7242144640986!2d89.5573874!3d22.8126807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff91f7a70b23f5%3A0xdcfaa1e9aca2b8df!2sPixels%20Khulna!5e0!3m2!1sen!2sbd!4v1711624323760!5m2!1sen!2sbd",
  },
];

const GoogleMap = () => {
  const [active, setActive] = useState(0);
  const [activeData, setAcriveData] = useState();

  useEffect(() => {
    const find = data.find((item, index) => index === active);
    setAcriveData(find);
  }, [active]);

  // console.log(activeData);

  return (
    <div className="lg:flex items-center ">
      <div className="w-full lg:w-3/12  px-5 md:pl-10 md:pr-5 md:px-0">
        <h1 className=" text-lg md:text-[34px] mb-5  md:leading-[40px] avenir2">
          Visit Our Stationery Shop
        </h1>

        <p className="text-light-text text-[15px]">
          If you love what you see online, why not visit our stationery shop in
          person? You can find us at:
        </p>
        <br />
        <div className=" flex flex-col gap-4">
          {data.map((item, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={` flex items-start gap-3 ${index === active
                ? "border-l-2 border-primary"
                : " border-l-2 border-white"
                }`}
            >
              <div className="w-[10px]">
                <MdLocationOn size={16} className="text-primary" />
              </div>
              <div className=" flex flex-col items-start">
                <h2 className=" font-bold avenir2">{item?.title}:</h2>
                <p className="text-light-text text-start text-sm avenir2">
                  {item?.address}
                </p>
                <p className="text-light-text font-medium mt-2 text-start text-sm avenir2">
                  {item?.time}
                </p>
                {item?.brack && (
                  <p className=" text-gray-500 font-medium mt-0 text-start text-sm avenir2">
                    ({item?.brack})
                  </p>
                )}

                <h3 className=" text-primary font-semibold text-sm mt-2 avenir2">
                  {item?.phone}
                </h3>
              </div>
            </button>
          ))}
        </div>
        <br />
        <p>
          Please note that our store does not carry the full range you see
          online, so if you are looking for something specific, we recommend you
          call or message before travelling, to ensure it is available in store.
        </p>
      </div>
      <div className="w-full lg:w-9/12 lg:flex items-center">
        <div className="w-full lg:my-0 my-4 lg:w-1/2 px-5 lg:px-0">
          <Image
            src={activeData?.image}
            width={1000}
            height={700}
            className="w-full h-[350px] sm:h-[550px] md:h-[600px] lg:h-[700px] object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 h-[250px] lg:h-[700px] ">
          <iframe
            src={activeData?.url}
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[250px] lg:h-[700px]"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;
