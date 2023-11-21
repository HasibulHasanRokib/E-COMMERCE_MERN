import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { SIGN_OUT_FAILED, SIGN_OUT_SUCCESS } from "../features/userSlice"
import { ToastContainer, toast } from "react-toastify"
import { baseURL } from "../App"

const Profile = () => {

 const {currentUser,error}=useSelector((state)=>state.user)
 const dispatch=useDispatch()

 const handleLogOut=async()=>{
  try {
    const res=await fetch(`${baseURL}/auth/user/sign-out`,{
      method:"GET",
      credentials:"include"
    })
    const data=await res.json()
    if(data.success===true){
      dispatch(SIGN_OUT_SUCCESS())
      toast.success(data.message)
      
    }else{
      dispatch(SIGN_OUT_FAILED(data.message))
    }
  } catch (error) {
    console.log(error.message)
    dispatch(SIGN_OUT_FAILED(error.message))
  }
 }

  return (
    <>
      <div className="py-8 px-5 max-w-3xl mx-auto mt-5 rounded-sm max-md:pb-32">
        <div className="px-4 sm:px-0">
          <h3 className="text-2xl font-semibold leading-7 text-gray-900 ">User Information</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details</p>
        </div>
        <div className="mt-6 border-t border-gray-200">
          <dl className="">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">: {currentUser.name}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
              <dd className="capitalize mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">: {currentUser?.address}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">: {currentUser?.email}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Gender</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">: {currentUser?.gender}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 mb-10">
              <dt className="text-sm font-medium leading-6 text-gray-900">Phone</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">: {currentUser?.phone}</dd>
            </div>
            <Link to={`/update/${currentUser._id}`} className="bg-[--primary] text-xs p-2 rounded text-white mt-8 hover:opacity-90">Update profile</Link>   
            <Link to={`/update-password/${currentUser._id}`} className="bg-sky-600 text-xs p-2 rounded text-white mt-8 hover:opacity-90 mx-3">Update password</Link>   
             <button type="button" onClick={handleLogOut} className="bg-red-500 text-white text-xs p-2 rounded">Log out</button>
             </dl>
           </div>
           {error && <p className="text-xs text-red-500">{error}</p>}
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
    </>
  )
}

export default Profile
