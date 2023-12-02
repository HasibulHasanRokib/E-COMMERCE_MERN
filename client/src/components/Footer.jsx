
const Footer = () => {
  return (
    <>
       <div className="flex flex-col justify-center items-center gap-4 p-8 border-t-2">
        
      <img className='w-52' src="https://skybuybd.com/_next/static/media/logo.2d8160b9.svg" alt="" />
        
        <div className='flex gap-3'>
            <img className="w-10 shadow-md rounded-full" src="https://skybuybd.com/_next/static/media/facebook_round.4a8ef585.svg" alt="" />
            <img className="w-10 shadow-md rounded-full" src="https://skybuybd.com/_next/static/media/instagram.4390992e.svg" alt="" />
            <img className="w-10 shadow-md rounded-full" src="https://skybuybd.com/_next/static/media/youtube.9e128cb7.svg" alt="" />
            <img className="w-10 shadow-md rounded-full" src="https://skybuybd.com/_next/static/media/linkedin.313fbeb4.svg" alt="" />
            <img className="w-10 shadow-md rounded-full" src="https://skybuybd.com/_next/static/media/tiktok.6049d9a4.svg" alt="" />
        </div>
        <p className='font-semibold text-lg'>Explore Sky Brands... Think to the Sky.</p>      
       <div className=" grid md:grid-cols-4 w-3/4 my-8 mx-auto gap-8">
        <section className='flex flex-col justify-start items-start gap-1'>
            <h2 className='font-bold'>CONTACT</h2>
            <p className="text-xs md:text-sm">House#42, Road-3/A, Dhanmondi, Dhaka-1209, Bangladesh</p>
            <p className="text-xs md:text-sm">Email: skybuybd@gmail.com</p>
            <p className="text-xs md:text-sm">Phone: 09613828606</p>
        </section>
        <section className='flex flex-col justify-center items-start gap-1'>
            <h2 className='font-bold'>CUSTOMER</h2>
            <p className="text-xs md:text-sm">Account</p>
            <p className="text-xs md:text-sm">Cart</p>
            <p className="text-xs md:text-sm">Wishlist</p>
            <p className="text-xs md:text-sm">Shipping Charge</p>
            <p className="text-xs md:text-sm">Retail Purchase</p>
            <p className="text-xs md:text-sm">FAQ</p>
        </section>
        <section className='flex flex-col justify-center items-start gap-1'>
            <h2 className='font-bold'>INFORMATION</h2>
            <p className="text-xs md:text-sm">About us</p>
            <p className="text-xs md:text-sm">Contact Us</p>
            <p className="text-xs md:text-sm">Privacy Policy</p>
            <p className="text-xs md:text-sm">Returns & Refund</p>
            <p className="text-xs md:text-sm">Terms & Conditions</p>
            <p className="text-xs md:text-sm">Secured Payment</p>
        </section>
        <section className="flex flex-col gap-3">
            <h2 className='font-bold '>MOBILE APPS</h2>
            <img className="w-32" src="https://skybuybd.com/_next/static/media/playstore.19e43ec9.png" alt="" />
            <img className="w-32" src="https://skybuybd.com/_next/static/media/applestore.a0492474.png" alt="" />
        </section>
       </div>
       <article className="py-4 border-t-2 w-full">
        <h2 className='text-center py-4 font-semibold'>© 2023 Skybuybd - All Rights Reserved --Hasibul Hasan Rokib</h2>
       </article>
      </div> 

    </>
  )
}

export default Footer
