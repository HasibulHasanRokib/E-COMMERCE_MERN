import Google from '../assets/google.png'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {app} from './FireBase'
import {baseURL} from '../App'
import { useDispatch } from 'react-redux'
import { GET_REQUEST_SUCCESS } from '../features/userSlice'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify"

const Oauth = () => {

const dispatch=useDispatch()
const navigate=useNavigate()

 const handleGoogleClick=async()=>{
    try {
      const provider=new GoogleAuthProvider()  
      const auth=getAuth(app)
      const result=await signInWithPopup(auth,provider)
      
      const res=await fetch(`${baseURL}/auth/google`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            name:result.user.displayName,
            email:result.user.email,
            avatar:result.user.photoURL
        }),
        credentials:"include"   
      })
      const data=await res.json()
      console.log(data)
      if(data.success===true){
      dispatch(GET_REQUEST_SUCCESS(data.user))
      navigate('/')
      toast.success(data.message)
      }
    } catch (error) {
        toast.error('Google sign in failed.')
        console.log(error.message)
    }
 }


  return (
    <>
     <button type='button' onClick={handleGoogleClick} className='bg-white flex py-1.5 rounded-md items-center justify-center shadow-sm hover:opacity-90'>
     <img className="w-5 rounded-full mx-1 object-contain" src={Google} alt="google" />
     <p>Google</p>
     </button> 
     <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"/>
    </>
  )
}

export default Oauth
