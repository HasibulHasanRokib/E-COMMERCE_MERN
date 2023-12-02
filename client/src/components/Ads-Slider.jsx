import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useSelector} from 'react-redux'
import { Link } from "react-router-dom";

const AdsSlider = () => {

const {banner}=useSelector((state)=>state.banner)
    
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
    <>
    <div className="md:w-4/6 w-full md:px-5 md:mt-2">
      <Slider {...settings}>
        {banner && banner.map((image, index) => (
          <div key={index}>
            <img className="w-full object-contain  h-auto border-b-2 shadow-sm" src={image.bannerImages} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>

    </>
  )
}

export default AdsSlider
