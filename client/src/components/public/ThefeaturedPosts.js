import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { Navigation } from "swiper";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { listPosts, listUrgentPosts } from "../../actions/postActions";
import Loader from "../general/Loader";
import { Message } from "rsuite";
import { Link } from "react-router-dom";

export default function ThefeaturedPosts() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [nextActive, setNextActive] = useState(true);
  const [prevActive, setPrevActive] = useState(false);

  const nextActiveHandler = () => {
    if (prevActive) {
      setPrevActive(false);
      setNextActive(true);
    }
  };
  const prevActiveHandler = () => {
    if (nextActive) {
      setNextActive(false);
      setPrevActive(true);
    }
  };

  const dispatch = useDispatch();

  const postUrgent = useSelector((state) => state.postUrgent);
  const { loading: listLoading, error: listError, postLists } = postUrgent;

  useEffect(() => {
    dispatch(listUrgentPosts());
  }, [dispatch]);

  return (
    <div className="TheFuturedPosts">
      <div className="TheFuturedPosts__container">
        <div className="theLatestPosts__title">
          <div>
            <h1>
              <span>The</span> Futured Posts
            </h1>
          </div>
          <div className="theLatestPosts__swiperNavigation">
            <div
              className={`theLatestPosts__swiperNavigation-button ${prevActive ? "theLatestPosts__swiperNavigation-active" : ""
                }`}
              ref={prevRef}
              onClick={prevActiveHandler}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </div>
            <div
              className={`theLatestPosts__swiperNavigation-button ${nextActive ? "theLatestPosts__swiperNavigation-active" : ""
                }`}
              ref={nextRef}
              onClick={nextActiveHandler}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
        </div>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          className="TheFuturedPosts__posts"
        >
          {listLoading ? (
            <Loader />
          ) : listError ? (
            <Message showIcon type="error" header="Error">
              {listError}
            </Message>
          ) : (
            postLists.map((post) => {
              return (
                <SwiperSlide className="TheFuturedPosts__post">
                  <Link to={`/posts/${post._id}`}>
                    <div className="TheFuturedPosts__featured">Urgent</div>
                    <div className="theLatestPosts__post-img">
                      <img src={post.image1} alt="" />
                    </div>
                    <div className="TheFuturedPosts__post-content">
                      <div className="TheFuturedPosts__post-title">
                        {post.title}
                      </div>
                      <div className="TheFuturedPosts__post-location">
                        <i className="fas fa-map-marker-alt"></i> {post.city}{" "}
                        {post.postcode}
                      </div>
                      <div className="TheFuturedPosts__post-description">
                        {post.description.substring(0, 60)}...
                      </div>
                      <div className="TheFuturedPosts__post-author">
                        <b>Posted by</b> {post.poster}
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })
          )}
          {listError || listLoading ? (
            ""
          ) : (
            <SwiperSlide className="theLatestPosts__seeMore">
              <i className="far fa-eye"></i>
              <span>See More</span>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
}
