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
    autoplay: true,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    afterChange: function (index) {},
  };
  return (
    <div className="flex md:h-96 h-64 justify-center px-12 mb-10 overflow-hidden ">
      <div className="w-full lg:w-3/5 slider-container">
        <Slider {...settings}>
          <div className="h-full">
            <img
              src={img1}
              className=" object-cover lg:h-[28rem] object-bottom w-full"
              alt=""
            />
          </div>
          <div className="h-full">
            <img
              src={img2}
              className="lg:h-[28rem] object-cover w-full"
              alt=""
            />
          </div>
          <div className="h-full">
            <img
              src={img3}
              className="lg:h-[28rem] w-full object-cover"
              alt=""
            />
          </div>
        </Slider>
      </div>
      <div className="w-2/5 hidden lg:block h-full">
        <div className="h-1/2  img-container">
          <img src={img4} className="h-full w-full object-cover" alt="" />
        </div>
        <div className="h-1/2 img-container">
          <img src={img5} className="h-full w-full object-cover" alt="" />
        </div>
      </div>
    </div>
  );
}

export default SwipeToSlide;
