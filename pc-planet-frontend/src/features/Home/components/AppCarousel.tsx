import React from "react";
import { Carousel, CarouselItem, Image } from "react-bootstrap";
import carousel_img_1 from "../../../assets/images/carousel_img_1.jpg";
import carousel_img_2 from "../../../assets/images/carousel_img_2.jpg";
import carousel_img_3 from "../../../assets/images/carousel_img_3.jpg";
import carousel_img_4 from "../../../assets/images/carousel_img_4.jpg";

const AppCarousel = () => {
  return (
    <Carousel interval={3000}>
      <CarouselItem>
        <Image src={carousel_img_1} className="img-fluid carousel-image" />
      </CarouselItem>
      <CarouselItem>
        <Image src={carousel_img_2} className="img-fluid carousel-image" />
      </CarouselItem>
      <CarouselItem>
        <Image src={carousel_img_3} className="img-fluid carousel-image" />
      </CarouselItem>
      <CarouselItem>
        <Image src={carousel_img_4} className="img-fluid carousel-image" />
      </CarouselItem>
    </Carousel>
  );
};

export default AppCarousel;
