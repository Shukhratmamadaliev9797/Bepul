import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__container-quickLinks">
          <span>Quick Links</span>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/">Activities</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="footer__container-others">
          <span>Other Pages</span>
          <ul>
            <li>
              <Link to="/">Privacy & Policy</Link>
            </li>
            <li>
              <Link to="/">Terms of Use</Link>
            </li>
            <li>
              <Link to="/">Disclaimer</Link>
            </li>
            <li>
              <Link to="/">FAQ</Link>
            </li>
          </ul>
        </div>
        <div className="footer__container-contactInfo">
          <span>Contact Info</span>
          <ul>
            <li>
              <i className="fa-solid fa-location-dot footer__container-contactInfo-icon"></i>
              Jl. Sunset Road No.815, Kuta, Bali 80361
            </li>
            <li>
              <i className="fa-solid fa-phone footer__container-contactInfo-icon"></i>
              (+62) 8152 254 239
            </li>
            <li>
              <i className="fa-solid fa-envelope footer__container-contactInfo-icon"></i>
              contact@domain.com
            </li>
          </ul>
        </div>
        <div className="footer__container-social">
          <span>Follow Us</span>
          <ul>
            <li>
              <a href="/">
                <i className="fa-brands fa-facebook-square"></i>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="fa-brands fa-twitter-square"></i>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <div>
          <h1>
            <span>Bepul.com</span>
          </h1>
        </div>
        <div>
          <p>Freebies Web App Designed by Shukhrat Mamadaliev.</p>
        </div>
        <div className="footer__copyright">
          Copyright © 2023. All rights reserved.
        </div>
      </div>
    </div>
  );
}
