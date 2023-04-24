import React from "react";
import DeliveryOffer from "../../components/public/DeliveryOffer";
import HeaderHome from "../../components/public/HeaderHome";
import LocalMap from "../../components/public/LocalMap";
import ThefeaturedPosts from "../../components/public/ThefeaturedPosts";
import TheLatestNews from "../../components/public/TheLatestNews";
import TheLatestPosts from "../../components/public/TheLatestPosts";

export default function Home() {
  return (
    <div>
      <HeaderHome />
      <TheLatestPosts />
      <LocalMap />
      <ThefeaturedPosts />
      <DeliveryOffer />
      <TheLatestNews />
    </div>
  );
}
