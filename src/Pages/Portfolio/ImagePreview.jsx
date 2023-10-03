import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";

import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import "./styles.css";

// import required modules
import { EffectFlip, Pagination,Navigation } from "swiper";

const ImagePreview = ({ data }) => {
  return (
    <div>
      <Swiper
        // effect={"coverflow"}
        // grabCursor={true}
        // centeredSlides={true}
        // slidesPerView={"auto"}
        // coverflowEffect={{
        //   rotate: 70,
        //   stretch: 0,
        //   depth: 100,
        //   modifier: 1,
        //   slideShadows: true,
        // }}
        // pagination={true}
        // modules={[EffectCoverflow, Pagination]}
        // className="mySwiper portfolio-swiper"
        effect={'flip'}
        grabCursor={true}
        pagination={true}
        navigation={true}
        modules={[EffectFlip, Pagination, Navigation]}
        className="mySwiper"
      >
        {data && data.map((item) => {
          return (
            <SwiperSlide>
              <img src={item?.url} style={{width:"75%"}}/>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ImagePreview;
