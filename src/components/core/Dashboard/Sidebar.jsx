import { useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import { HiOutlineMenuAlt2, HiOutlineX } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../common/ConfirmationModal"
import SidebarLink from "./SidebarLink"

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r border-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }



  return (
    <>
      {/* Menu icon for mobile */}
      <button
        // absolute left-4 top-4 z-50 text-white md:hidden 
        className="fixed  left-2 top-1/2 -translate-y-1/2 z-50 p-2 text-white rounded-full bg-richblack-700 shadow-lg backdrop-blur-sm md:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <HiOutlineMenuAlt2 size={20} />
      </button>

      {/* Backdrop when sidebar is open (mobile only) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar h-[calc(100vh-3.5rem)] min-w-[220px]  h-[670px] w-[220px]*/} 
      <div
        className={`md:relative md:block  fixed top-0 left-0 z-50 h-[calc(100vh-3.5rem)]  min-w-[220px] bg-richblack-800 border-r border-richblack-700 py-10 transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Close icon on mobile */}
        <div className="absolute right-4 top-4 text-white md:hidden">
          <HiOutlineX
            size={26}
            onClick={() => setIsSidebarOpen(false)}
            className="cursor-pointer"
          />
        </div>

        {/* Sidebar content */}
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col mt-8 md:mt-0">
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null
              return (
                <SidebarLink key={link.id} link={link} iconName={link.icon} />
              )
            })}
          </div>

          <div className="mx-auto my-6 h-[1px] w-10/12 bg-richblack-700" />

          <div className="flex flex-col">
            <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName="VscSettingsGear"
            />
            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="px-8 py-2 text-sm font-medium text-richblack-300"
            >
              <div className="flex items-center gap-x-2">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}


