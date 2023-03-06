import React from "react";
import Categories from "../../components/public/Categories";
import DeliveryOffer from "../../components/public/DeliveryOffer";
import HeaderHome from "../../components/public/HeaderHome";
import Navbar from "../../components/public/Navbar";
import TheLatestPosts from "../../components/public/TheLatestPosts";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeaderHome />
      <TheLatestPosts />
      <DeliveryOffer />
    </div>
  );
}
