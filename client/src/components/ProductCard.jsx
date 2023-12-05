import {Link} from 'react-router-dom'

const ProductCard = ({product}) => {
  return (
  <>
<article className="bg-white border md:w-[200px] w-[170px] relative  text-center  hover:shadow-md  px-2 py-6 flex flex-col justify-between items-center rounded h-full">
<Link className="flex flex-col justify-between items-center w-full" to={`/product/${product.slug}`}>
<div className="absolute top-0 right-0">
{product.discountPercentage && product.discountPercentage > 0 ?(
  <p className="text-xs duration-300 h-5 px-1 bg-[--primary] text-white rounded-l rounded-tr">{product.discountPercentage}% OFF</p>
):null}
</div>
<figure className="md:w-[145px] w-[130px] h-[145px] relative group">
<img alt="" className="" src={product.imageUrls[0]} />
</figure>
<p className=" text-sm mt-5 px-3">{product?.title.slice(0,18)}</p>
<p className=" text-tiny my-2  duration-300">Tk.{product?.regularPrice}</p> {/*<del className="ml-2 text-xs">৳120000</del>*/}
</Link>
</article>
  </>
  )
}

export default ProductCard
