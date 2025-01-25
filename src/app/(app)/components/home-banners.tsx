'use client'
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Banner } from '@/types/types';

const HomeBanners = ({banners}:{banners:Banner[]}) => {
    const settings = {
        navigator:false,
        arrows:false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        rtl: true,

      };
  return (
    <div className="container ">
        <Slider {...settings} className=''>
            {banners.map(banner => (
                <div className='bg-slate-400 w-full ' key={banner.id}>
                    <img className='w-full h-full object-cover'  style={{aspectRatio:"21/9"}} src={banner?.img} />
                </div>
            ))}
        </Slider>
    </div>
  )
}

export default HomeBanners