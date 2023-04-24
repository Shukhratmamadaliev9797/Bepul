import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css/pagination";

export default function Categories() {
  return (
    <div className="categories">
      <div className="categories__container">
        {" "}
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide className="categories__category">
            <img src="/images/healthcare.png" alt="" />
            <span>Beauty</span>
            <p>
              <span>52</span> ads are posted
            </p>
          </SwiperSlide>
          <SwiperSlide className="categories__category">
            {" "}
            <img src="/images/scholarship.png" alt="" />
            <span>Education</span>
            <p>
              <span>52</span> ads are posted
            </p>
          </SwiperSlide>
          <SwiperSlide className="categories__category">
            {" "}
            <img src="/images/ux.png" alt="" />
            <span>Computers</span>
            <p>
              <span>52</span> ads are posted
            </p>
          </SwiperSlide>
          <SwiperSlide className="categories__category">
            {" "}
            <img src="/images/helmet.png" alt="" />
            <span>Construction</span>
            <p>
              <span>52</span> ads are posted
            </p>
          </SwiperSlide>

          <SwiperSlide className="categories__category">
            {" "}
            <img src="/images/furniture.png" alt="" />
            <span>Furniture</span>
            <p>
              <span>52</span> ads are posted
            </p>
          </SwiperSlide>
          <SwiperSlide className="categories__category">
            {" "}
            <img src="/images/electronics.png" alt="" />
            <span>Electronics</span>
            <p>
              <span>52</span> ads are posted
            </p>
          </SwiperSlide>
          <SwiperSlide className="categories__category">
            {" "}
            <img src="/images/clothes.png" alt="" />
            <span>Clothes</span>
            <p>
              <span>52</span> ads are posted
            </p>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
