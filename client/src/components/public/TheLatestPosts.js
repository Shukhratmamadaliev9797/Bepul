import React from "react";
import Title from "./Title";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css/pagination";

export default function TheLatestPosts() {
  return (
    <div className="theLatestPosts">
      <div className="theLatestPosts__container">
        <Title
          title="The Latest Posts"
          parag="Discover the latest free items available now, generously offered by people just like you! "
        />
        <Swiper
          slidesPerView={4}
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
          className="theLatestPosts__posts"
        >
          <SwiperSlide className="theLatestPosts__post">
            <img src="/images/free2.jpeg" alt="" />
            <div className="theLatestPosts__post-title">Special Blender</div>
            <div className="theLatestPosts__post-location">
              <i class="fas fa-map-marker-alt"></i> London, Uk
            </div>
            <div className="theLatestPosts__post-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </div>
            <div className="theLatestPosts__post-author">
              Posted by Robert McLean
            </div>
          </SwiperSlide>
          <SwiperSlide className="theLatestPosts__post">
            <img src="/images/free1.webp" alt="" />
            <div className="theLatestPosts__post-title">Special Blender</div>
            <div className="theLatestPosts__post-location">
              <i class="fas fa-map-marker-alt"></i> London, Uk
            </div>
            <div className="theLatestPosts__post-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </div>
            <div className="theLatestPosts__post-author">
              Posted by Robert McLean
            </div>
          </SwiperSlide>
          <SwiperSlide className="theLatestPosts__post">
            <img src="/images/free1.webp" alt="" />
            <div className="theLatestPosts__post-title">Special Blender</div>
            <div className="theLatestPosts__post-location">
              <i class="fas fa-map-marker-alt"></i> London, Uk
            </div>
            <div className="theLatestPosts__post-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </div>
            <div className="theLatestPosts__post-author">
              Posted by Robert McLean
            </div>
          </SwiperSlide>
          <SwiperSlide className="theLatestPosts__post">
            <img src="/images/free1.webp" alt="" />
            <div className="theLatestPosts__post-title">Special Blender</div>
            <div className="theLatestPosts__post-location">
              <i class="fas fa-map-marker-alt"></i> London, Uk
            </div>
            <div className="theLatestPosts__post-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </div>
            <div className="theLatestPosts__post-author">
              Posted by Robert McLean
            </div>
          </SwiperSlide>
          <SwiperSlide className="theLatestPosts__post">
            <img src="/images/free1.webp" alt="" />
            <div className="theLatestPosts__post-title">Special Blender</div>
            <div className="theLatestPosts__post-location">
              <i class="fas fa-map-marker-alt"></i> London, Uk
            </div>
            <div className="theLatestPosts__post-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </div>
            <div className="theLatestPosts__post-author">
              Posted by Robert McLean
            </div>
          </SwiperSlide>
          <SwiperSlide className="theLatestPosts__post">
            <img src="/images/free1.webp" alt="" />
            <div className="theLatestPosts__post-title">Special Blender</div>
            <div className="theLatestPosts__post-location">
              <i class="fas fa-map-marker-alt"></i> London, Uk
            </div>
            <div className="theLatestPosts__post-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </div>
            <div className="theLatestPosts__post-author">
              Posted by Robert McLean
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
