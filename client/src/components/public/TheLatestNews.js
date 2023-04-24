import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function News() {
  return (
    <div className="homeNews">
      <div className="homeNews__container">
        <div className="homeNews__title">
          <h1>
            <span>The</span> Latest News
          </h1>
          <p>
            Our Website Provides Up-to-Date News on the Latest Free Item
            Offerings
          </p>
        </div>
        <div className="homeNews__newslist">
          <div className="homeNews__news">
            <div>
              <img src="/images/free2.jpeg" alt="" />
            </div>
            <div className="homeNews__news-content">
              <h3>Tips For Preparing And Caring For Your Grill</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum
                esse officia eaque enim omnis obcaecati distinctio dicta
                similique,
              </p>
              <div className="homeNews__news-action">
                <Link to="">Read More</Link>
                <span>16-02-2023</span>
              </div>
            </div>
          </div>
          <div className="homeNews__news">
            <div>
              <img src="/images/free2.jpeg" alt="" />
            </div>
            <div className="homeNews__news-content">
              <h3>Tips For Preparing And Caring For Your Grill</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum
                esse officia eaque enim omnis obcaecati distinctio dicta
                similique,
              </p>
              <div className="homeNews__news-action">
                <Link to="">Read More</Link>
                <span>16-02-2023</span>
              </div>
            </div>
          </div>
          <div className="homeNews__news">
            <div>
              <img src="/images/free2.jpeg" alt="" />
            </div>
            <div className="homeNews__news-content">
              <h3>Tips For Preparing And Caring For Your Grill</h3>

              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum
                esse officia eaque enim omnis obcaecati distinctio dicta
                similique,
              </p>
              <div className="homeNews__news-action">
                <Link to="">Read More</Link>
                <span>16-02-2023</span>
              </div>
            </div>
          </div>
        </div>
        <div className="homeNews__viewMore">
          <Link>View More</Link>
        </div>
      </div>
    </div>
  );
}
