import AdsSlider from "../components/Ads-Slider"
import Category from "../components/Category"
import NewArrivals from "../components/NewArrivals"
import JustForYou from "../components/JustForYou"
import { Link } from "react-router-dom"


const Home = () => {

  return (
    <>
      <AdsSlider />
      <Category />
      <NewArrivals />
      <JustForYou />
      <div className="flex justify-center items-center my-8 md:my-5">
        <Link to={'/products'} className="bg-[--primary] px-4 py-1.5 uppercase text-white font-semibold shadow-sm hover:shadow-md">Show More</Link>
      </div>
    </>
  )
}

export default Home
