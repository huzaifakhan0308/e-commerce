"use client";

import Flashsales from "../components/flashsales";
import SellingProducts from "../components/sellingProducts";
import NewArivals from "../components/newArivels";
import ExploreProducts from "../components/exploreProducts";
import Trust from "../components/trust";
import HeroSection from "../components/hero";
import CategoryBanner from "../components/categoryBanner";

export default function Home() {
  return (
    <div className="max-w-6xl flex flex-col items-center">
      <div className="h-auto w-[100%] flex items-center flex-col">
        <HeroSection />
        <Flashsales />
        <CategoryBanner />
        <SellingProducts />
        <NewArivals />
        <ExploreProducts />
        <Trust />
      </div>
    </div>
  );
}
