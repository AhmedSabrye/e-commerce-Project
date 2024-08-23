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
                            <div className="h-72 flex">
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
                {console.log(data?.data)}
            </Slider>
        </div>
    );
}
