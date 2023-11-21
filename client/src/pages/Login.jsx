import {Link, useNavigate} from "react-router-dom"
import { GET_REQUEST, GET_REQUEST_FAILED, GET_REQUEST_SUCCESS } from "../features/userSlice"
import { baseURL } from "../App"
import { useFormik } from "formik"
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import { ToastContainer, toast } from "react-toastify"
import Oauth from "../components/Oauth"

const Login = () => {

const imgUrl='https://skybuybd.com/_next/static/media/login_bg_2.770c5adb.svg'

const {isLoading,error}=useSelector((state)=>state.user)
const navigate=useNavigate()
const dispatch=useDispatch()
const formik=useFormik({
  initialValues:{
    email:'',
    password:''
  },
  validationSchema:Yup.object({
    email:Yup.string().email('Invalid email!').required('Required'),
    password:Yup.string().min(4,'Minimum 4 characters required.').max(8,'Maximum 8 characters required.').required('Required')
  }),
  onSubmit:async(values)=>{
   try {
  dispatch(GET_REQUEST())
    const res=await fetch(`${baseURL}/auth/user/sign-in`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(values),
      credentials:"include"
    })
    const data=await res.json() 
    if(data.success===true){
      dispatch(GET_REQUEST_SUCCESS(data.user))
      navigate('/')
      toast.success(data.message)
    }else{
    dispatch(GET_REQUEST_FAILED(data.message))
    }
   } catch (error) {   
    dispatch(GET_REQUEST_FAILED(error.message))
   }
  }
})


return (
    <main>
      <div className=" flex flex-col" style={{backgroundImage:`url(${imgUrl})`,backgroundSize:"cover",backgroundRepeat:"no-repeat",objectFit:"cover"}}>
        <img className='md:w-1/5 w-2/6 mx-auto md:h-48 my-5' src="https://skybuybd.com/_next/static/media/login_icon.849dedcc.svg" alt="" />
        <h1 className="font-bold text-2xl text-center uppercase text-[--primary]">Sign in to your account</h1>

        <form className='flex flex-col gap-2 sm:w-3/5 md:w-2/5 p-4 mx-auto w-full' onSubmit={formik.handleSubmit}>
        <input onChange={formik.handleChange} value={formik.values.email} className='py-1.5 px-2 rounded-md outline-[--primary] shadow-sm placeholder:text-xs'  type="text" name="email" id="email" placeholder='Enter your email' />
        {formik.touched.email && formik.errors.email?(<samp className="text-xs text-red-600">*{formik.errors.email}</samp>):null}
        
        <input onChange={formik.handleChange} value={formik.values.password} className='py-1.5 px-2 rounded-md outline-[--primary] shadow-sm placeholder:text-xs'  type="password" name="password" id="password" placeholder='Enter your password' />
        {formik.touched.password && formik.errors.password ? (<samp className="text-xs text-red-600">*{formik.errors.password}</samp>):null}
        
        <button disabled={isLoading} className='shadow-sm py-1.5 px-2 rounded-md outline-slate-300 bg-[--primary] font-semibold text-white hover:opacity-90 disabled:opacity-80' type="submit" >{isLoading && isLoading ?'Loading...':'Sign In'}</button>
        <Oauth/>
        
        <h5 className="text-xs">Don&apos;t have an account? <Link className="font-semibold text-[--primary]" to={"/register"}>SignUp</Link></h5>
      
      </form>
      {error && <h5 className="text-sm text-center text-red-700">{error}</h5>}
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </main>
  )
}

export default Login

