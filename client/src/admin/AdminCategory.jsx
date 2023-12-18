import {baseURL} from '../App'
import { useEffect, useState } from 'react'
import { app } from '../components/FireBase'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import {AiOutlineDelete} from 'react-icons/ai'
import AdminHeader from './AdminHeader'
import CategoryTable from './CategoryTable'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'


const AdminCategory = () => {
   
  const [file,setFile]=useState()
  const [fileParse,setFileParse]=useState(0) 
  const [isLoading,setIsLoading]=useState(false)
  const [isError,setIsError]=useState(false) 
  const [isUpdate,setIsUpdate]=useState(false) 
  const [formData,setFormData]=useState({name:"",categoryImage:""})
  const [categories,setCategories]=useState()
  const [categoryId,setCategoryId]=useState()
  

  const handleFileUpload=(file)=>{
    const storage=getStorage(app)
    const fileName= new Date().getTime() + file.name;
    const storageRef=ref(storage,fileName)
    const uploadTask=uploadBytesResumable(storageRef,file)
  
    uploadTask.on('state-changed',(snapshot)=>{
      const process=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
      setFileParse(Math.round(process))
    },
    (error)=>{
      console.log(error.message)
    },
    ()=>{getDownloadURL(uploadTask.snapshot.ref)
    .then((downloadURL)=>setFormData({...formData,categoryImage:downloadURL}))
    }
    )
   }

  const handleChange=(e)=>{
  setFormData({...formData,[e.target.name]:e.target.value})
  }


  const getCategory=async()=>{
    try {
      setIsLoading(true)
      const res=await fetch(`${baseURL}/api/categories`,{
      method:"GET",
      credentials:"include"
     }) 
     const data= await res.json()
     if(data.success===false){
      setIsError(data.message)
      setIsLoading(false)
     }else{
      setIsLoading(false)
      setCategories(data.categories)
     }
    } catch (error) {
     setIsError(error.message)
     setIsLoading(false)
    }
  };  

  useEffect(()=>{ 
  getCategory()
  },[])

   const handleSubmit=async(e)=>{
    e.preventDefault()
     try {
      setIsLoading(true)
      const res= await fetch(`${baseURL}/api/categories`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formData),
        credentials:"include"
      })
      const data=await res.json()
      if(data.success===false){
      setIsLoading(false)
      setIsError(data.message)
      }else{
        setFormData({name:"",categoryImage:""})
        setIsLoading(false)
        getCategory()
      }
     } catch (error) {
      setIsLoading(false)
      setIsError(error.message)
     }    
  }
  

  const handleDeleteCategory=async(id)=>{
    try {
      const res= await fetch(`${baseURL}/api/categories/${id}`,{
        method:"DELETE",
        credentials:"include"
      })
      const data=await res.json()
      if(data.success===false){
        setIsError(data.message)
      }else{
        getCategory()
      }
    } catch (error) {
       setIsError(error.message)
    }
  }

  const updateCategoryData=(category)=>{
    setFormData({name:category.name,categoryImage:category.categoryImage})    
    setIsUpdate(true)
    setCategoryId(category._id)
  }

  const handleCancel=()=>{
    setFormData({name:"",categoryImage:""})
    setIsUpdate(false)
  }

 const handleUpdate=async(e)=>{
  e.preventDefault()
 try {
  const res = await fetch(`${baseURL}/api/categories/${categoryId}`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(formData),
    credentials:"include"
  })
  const data=await res.json()
  if(data.success===true){
    toast.success(data.message)
    getCategory()
    setFormData({name:"",categoryImage:""})
    setIsUpdate(false)
  }else{
   toast.error(data.message)
  }
 } catch (error) {
  console.log(error.message)
 }
 }

 
  return (
    <>
    <section className="p-3">
    <AdminHeader title={'Category Information'} subTitle={'All create category there.'}/>
    <div className="flex max-md:flex-col-reverse">
    <div className='p-4 md:w-[50%]'>
    <CategoryTable categories={categories} updateCategoryData={updateCategoryData} handleDeleteCategory={handleDeleteCategory}/>
     {isLoading ? <h5 className='my-10 text-center font-bold text-sky-600'><Spinner/></h5>:null}
    </div>     
    <form className='flex  flex-col px-3 py-2 md:w-[50%]' onSubmit={isUpdate ? handleUpdate:handleSubmit}>
      <label className='font-bold py-2 text-[--primary]' htmlFor="category">Add Category</label>
      <p className='my-1 text-xs text-[--primary]'>*First upload the image then save the category . (max 1)</p>
      <span>
      <input onChange={handleChange} value={formData.name} className='py-1.5 px-2 rounded-md shadow-sm outline-none w-3/5 placeholder:text-sm' type="search" name="name" id="name" placeholder='Enter category name' />
      <div className=" border p-2 shadow-sm rounded flex justify-between items-center my-3">
        <input onChange={(e) => setFile(e.target.files[0])}  type="file" id='categoryImage' name='categoryImage' accept="image/*"/>  
        <button onClick={()=>handleFileUpload(file)} className='p-2 font-semibold border border-[--primary] rounded bg-[--primary] text-white  uppercase hover:opacity-80' type='button'>{fileParse?fileParse+"%":"Upload"}</button>
      </div>


      {formData.categoryImage && (
        <div className="w-full flex justify-between border rounded-sm my-3 p-2 shadow-sm">
      <img className='w-20' src={formData.categoryImage} alt="" />
      <button onClick={()=>setFormData({categoryImage:""})} type="button"><AiOutlineDelete size={25} className='text-red-600'/></button>
      </div>
      )}
    
      <button disabled={isLoading} className='font-semibold bg-[--primary] py-1.5 px-4 text-white rounded-md shadow-sm max-md:text-xs max-md:py-2.5' type='submit'>{ isLoading ? "Loading...":isUpdate ? "Update":"Save"}</button>
      <button disabled={isLoading} className='font-semibold py-1.5 px-4  rounded-md shadow-sm max-md:text-xs max-md:py-2.5' onClick={handleCancel} type='button'>{ isLoading ? "Loading...":"Cancel"}</button>
      </span>
      {isError && (<span className='mt-2 text-xs text-red-500'>{isError}</span>)}
    </form>
    </div>
    </section>  
    </>
  )
}

export default AdminCategory
