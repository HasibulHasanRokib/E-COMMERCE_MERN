import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { baseURL } from "../App";


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


 

 return (
     <div className="image-slider">

     </div>
   );
 };
 

export default AdsSlider
