import { baseURL } from "../App"
import { useFormik } from "formik"
import { useState } from "react"
import * as Yup from 'yup'

const ForgotPassword = () => {

const imgUrl='https://skybuybd.com/_next/static/media/login_bg_2.770c5adb.svg'

const [isLoading,setIsLoading]=useState(false)
const[isError,setIsError]=useState(false)
const[isSuccess,setIsSuccess]=useState(false)


 const formik=useFormik({
        initialValues:{
          email:'',
        },
        validationSchema:Yup.object({
          email:Yup.string().email('Invalid email!').required('Required'),
        }),
        onSubmit:async(values)=>{
        try {
            setIsLoading(true)
            const res=await fetch(`${baseURL}/auth/forgot-password`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(values)
            })
            const data=await res.json()
            if(data.success===true){
                setIsLoading(false)
                setIsSuccess(data.message)
            }else{
                setIsLoading(false)
                setIsError(data.message)
                setTimeout(() => {
                    setIsError(false)
                  }, 2000)
            }

        } catch (error) {
          setIsLoading(false)
          setIsError(error.message)  
        }

        }
      })
      
  return (
    <main>
      <div className=" flex flex-col" style={{backgroundImage:`url(${imgUrl})`,backgroundSize:"cover",backgroundRepeat:"no-repeat",objectFit:"cover"}}>
        <img className='md:w-1/5 w-2/6 mx-auto md:h-48 my-5' src="https://skybuybd.com/_next/static/media/login_icon.849dedcc.svg" alt="" />
        <h1 className="font-bold text-2xl text-center uppercase text-[--primary]">Forgot password</h1>
        <form className='flex flex-col gap-2 sm:w-3/5 md:w-2/5 p-4 mx-auto w-full' onSubmit={formik.handleSubmit}>
        <input onChange={formik.handleChange} value={formik.values.email} className='py-1.5 px-2 rounded-md outline-[--primary] shadow-sm placeholder:text-xs'  type="text" name="email" id="email" placeholder='Enter your email' />
        {formik.touched.email && formik.errors.email?(<samp className="text-xs text-red-600">*{formik.errors.email}</samp>):null}
        <button className='shadow-sm py-1.5 px-2 rounded-md outline-slate-300 bg-[--primary] font-semibold text-white hover:opacity-90 disabled:opacity-80' type="submit">{isLoading ? "Loading...":"Send"}</button>     
      </form>
      {isSuccess && <h5 className="text-sm text-center text-sky-600">{isSuccess}</h5>}
      {isError && <h5 className="text-sm text-center text-red-700">{isError}</h5>}
      </div>
    </main>
  )
}

export default ForgotPassword
