import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import {baseURL} from '../App'
import { useState } from "react";
import Spinner from '../components/Spinner'
import Oauth from "../components/Oauth";


const Register = () => {

  const imgUrl ="https://skybuybd.com/_next/static/media/login_bg_2.770c5adb.svg";
  const [isLoading,setIsLoading]=useState(false)
  const [error,setError]=useState(false)
  const navigate = useNavigate(); 
  
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Minimum 3 characters required.")
        .max(20, "Must be 20 characters or less.")
        .required("Required"),
      email: Yup.string().email("Invalid email.").required("Required"),
      password: Yup.string()
        .min(4, "Minimum 4 digit or latter.")
        .max(8, "Maximum 8 digit or latter.")
        .required("Required"),
    }),
    onSubmit:async(values) => {
    try {
      setIsLoading(true)
      const res=await fetch(`${baseURL}/auth/user/sign-up`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(values)
  })
  const data=await res.json()
  if(data.success===true){
    setIsLoading(false)
    toast.success(data.message)
    navigate('/login')
  }else{
    setIsLoading(false)
    setError(data.message)
  }
   } catch (error) {
    setError(error.message)
   }
    },
  });

  return (
    <main>
      <div
        className=" flex flex-col"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          objectFit: "cover",
        }}
      >
        <img
          className=" md:w-1/5 w-1/5 mx-auto md:h-48 my-5"
          src="https://skybuybd.com/_next/static/media/login_icon.849dedcc.svg"
          alt=""
        />

        <h1 className="font-bold text-2xl text-center uppercase text-[--primary]">Sign Up</h1>
        <form
          className="flex flex-col gap-2 sm:w-3/5 lg:w-2/5  p-4 mx-auto w-full"
          onSubmit={formik.handleSubmit}
        >
          <input
            onChange={formik.handleChange}
            value={formik.values.name}
            className="py-1.5 px-2 rounded-md outline-[--primary] shadow-sm placeholder:text-xs"
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
          />
          {formik.touched.name && formik.errors.name ? (
            <p className="text-[10px] text-red-700">*{formik.errors.name}</p>
          ) : null}

          <input
            onChange={formik.handleChange}
            value={formik.values.email}
            className="py-1.5 px-2 rounded-md outline-[--primary] shadow-sm placeholder:text-xs"
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email"
          />

          {formik.touched.email && formik.errors.email ? (
            <p className="text-[10px] text-red-700">*{formik.errors.email}</p>
          ) : null}

          <input
            onChange={formik.handleChange}
            value={formik.values.password}
            className="py-1.5 px-2 rounded-md outline-[--primary] shadow-sm placeholder:text-xs"
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
          />

          {formik.touched.password && formik.errors.password ? (
            <p className="text-[10px] text-red-700">
              *{formik.errors.password}
            </p>
          ) : null}
          
          <button
            className="py-1.5 px-2 rounded-md outline-slate-300 bg-[--primary] font-semibold text-white hover:opacity-90 disabled:opacity-80 shadow-sm"
            type="submit"
          >
            {isLoading ? (<Spinner/>): "Sign up"}
          </button>
          <Oauth/>
          <h5 className="text-xs">
            Already have an account .{" "}
            <Link className="font-semibold text-[--primary]" to={"/login"}>
              SignIn
            </Link>
          </h5>
        </form>
        {error && (
          <h5 className="text-sm text-center text-red-700">{error}</h5>
        )}
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
  );
};

export default Register;
