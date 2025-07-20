import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <>
      <h1 className="mb-10 text-2xl sm:mb-14 sm:text-3xl font-medium text-richblack-5">
        My Profile
      </h1>
       <div className="flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between rounded-md border border-richblack-700 bg-richblack-800 p-6 sm:p-8 sm:px-12">
       {/* Left Section */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-x-4">
        <img
        src={user?.image}
        alt={`profile-${user?.firstName}`}
        className="aspect-square w-[78px] rounded-full object-cover"
       />
      <div className="space-y-1 text-left">
        <p className="text-lg font-semibold text-richblack-5">
        {user?.firstName + " " + user?.lastName}
        </p>
        <p className="text-sm text-richblack-300">{user?.email}</p>
      </div>
      </div>
       {/* Edit Button */}
      <div className="self-start sm:self-auto">
       <IconBtn
         text="Edit"
         onclick={() => navigate("/dashboard/settings")}
       >
         <RiEditBoxLine />
        </IconBtn>
      </div>
     </div>

      {/* About Section */}
      <div className="my-8 sm:my-10 flex flex-col gap-y-6 sm:gap-y-10 rounded-md border border-richblack-700 bg-richblack-800 p-6 sm:p-8 sm:px-12">
        <div className="flex w-full flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>

      {/* Personal Details Section */}
      <div className="my-8 sm:my-10 flex flex-col gap-y-6 sm:gap-y-10 rounded-md border border-richblack-700 bg-richblack-800 p-6 sm:p-8 sm:px-12">
        <div className="flex w-full flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-0 max-w-full sm:max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
