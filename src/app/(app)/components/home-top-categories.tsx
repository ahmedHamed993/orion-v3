'use client'
import Slider from 'react-slick';
import type { Category } from '@/types/types';
import Link from 'next/link';
const HomeTopCategories = ({categories, logo}:{categories:Category[], logo:string}) => {
    const settings = {
        navigator:false,
        infinite: true,
        dots:false,
        arrows:false,
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        rtl: true,
        swipeToSlide:true,
        responsive: [
            {
                breakpoint: 1280, 
                settings: {
                    slidesToShow: 7,
                },
            },
            {
                breakpoint: 1024, // For screens below 1200px
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 768, // For screens below 992px
                settings: {
                    slidesToShow: 7,
                },
            },
            {
                breakpoint: 570, // For screens below 992px
                settings: {
                    slidesToShow: 6,
                },
            },
            {
                breakpoint: 500, // For screens below 992px
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 420, // For screens below 992px
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 320, // For screens below 992px
                settings: {
                    slidesToShow: 3,
                },
            },
        ],
      };
  return categories?.length > 0 ? (
    <div className='container py-12 px-5'>
        <Slider {...settings} className=''>
            {categories?.map(item => {
                return (
                    <Link href={`/items?category_id=${item?.id}`} key={item?.id} className='w-20 h-20 md:w-24 md:h-24 text-center'>
                        <img src={item?.img || logo} className='w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-2 object-cover shadow-sm' width="96px" height="96px" />
                        <p className='text-sm'>{item?.name}</p>
                    </Link>
                )
            })}
        </Slider>
    </div>
  ) : <></>
}

export default HomeTopCategories