import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { app } from "../components/FireBase";
import { baseURL } from "../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddBanner = () => {

    const [banners,setBanners]=useState()

    const [file, setFile] = useState()
    const [formData,setFormData]=useState({bannerImages:""})
    const [filePer,setFilePer]=useState(0)
    const [fileErr,setFileErr]=useState(false)

    const[isLoading,setIsLoading]=useState(false)
    const[isError,setIsError]=useState(false)

    const navigate=useNavigate()

    const handleImageUpload=(file)=>{
        const storage=getStorage(app)
        const fileName= new Date().getTime() + file.name;
        const storageRef=ref(storage,fileName)
        const uploadTask=uploadBytesResumable(storageRef,file)
      
        uploadTask.on('state-changed',(snapshot)=>{
          const process=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
          setFilePer(Math.round(process))
          setIsLoading(true)
        },
        (error)=>{
          setFileErr(error.message)
          setIsLoading(false)
        },
        ()=>{getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL)=>setFormData({...formData,bannerImages:downloadURL}),setIsLoading(false))
        }
        )
     }


     const getAllBanner=async()=>{
      try {
        setIsLoading(true)
        const res=await fetch(`${baseURL}/api/banner`,{
          method:"GET",
          credentials:"include"
        })
        const data=await res.json()
        if(data.success===true){
        setIsLoading(false)
        setBanners(data.banners)
        }else{
        setIsLoading(false)
        setIsError(data.message)
        }
      } catch (error) {
        setIsError(error.message)
        setIsLoading(false)
      }
    }

    useEffect(()=>{
    getAllBanner();
    },[])


     const handleBannerSubmit=async(e)=>{
            e.preventDefault()
            try {
              setIsLoading(true)
              const res=await fetch(`${baseURL}/api/banner`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(formData),
                credentials:"include"
              })
              const data= await res.json()
              if(data.success===false){
                setIsLoading(false)
                setIsError(data.message)
              }else{
                setIsLoading(false)
                getAllBanner()
                toast.success(data.message)
                setFormData({bannerImages:""})
              }
            } catch (error) {
              setIsLoading(false)
              setIsError(error.message)
            }
      }
      


      const handleBannerDelete=async(id)=>{
        try {
         const res= await fetch(`${baseURL}/api/banner/${id}`,{
          method:"DELETE",
          credentials:"include"
         })
         const data = await res.json() 
         if(data.success===true){
          toast.success(data.message)
          getAllBanner()
         }else{
          toast.error(data.message)
         }      
        } catch (error) {
          setIsError(error.message)
        }
      }

    

  return (
    <div className="p-3">
    <article className="border-b border-gray-900/10 pb-5">
          <h2 className="text-2xl font-semibold leading-7 text-[--primary]">Add Banner Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Add products banner there.</p>
    </article>
   
   <section className=" flex gap-8 max-md:flex-col md:mt-5">
    <form className="flex flex-col p-3 gap-2  md:w-2/4 w-full md:border-r-2" onSubmit={handleBannerSubmit}>
      <h5 className='font-semibold my-2'>Add Banner images</h5>
      <p className='my-1 text-xs text-[--primary]'>*First upload the image then save the banner . (max 1)</p>
      <div className=" border p-2 shadow-sm rounded flex justify-between items-center">
        <input onChange={(e) => setFile(e.target.files[0])}  type="file" id='bannerImages' name='bannerImages' accept="image/*" />  
        <button  onClick={()=>handleImageUpload(file)} className='p-2 font-semibold border border-[--primary] rounded bg-[--primary] text-white  uppercase hover:opacity-80' type='button'>{isLoading ? "Loading...":"upload"}</button>
      </div>
      <div className="my-2">{fileErr ? (<p className="text-xs text-red-500">Uploading failed</p>):filePer > 0 && filePer <100 ? (<p className="text-blue-600 text-xs">{`Uploading ${filePer}%`}</p>):filePer===100 ? (<p className="text-green-600 text-xs">Upload successful</p>):''}</div>  
                    
      {
           formData && formData.bannerImages.length > 0 && (
              <div className="border rounded-md px-2 py-3 flex justify-between items-center my-1 shadow-sm bg-white">
              <img className="w-20 h-10 object-contain" src={formData.bannerImages} alt="product image" />
              <button type="button" onClick={()=>setFormData({bannerImages:""})} className="uppercase text-red-600 text-sm px-2 font-semibold">Delete</button>
              </div>
            )
        }
     <div className=" flex gap-4 mt-16 justify-end items-center border-t-2 py-1">
        <button onClick={()=>navigate('/products')} type='button'>Cancel</button>
        <button type='submit' className=' p-1.5 bg-[--primary] rounded-md shadow-md text-white font-semibold hover:opacity-90 disabled:opacity-50'>{isLoading ? "Loading...":"Save"}</button>
      </div> 
      <h5 className="text-red-700 text-xs text-center">{fileErr && fileErr}</h5>
      {isError && <h5 className='text-center font-semibold text-red-500 mt-3 text-sm'>{isError}</h5>}
    </form>

    <div className="">
    <h5 className='font-semibold my-2'>Banner images</h5>
      <p className='my-1 text-xs text-[--primary]'>* Here all banner images also delete images </p>
      {banners && banners.map((img)=>{
        return <div className=" flex border rounded-md shadow-sm my-4 justify-between md:w-[30rem]" key={img._id}>
          <img className=" w-44 h-20" src={img.bannerImages} alt="Banner images" />
          <button type="button" onClick={()=>handleBannerDelete(img._id)} className="font-semibold text-red-500 text-sm px-3">DELETE</button>
        </div>
      })}
     {isLoading ? <h5 className='my-10 text-center font-bold text-sky-600'>Loading...</h5>:null}
    </div>
    </section>
    </div>
  )
}

export default AddBanner
