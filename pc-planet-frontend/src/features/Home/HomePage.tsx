import React from "react";
import "./home.css";
import FeaturedCategory from "./components/FeaturedCategory";
import AppCarousel from "./components/AppCarousel";
import Marquee from "react-fast-marquee";

const HomePage = () => {
  return (
    <div className="container mt-3">
      <div className="d-flex gap-3">
        <div className="w-75">
          <AppCarousel />
        </div>
        <div className="bg-secondary w-25 p-3">
          <span className="text-white">Right content</span>
        </div>
      </div>
      <div className="bg-white mt-4 py-2 px-5 rounded-5">
        <Marquee speed={90} pauseOnHover>
          <span className="text-success">
            আজ আমাদের সকল শাখা সম্পূর্ণ রূপে খোলা রয়েছে। আপনার পছন্দের পণ্যটি
            বুঝে নিতে চলে আসুন নিকটবর্তী কম্পিটার প্ল্যানেটের শাখায়।
          </span>
        </Marquee>
      </div>
      <div className="mt-4">
        <FeaturedCategory />
      </div>
    </div>
  );
};

export default HomePage;
