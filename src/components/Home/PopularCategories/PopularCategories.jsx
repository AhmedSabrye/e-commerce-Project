import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function PopularCategories() {
    const [allCategories, setAllCategories] = useState(null);

    function getCategories() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    }

    const { isError, isLoading, data } = useQuery({
        queryKey: ["Popular Categories"],
        queryFn: getCategories,
    });

    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 8,
        responsive: [
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 1536,
                settings: {
                    slidesToShow: 6,
                },
            },
        ],
        swipeToSlide: true,
        afterChange: function (index) {
            console.log(
                `Slider Changed to: ${
                    index + 1
                }, background: #222; color: #bada55`
            );
        },
    };
    return (
        <div className="slider-container min-h-96">
            <Slider {...settings}>
                {data?.data.data.map((category) => {
                    return (
                        <div className="cursor-pointer" key={category._id}>
                            <div className="h-44 md:h-72 flex">
                                <img
                                    src={category.image}
                                    className=" w-full h-full object-cover"
                                    alt=""
                                />
                            </div>
                            <h2 className="text-center mt-2">
                                {category.name}
                            </h2>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}
