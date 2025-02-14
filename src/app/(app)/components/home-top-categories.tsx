"use client";
import Slider from "react-slick";
import type { Category } from "@/types/types";
import Link from "next/link";

const HomeTopCategories = ({
  categories,
  logo,
}: {
  categories: Category[];
  logo: string;
}) => {
  const maxSlidesToShow = 8; // Max slides on large screens
  const slidesToShow = Math.min(maxSlidesToShow, categories.length);

  const settings = {
    infinite: categories.length >= slidesToShow, // Prevent repeating if not enough items
    dots: false,
    arrows: false,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: categories.length > 1, // Disable autoplay if only one category
    autoplaySpeed: 2000,
    rtl: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: Math.min(7, categories.length) },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: Math.min(5, categories.length) },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: Math.min(7, categories.length) },
      },
      {
        breakpoint: 570,
        settings: { slidesToShow: Math.min(6, categories.length) },
      },
      {
        breakpoint: 500,
        settings: { slidesToShow: Math.min(5, categories.length) },
      },
      {
        breakpoint: 420,
        settings: { slidesToShow: Math.min(4, categories.length) },
      },
      {
        breakpoint: 320,
        settings: { slidesToShow: Math.min(3, categories.length) },
      },
    ],
  };

  return categories.length > 0 ? (
    <div className="container py-12 px-5">
      <Slider {...settings}>
        {categories.map((item) => (
          <Link
            href={`/items?category_id=${item.id}`}
            key={item.id}
            className="w-20 h-20 md:w-24 md:h-24 text-center"
          >
            <img
              src={item.img || logo}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-2 object-cover shadow-sm"
              width="96"
              height="96"
            />
            <p className="text-sm">{item.name}</p>
          </Link>
        ))}
      </Slider>
    </div>
  ) : null;
};

export default HomeTopCategories;
