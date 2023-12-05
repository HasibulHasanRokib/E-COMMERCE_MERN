import { baseURL } from '../App'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../components/FireBase'

const CreateProduct = () => {

  const [files, setFiles] = useState([])
  const [imageUploadError, setImageUploadError] = useState(false);
  const [upLoading, setUpLoading] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", regularPrice: 0, imageUrls: [], category:'', discountPercentage: 0, rating: 0, brand: "", stock: 0, sold: 0 })
  const [isLoading,setIsLoading]=useState(false)
  const [isError,setIsError]=useState(false)
  const [categories,setCategories]=useState()
  const navigate = useNavigate()

  const handleImageUpload = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 6) {
      const promises = [];
      setUpLoading(true)
      for (let i = 0; i < files.length; i++) {
        promises.push(storage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) })
        setImageUploadError(false)
        setUpLoading(false)

      }).catch((err) => {
        setImageUploadError("Image upload failed ( 2 mb max per image)")
        console.log(err.message)
      })

    } else {
      setImageUploadError("You can upload only 5 images per listing.")
      setUpLoading(false)
    }
  }

  const storage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => resolve(downloadURL))
        }
      )
    })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleProductSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const res = await fetch(`${baseURL}/api/create-product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include"
      })
      const data = await res.json()

      if (data.success === false) {
        setIsError(data.message)
        setIsLoading(false)
      } else {
        navigate(`/product/${data.newProduct.slug}`)
        setIsLoading(false)
      }

    } catch (error) {
      setIsLoading(false)
      setIsError(error.message)
    }
  }

  const handleDeleteImage = (index) => {
    setFormData({ ...formData, imageUrls: formData.imageUrls.filter((url, i) => i !== index) })
  }

  const getCategories=async()=>{
    try {
      const res=await fetch(`${baseURL}/api/categories`,{
      method:"GET",
      credentials:"include"
     }) 
     const data= await res.json()
     if(data.success===false){
      setIsError(data.message)
     }else{
      setCategories(data.categories)
     }   
    } catch (error) {
     console.log(error.message)
     setIsError(data.message)
    }
  }
  
  useEffect(()=>{
  getCategories()
  },[])

  return (
    <main className='p-3 border-2 min-h-[80vh] my-3 rounded-md lg:w-[85vw] w-full'>

      <article className="border-b border-gray-900/10 pb-5">
        <h2 className="text-2xl font-semibold leading-7 text-[--primary]">Product Information</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Create new product.</p>
      </article>

      <form onSubmit={handleProductSubmit}>
        <section className='flex gap-8  border-b-2 max-md:flex-col'>
          <div className="py-3  md:w-2/4 w-full">

            <span className='flex flex-col'>
              <label className='font-semibold my-1' htmlFor="title">Title :</label>
              <input onChange={handleChange} className='p-1.5 rounded-md outline-[--primary] shadow-sm' type="text" name="title" id="title" />
            </span>


            <span className='flex flex-col'>
              <label className='font-semibold my-1' htmlFor="description">Description :</label>
              <textarea onChange={handleChange} className='p-1.5 rounded-md outline-[--primary] shadow-sm' type="text" name="description" id="description" />
            </span>

            <span className='flex flex-col'>
              <label className='font-semibold my-1' htmlFor="regularPrice">Price :</label>
              <input onChange={handleChange} className='p-1.5 rounded-md outline-[--primary] shadow-sm' type="number" name="regularPrice" id="regularPrice" />
            </span>


            <span className='flex flex-col'>
              <label className='font-semibold my-1' htmlFor="stock">In Stock :</label>
              <input onChange={handleChange} className='p-1.5 rounded-md outline-[--primary] shadow-sm' type="number" name="stock" id="stock" />

            </span>

            <span className='flex flex-col'>
              <label className='font-semibold my-1' htmlFor="category">Category :</label>
              <select onChange={handleChange} id="category" name="category" className='p-1.5 rounded-md outline-[--primary] shadow-sm' >
                <option value=''></option>
                {categories && categories.map((item) => {
                  return <option className=' capitalize' key={item._id} value={item._id}>{item.slug}</option>
                })}

              </select>
            </span>

            <span className='flex flex-col'>
              <label className='font-semibold my-1' htmlFor="discountPercentage">Discount Percentage(%):</label>
              <input onChange={handleChange} className='p-1.5 rounded-md outline-[--primary] shadow-sm' type="number" name="discountPercentage" id="discountPercentage" />
            </span>

            <span className='flex flex-col'>
              <label className='font-semibold my-1' htmlFor="brand">Brand:</label>
              <input onChange={handleChange} className='p-1.5 rounded-md outline-[--primary] shadow-sm' type="text" name="brand" id="brand" />
            </span>
          </div>

          <div className="flex flex-col p-3 gap-2  md:w-2/4 w-full">
            <h5 className='font-semibold my-2'>Product images</h5>
            <p className='my-1 text-xs text-[--primary]'>*The first image will be the cover (max 5)</p>
            <div className=" border p-2 shadow-sm rounded flex justify-between items-center">
              <input onChange={(e) => setFiles(e.target.files)} type="file" id='images' name='images' accept="image/*" multiple />
              <button disabled={upLoading} onClick={handleImageUpload} className='p-2 font-semibold border border-[--primary] rounded bg-[--primary] text-white  uppercase hover:opacity-80' type='button'>{upLoading ? "Loading..." : "Upload"}</button>
            </div>
            {
              formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => {
                return <div key={url} className="border rounded-md px-2 py-3 flex justify-between items-center my-1 shadow-sm bg-white">
                  <img className="w-20 h-10 object-contain" src={url} alt="product image" />
                  <button type="button" onClick={() => handleDeleteImage(index)} className="uppercase text-red-600 text-sm">Delete</button>
                </div>
              })
            }
            <h5 className="text-red-700 text-xs text-center">{imageUploadError && imageUploadError}</h5>
            {isError && <h5 className='text-center font-semibold text-red-500 mt-3 text-sm'>{isError}</h5>}
          </div>
        </section>
        <div className=" flex gap-4 mt-3 justify-end items-center">
          <button onClick={() => navigate('/products')} type='button'>Cancel</button>
          <button type='submit' className=' p-1.5 bg-[--primary] rounded-md shadow-md text-white font-semibold hover:opacity-90 disabled:opacity-50'>{isLoading ? "Loading..." : "Save"}</button>
        </div>
      </form>
    </main>
  )
}

export default CreateProduct
