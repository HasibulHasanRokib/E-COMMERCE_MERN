import { Outlet } from "react-router-dom"
import Sidebar from "../admin/Sidebar"

const AdminLayout = () => {
  return (
    <main className=" grid grid-cols-6">   
      <Sidebar />
      <div className="col-span-5">
      <Outlet />
      </div>
    </main>
  )
}

export default AdminLayout
