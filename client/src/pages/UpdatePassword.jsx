import { Link, useNavigate, useParams } from "react-router-dom"
import {FaEyeSlash,FaEye} from "react-icons/fa6"
import { useState } from "react"
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {baseURL} from '../App'
import { useDispatch} from "react-redux"
import { UPDATE_REQUEST_SUCCESS } from "../features/userSlice"
import { ToastContainer, toast } from "react-toastify"


const UpdatePassword = () => {
const[showOld,setShowOld]=useState(false)
const[showNew,setShowNew]=useState(false)
const[showConfirm,setShowConfirm]=useState(false)
const[loading,setLoading]=useState(false)
const[isError,setIsError]=useState(false)


const {id}=useParams()
const navigate=useNavigate()
const dispatch=useDispatch()


const formik=useFormik({
initialValues:{
oldPassword:"",
newPassword:"",
confirmPassword:""
},
validationSchema:Yup.object({
  oldPassword:Yup.string().min(4,"minimum 4 characters required.").required("required"),  
  newPassword:Yup.string().min(4,"minimum 4 characters required.").required("required"),  
  confirmPassword:Yup.string().min(4,"minimum 4 characters required.").required("required"),  
}),
onSubmit:async(values)=>{
    try {
        setLoading(true)
        const res=await fetch(`${baseURL}/auth/user-password/${id}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(values),
            credentials:"include"
          })
          const data=await res.json()
          if(data.success===false){
           setLoading(false)
           setIsError(data.message)
          }
          setLoading(false)
          navigate('/profile')
          toast.success(data.message)
                   
    } catch (error) {
        console.log(error.message)
        setIsError(error.message)

    }

 }
 })


  return (
    <>
    <main className=" max-w-3xl mx-auto">
    <form className="p-4" onSubmit={formik.handleSubmit}>
      <div className="space-y-1">
        <div className="border-b border-gray-900/10 pb-5">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Update password.</p>
        </div>

        <div className="border-b border-gray-900/10 pb-5">
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="oldPassword" className="block text-sm font-medium leading-6 text-gray-900">Old Password</label>
              <div className="mt-1 flex items-center gap-1 bg-white rounded-md px-2">
                <input onChange={formik.handleChange} type={showOld===true?'text':'password'} name="oldPassword" id="oldPassword" className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6 capitalize"/>
                <button type="button" onClick={()=>{setShowOld(!showOld)}}>{showOld===true ? <FaEyeSlash />: <FaEye />}</button>
               </div>
               {formik.touched.oldPassword && formik.errors.oldPassword ? <samp className="text-xs text-red-700">{formik.errors.oldPassword }</samp>:null}
            </div>          
          </div>
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-gray-900">New Password</label>
              <div className="mt-1 flex items-center gap-1 bg-white rounded-md px-2">
                <input onChange={formik.handleChange} type={showNew===true?'text':'password'} name="newPassword" id="newPassword" className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6 capitalize"/>
                <button type="button" onClick={()=>{setShowNew(!showNew)}}>{showNew===true ? <FaEyeSlash />: <FaEye />}</button>
               </div>
               {formik.touched.newPassword && formik.errors.newPassword ? <samp className="text-xs text-red-700">{formik.errors.newPassword }</samp>:null}
            </div>          
          </div>
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
              <div className="mt-1 flex items-center gap-1 bg-white rounded-md px-2">
                <input onChange={formik.handleChange} type={showConfirm===true?'text':'password'} name="confirmPassword" id="confirmPassword" className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6 capitalize"/>
                <button type="button" onClick={()=>{setShowConfirm(!showConfirm)}}>{showConfirm===true ? <FaEyeSlash />: <FaEye />}</button>
               </div>
               {formik.touched.confirmPassword && formik.errors.confirmPassword ? <samp className="text-xs text-red-700">{formik.errors.confirmPassword }</samp>:null}
            </div>          
          </div>
          {isError && (<p className="text-red-700 text-xs my-5">{isError}</p>)}        
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link to={'/profile'} type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</Link>
        <button disabled={loading} type="submit" className="rounded-md bg-[--primary] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90">{loading ? "Loading...":"Save"}</button>
      </div>
    </form>

    <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"/>
    </main>
    </>
  )
}

export default UpdatePassword
