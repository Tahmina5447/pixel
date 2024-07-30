import React, { useRef } from "react";
import MagazineCard from './MagazineCard';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper';
import { Icon } from "@iconify/react/dist/iconify.js";

const Magazine = ({ data }) => {
  const magazines = data?.data?.result;
  const newmagazinesData = [...magazines].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const swiperRef = useRef(null);
  // console.log("---------------------",magazines)
  // console.log(newmagazinesData)

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  return (
    <div className='py-3'>
      <div className=' relative'>
        <div className="text-center  pb-2 md:pb-4 lg:pb-10">
          <h1 className="text-text-xl md:text-[28px] capitalize  mb-1 avenir">
            Blog
          </h1>
          <div className="text-center">
            <Link
              href={"/magazine"}
              className="inline-block py-1  text-[10px] md:text-normal bg-white  border-b border-primary text-primary duration-150  avenir2"
            >
              VIEW ALL
            </Link>
          </div>
        </div>
        {newmagazinesData?.length>3&& <div className=" z-50 select-none  ">
          <div
            className=" text-lg md:text-2xl font-bold  text-primary  cursor-pointer absolute  left-[33%] lg:left-[41.5%] top-0.5 md:top-2.5"
            onClick={goPrev}
          >
            {/* <LeftOutlined /> */}
            <Icon icon="fe:arrow-left" />
          </div>
          <div
            className="text-lg md:text-2xl font-bold  text-primary  cursor-pointer absolute  right-[33%] lg:right-[41.5%] top-0.5 md:top-2.5"
            onClick={goNext}
          >
           <Icon icon="fe:arrow-right" />
          </div>
        </div>}
       
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          breakpoints={{
            '@.25': {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            '@.50': {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            '@1.00': {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            '@1.50': {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            '@1.75': {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            '@2.25': {
              slidesPerView: 3,
              spaceBetween: 20,
            }
          }}
          modules={[Navigation]}
          navigation={{ nextEl: ".next-button", prevEl: ".prev-button" }} // This connects your custom buttons
          className="mySwiper"
          ref={swiperRef}
        >
          {newmagazinesData?.length > 0 && <>
            {newmagazinesData?.map((magazine, index) => {
              return (
                <SwiperSlide key={index} className="">
                  <MagazineCard key={index} data={magazine} />
                </SwiperSlide>
              );
            })}
          </>}

        </Swiper>

      </div>
    </div>
  );
};

export default Magazine;