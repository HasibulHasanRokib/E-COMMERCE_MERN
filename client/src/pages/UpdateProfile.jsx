import { Link, useNavigate, useParams } from "react-router-dom"
import {useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'
import {baseURL} from '../App'
import { UPDATE_REQUEST, UPDATE_REQUEST_FAILED, UPDATE_REQUEST_SUCCESS } from "../features/userSlice"
import { ToastContainer, toast } from "react-toastify"
import { useEffect, useRef, useState } from "react"
import { app } from "../components/FireBase"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'

const Update = () => {

const {id}=useParams() 
const{currentUser,isLoading,error}=useSelector((state)=>state.user)
const dispatch=useDispatch()
const navigate=useNavigate()
const fileRef=useRef()
const [file,setFile]=useState()
const [filePer,setFilePer]=useState(0)
const [fileErr,setFileErr]=useState(false)


 const formik=useFormik({
  initialValues:{
    name:`${currentUser.name}`,
    email:`${currentUser.email}`,
    phone:`${currentUser.phone || ''}`,
    address:`${currentUser.address || ''}`,
    gender:`${currentUser.gender || ''}`,
    city:`${currentUser.city || ''}`,
    state:`${currentUser.state || ""}`,
    postalCode:`${currentUser.postalCode || ''}`,
    avatar:`${currentUser.avatar}`
  },
  validationSchema:Yup.object({
    name:Yup.string().min(3,'Minimum 3 characters.'),
    email:Yup.string().email('Invalid email.'),
    phone:Yup.string().min(11,'Minimum 11 digits.').max(20,'Maximum 20 digits'),
    address:Yup.string()
  }),
  onSubmit:async(values)=>{ 
    console.log(values)
    try {
    dispatch(UPDATE_REQUEST())
    const res=await fetch(`${baseURL}/auth/user/${id}`,{
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(values),
    credentials:"include"
   })
   const data=await res.json()
   
   if(data.success===true){
    dispatch(UPDATE_REQUEST_SUCCESS(data.user))
    navigate('/profile')
    toast.success(data.message)
   }
    dispatch(UPDATE_REQUEST_FAILED(data.message))  
    } catch (error) {
    dispatch(UPDATE_REQUEST_FAILED(error.message)) 
    }
  }
 })

 useEffect(()=>{
  if(file){
    handleFileUpload(file)
  }
 },[file])

 const handleFileUpload=(file)=>{
  const storage=getStorage(app)
  const fileName= new Date().getTime() + file.name;
  const storageRef=ref(storage,fileName)
  const uploadTask=uploadBytesResumable(storageRef,file)

  uploadTask.on('state-changed',(snapshot)=>{
    const process=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
    console.log(process)
    setFilePer(Math.round(process))
  },
  (error)=>{
    setFileErr(true)
    console.log(error.message)
  },
  ()=>{getDownloadURL(uploadTask.snapshot.ref)
  .then((downloadURL)=>formik.setFieldValue('avatar', downloadURL))
  }
  )
 }



  return (
    <main className=" max-w-3xl mx-auto max-md:pb-32">
    <form className="p-4" onSubmit={formik.handleSubmit}>
      <div className="space-y-1">
        <div className="border-b border-gray-900/10 pb-5">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive your order.</p>

          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
              <div className="mt-2 flex items-center gap-x-3">
               <input onChange={(e)=>setFile(e.target.files[0])} accept="image/*" type="file" name="avatar" id="avatar" ref={fileRef} className="hidden" />
                <img className="h-12 w-12 rounded-full object-cover" src={formik.values.avatar} alt="avatar" />
                <button type="button" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onClick={()=>fileRef.current.click()}>Change</button>
              </div>
              <div className="my-2">{fileErr ? (<p className="text-xs text-red-500">Uploading failed</p>):filePer > 0 && filePer <100 ? (<p className="text-blue-600 text-xs">{`Uploading ${filePer}%`}</p>):filePer===100 ? (<p className="text-green-600 text-xs">Upload successful</p>):''}</div>  
            </div>
          </div>
        </div>


        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
              <div className="mt-1">
                <input type="text" name="name" id="name" className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 outline-slate-300 sm:text-sm sm:leading-6 capitalize" onChange={formik.handleChange} value={formik.values.name}/>
                {formik.touched.name && formik.errors.name ? (<samp className="text-xs text-red-600">{formik.errors.name}</samp>):null}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-1">
                <input id="email" name="email" type="email" onChange={formik.handleChange} className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm outline-slate-300 sm:text-sm sm:leading-6" value={formik.values.email}/>
                {formik.touched.email && formik.errors.email ? (<samp className="text-xs text-red-600">{formik.errors.email}</samp>):null}
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900"> Phone</label>
              <div className="mt-1">
                <input id="phone" name="phone" type="text" className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm outline-slate-300 sm:text-sm sm:leading-6" onChange={formik.handleChange} value={formik.values.phone}/>
                {formik.touched.phone && formik.errors.phone ? (<samp className="text-xs text-red-600">{formik.errors.phone}</samp>):null}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">Gender</label>
              <div className="mt-1">
                <select
                  id="gender"
                  name="gender"              
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm outline-slate-300 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={formik.handleChange}
                  value={formik.values.gender}
                >
                  <option value=''></option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">Street address</label>
              <div className="mt-1">
                <input type="text" name="address" id="address" onChange={formik.handleChange} value={formik.values.address} className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm outline-slate-300 sm:text-sm sm:leading-6 capitalize"/>
                {formik.touched.address && formik.errors.address ? (<samp className="text-xs text-red-600">{formik.errors.address}</samp>):null}
              </div>
              <div className="flex gap-2 mt-2 max-md:flex-col">
              <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">City</label>
              <div className="mt-2">
                <input type="text" name="city" id="city" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm hover:outline-slate-300  sm:text-sm sm:leading-6 capitalize px-2" onChange={formik.handleChange} value={formik.values.city}/>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
              <div className="mt-2">
                <input type="text" name="state" id="state" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm hover:outline-slate-300  sm:text-sm sm:leading-6 capitalize px-2" onChange={formik.handleChange} value={formik.values.state} />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
              <div className="mt-2">
                <input type="text" name="postalCode" id="postalCode" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm hover:outline-slate-300  sm:text-sm sm:leading-6 px-2" onChange={formik.handleChange} value={formik.values.postalCode} />
              </div>
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link to={'/profile'} type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</Link>
        <button type="submit" className="rounded-md bg-[--primary] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90">Save</button>
      </div>
    </form>

    {error && error ? <h5 className="text-red-700 text-sm text-center my-5">{error}</h5>:null}
    <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"/>
    </main>
  )
}

export default Update
