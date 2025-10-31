import React from "react";

export default function DeliveryOffer() {
  return (
    <div className="deliveryOffer">
      <div className="deliveryOffer__pic">
        <div className="deliveryOffer__step">
          <i className="fas fa-search icon"></i>
          <span>Search</span>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
        </div>
        <div className="deliveryOffer__step">
          <i className="fas fa-comments icon"></i>
          <span>Speak</span>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
          <p></p>
        </div>
        <div className="deliveryOffer__step">
          <i className="fas fa-truck icon"></i>
          <span> Delivery</span>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
        </div>
        <div className="deliveryOffer__step">
          <i className="fas fa-home icon"></i>
          <span> Receive</span>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
        </div>
      </div>
      <img src="/images/deliveryOffer2.png" alt="" />
    </div>
  );
}
