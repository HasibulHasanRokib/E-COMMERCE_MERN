import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"


const AdminLayout = () => {
  return (
    <main className="flex gap-4">
    <Sidebar/>
    <Outlet/>
    </main>
  )
}

export default AdminLayout
