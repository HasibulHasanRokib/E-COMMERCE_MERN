import { Outlet } from "react-router-dom"
import Sidebar from "../admin/Sidebar"

const AdminLayout = () => {
  return (
    <main className=" grid md:grid-cols-6 grid-cols-1">   
      <Sidebar />
      <div className="col-span-5">
      <Outlet />
      </div>
    </main>
  )
}

export default AdminLayout
