import {baseURL} from '../App'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_CATEGORY_FAILED,ADD_CATEGORY_REQUEST, ADD_CATEGORY_SUCCESS, DELETE_CATEGORY_FAILED, DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, GET_CATEGORY_FAILED, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS } from '../features/categorySlice'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../components/FireBase'

const CreateCategory = () => {
   
  const [file,setFile]=useState()
  const [fileParse,setFileParse]=useState(0)
  const{isLoading,errorMessage,categoryData}=useSelector((state)=>state.category)
  const dispatch=useDispatch()

  const [formData,setFormData]=useState({name:"",categoryImage:""})
  

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

   const handleSubmit=async(e)=>{
    e.preventDefault()
     try {
      dispatch(ADD_CATEGORY_REQUEST())
      const res= await fetch(`${baseURL}/api/categories`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formData),
        credentials:"include"
      })
      const data=await res.json()
      if(data.success===false){
        dispatch(ADD_CATEGORY_FAILED(data.message))
      }else{
        dispatch(ADD_CATEGORY_SUCCESS(data.newCategory))
        setFormData({name:"",categoryImage:""})
      }
     } catch (error) {
      dispatch(ADD_CATEGORY_FAILED(error.message))
     }    
     }
  
  const getCategory=async()=>{
    try {
      dispatch(GET_CATEGORY_REQUEST())
      const res=await fetch(`${baseURL}/api/categories`,{
      method:"GET",
      credentials:"include"
     }) 
     const data= await res.json()
      dispatch(GET_CATEGORY_SUCCESS(data.categories))
    } catch (error) {
      dispatch(GET_CATEGORY_FAILED(error.message))
    }
  }   

  useEffect(()=>{
  getCategory()
  },[])

  const handleDeleteCategory=async(id)=>{
    try {
      dispatch(DELETE_CATEGORY_REQUEST())
      const res= await fetch(`${baseURL}/api/categories/${id}`,{
        method:"DELETE",
        credentials:"include"
      })
      const data=await res.json()
      dispatch(DELETE_CATEGORY_SUCCESS(data.deleteCategory._id))
    } catch (error) {
      console.log(error.message)
      dispatch(DELETE_CATEGORY_FAILED(error.message))
    }
  }


  
  return (
    <>
    <section className="p-3 border-2 md:min-h-[80vh] my-3 rounded-md lg:w-[85vw] w-full">
    <article className="border-b border-gray-900/10 pb-5">
          <h2 className="text-2xl font-semibold leading-7 text-[--primary]">Category Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">All create category there.</p>
    </article>
    <div className="flex max-md:flex-col-reverse">
    <div className='p-4 md:w-[50%]'>
      <table className='border w-full'>
        <thead>
          <tr>
            <th className='p-3 border'>#</th>
            <th className='p-3 border'>Name</th>
            <th className='p-3 border'>Status</th>
          </tr>
        </thead>
        <tbody>
          {categoryData && categoryData.map((item,index)=>{
            return <tr key={index}>
              <td className='px-3 border'><img className='w-8' src={item?.categoryImage} alt="" /></td>
              <td className='p-3 border capitalize'>{item?.name}</td>
              <td className='p-3  flex justify-around'>
                <button className='font-semibold text-sky-700' type="button">Edit</button>
                <button onClick={()=>handleDeleteCategory(item._id)} className='font-semibold text-red-700' type="button">Delete</button>
             </td>
            </tr>
          })}
        </tbody>
      </table>
    </div> 
    <form className='flex  flex-col px-3 py-2 md:w-[50%]' onSubmit={handleSubmit}>
      <label className='font-semibold py-2 text-[--primary]' htmlFor="category">Add Category</label>
      <span>
      <input onChange={handleChange} value={formData.name} className='py-1.5 px-2 rounded-md shadow-sm outline-none w-3/5 placeholder:text-sm' type="search" name="name" id="name" placeholder='Enter category name' />
      <div className=" border p-2 shadow-sm rounded flex justify-between items-center my-3">
        <input onChange={(e) => setFile(e.target.files[0])}  type="file" id='categoryImage' name='categoryImage' accept="image/*"/>  
        <button onClick={()=>handleFileUpload(file)} className='p-2 font-semibold border border-[--primary] rounded bg-[--primary] text-white  uppercase hover:opacity-80' type='button'>{fileParse?fileParse+"%":"Upload"}</button>
      </div>
      <button disabled={isLoading} className='font-semibold bg-[--primary] py-1.5 px-4 text-white rounded-md shadow-sm max-md:text-xs max-md:py-2.5' type='submit'>{ isLoading ? "Loading...":"Save"}</button>
      </span>
      {errorMessage && (<span className='mt-2 text-xs text-red-500'>{errorMessage}</span>)}
    </form>
    </div>
    </section> 

  
    </>
  )
}

export default CreateCategory
