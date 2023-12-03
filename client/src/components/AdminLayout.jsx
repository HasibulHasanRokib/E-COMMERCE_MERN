import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"


const AdminLayout = () => {
  return (
    <main className="flex gap-1 md:gap-4">
      <Sidebar />
      <Outlet />
    </main>
  )
}

export default AdminLayout