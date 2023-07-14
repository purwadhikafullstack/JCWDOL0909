import React from "react";
import { Button } from "flowbite-react";
import Carousel from "../../components/Carousel";
import { Footer } from "../../components/Footer";
import ProductCard from "../../pages/Products/ProductCard";
import GeolocationComponent from "../../components/GeolocationComponent";

function Home() {
  return (
    <>
      <GeolocationComponent />
      <div className="flex flex-col gap-1 items-center justify-center border-solid w-full mx-auto">
        <Carousel />
        <ProductCard />
        <div className="sm:text-center md:flex lg:grid bg-white w-full flex items-center justify-center">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
