import React, { Component } from "react";
import Slider from "react-slick";

import img1 from "../../../assets/images/slider-image-1.jpeg";
import img2 from "../../../assets/images/slider-image-2.jpeg";
import img3 from "../../../assets/images/slider-image-3.jpeg";
import img4 from "../../../assets/images/blog-img-1.jpeg";
import img5 from "../../../assets/images/blog-img-2.jpeg";

function SwipeToSlide() {
    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 1,
        arrows: false,
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
        <div className="flex h-[600px] my-12 overflow-hidden">
            <div className="w-2/3 slider-container">
                <Slider {...settings}>
                    <div className="h-full">
                        <img
                            src={img1}
                            className="h-full object-cover w-full"
                            alt=""
                        />
                    </div>
                    <div className="h-full">
                        <img
                            src={img2}
                            className="h-full object-cover w-full"
                            alt=""
                        />
                    </div>
                    <div className="h-full">
                        <img
                            src={img3}
                            className="h-full w-full object-cover"
                            alt=""
                        />
                    </div>
                </Slider>
            </div>
            <div className="w-1/3">
                <div className="h-1/2  img-container">
                    <img src={img4} className="h-full object-cover" alt="" />
                </div>
                <div className="h-1/2 img-container">
                    <img src={img5} className="h-full object-cover" alt="" />
                </div>
            </div>
        </div>
    );
}

export default SwipeToSlide;
