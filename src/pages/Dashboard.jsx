import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { RxDashboard } from "react-icons/rx"
import Sidebar from "../components/core/Dashboard/Sidebar"
import { useState } from "react"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const [openMode, setOpenMode] = useState(false)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col lg:flex-row z-0">
      {/* Dashboard Menu Icon (visible on mobile/tablet) */}
      <div className="lg:hidden">
        <div
          onClick={() => setOpenMode(!openMode)}
          className="text-white text-lg font-bold flex gap-3 items-center pt-8 justify-end max-w-[1000px] px-4 mx-auto hover:cursor-pointer"
        >
          <p className="bg-richblack-600 p-3 hover:bg-richblack-700 duration-200 rounded-md flex gap-3 items-center">
            Dashboard Menu <RxDashboard />
          </p>
        </div>

        {/* Sidebar that slides in from the left */}
        <div
          className={`fixed top-0 left-0 z-20 h-full bg-richblack-800 w-[250px] transform transition-transform duration-300 ${
            openMode ? "translate-x-0" : "-translate-x-full"
          } lg:hidden`}
        >
          <Sidebar />
        </div>

        {/* Overlay (click outside to close the sidebar) */}
        {openMode && (
          <div
            className="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setOpenMode(false)} // Close the sidebar when clicking outside
          ></div>
        )}
      </div>

      {/* Sidebar is always visible on larger screens */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
