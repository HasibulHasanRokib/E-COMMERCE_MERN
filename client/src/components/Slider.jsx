import { useEffect, useState } from "react";
import { baseURL } from "../App";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bannerImages from '../assets/promotion2.1a95daec.png'

const AdsSlider = () => {

const [banners,setBanners]=useState()

const getAllBanner=async()=>{
  try {
    const res=await fetch(`${baseURL}/api/banner`,{
      method:"GET",
      credentials:"include"
    })
    const data=await res.json()
    setBanners(data.banners)
  } catch (error) {
    console.log(error.message)
  }
  }

   useEffect(()=>{
   getAllBanner();
   },[])


   const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

 return (
    <div className="flex lg:p-4 gap-3">   
     <div className="xl:w-3/4 w-full">
        <Slider {...settings}>
        {banners && banners.map((image, index) => (
          <div className="xl:h-[23.8rem]" key={index}>
            <img className="w-auto h-auto" src={image.bannerImages} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </Slider>
     </div>

     <div className="max-xl:hidden h-[24rem]">
      <img className="h-[100%] object-cover shadow-sm rounded-sm" src={bannerImages} alt="" />
     </div>

    </div>

   );
 };
 

export default AdsSlider
