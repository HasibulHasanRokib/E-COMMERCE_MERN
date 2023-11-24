import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {baseURL} from '../App'
import { Link } from "react-router-dom";
const Users = () => {

  const [userInfo,setUserInfo]=useState()
  const [searchValue,setSearchValue]=useState("")
  const [page,setPage]=useState(1)


  const handleSearch=(e)=>{
    e.preventDefault()
  }

  const url=`${baseURL}/auth/users?search=${searchValue}&page=${page}`

  const getAllUsers=async()=>{
    try {
    const res=await fetch(url)
    const data=await res.json()
    setUserInfo(data) 
    } catch (error) {
    console.log(error.message)    
    }
  }

  useEffect(()=>{
    getAllUsers()
  },[url])


    return (
      <section className='p-3 border-2 min-h-[80vh] my-3 rounded-md lg:w-[76vw]'>
       <h2 className="text-2xl font-bold text-[--primary]">Users</h2>
       
       <form className="flex items-center rounded my-5" onSubmit={handleSearch}>
        <input onChange={(e)=>setSearchValue(e.target.value)} className="py-1.5 px-2 rounded-l outline-[--primary]/50 shadow-sm" type="search" name="search" id="search" placeholder="Search..." />
        <button type="submit"><AiOutlineSearch className="text-xl bg-[--primary] text-white w-9 h-9 p-1.5 rounded-r shadow-sm"/></button>
       </form>

       <table className="border shadow-md w-full">
        <thead>
          <tr className=" bg-[--primary] text-white font-semibold font-mono">
           <td className="p-4">Users</td>
           <td className="p-4 max-md:hidden">Email</td>
           <td className="p-4 max-md:hidden">Phone</td>
           <td className="p-4 max-md:hidden">Status</td>
          </tr>
        </thead>
        <tbody>
          { userInfo && userInfo?.users.length > 0 && userInfo.users.map((user)=>{
            return<tr className=" bg-white border hover:bg-slate-100" key={user._id}>
              <td className="flex items-center p-2">
                <img className="w-10 h-10 object-cover shadow-lg rounded-full border-2" src={user.avatar} alt="user-avatar" />
                <p className=" capitalize mx-2 font-semibold text-sm text-slate-500">{user.name}</p>
              </td>
              <td className=" p-2 text-sm max-md:hidden">{user.email}</td>
              <td className=" p-2 text-sm max-md:hidden">{user?.phone}</td>
              <td className="p-2 text-sm max-md:hidden">{user.isBanned === false ? <p className="font-semibold text-xs p-1 bg-green-300 rounded-full text-center">Active</p> : <p className="font-semibold text-xs p-1 bg-red-300 rounded-full text-center">Suspend</p>}</td>
            </tr>
           
          })}
          <tr>
          <td></td>
            <td>
        <div className="my-3">
       <h5 className=" text-xs font-semibold">Showing {userInfo?.pagination.currentPage} to {userInfo?.pagination.totalPages} of {userInfo?.users.length} Entries</h5>
       <div className="my-2">
       <button disabled={userInfo?.pagination.previousPage===null} onClick={()=>{setPage(page - 1)}} className=" bg-[--primary] px-4 py-2 disabled:cursor-not-allowed disabled:opacity-80 hover:opacity-90 text-white rounded mx-1 text-sm">Prev</button>
       <button disabled={userInfo?.pagination.nextPage===null} onClick={()=>{setPage(page + 1)}} className=" bg-[--primary] px-4 py-2 disabled:cursor-not-allowed disabled:opacity-80 hover:opacity-90 text-white rounded mx-1 text-sm">Next</button>
       </div>
       </div>
       </td>
       <td></td>
          </tr>
        </tbody>

       </table>

      </section>
    )
  }
  
  export default Users