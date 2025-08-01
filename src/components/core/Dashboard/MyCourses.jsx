import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import {fetchInstructorCourses} from '../../../services/operations/courseDetailsApi'
import IconBtn from "../../common/IconBtn"
import CoursesTable from './InstructorCourses/CourseTable'

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  // console.log("instructor tojen",token);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      // console.log("Resut is",result);
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
    
  }, [])

  return (
    <div>
      <div className="mb-14 flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-4">
        <h1 className="text-3xl font-medium text-richblack-5 max-sm:text-xl">My Courses</h1>
        <IconBtn
          text="Add Course"
          className="w-full h-10 text-sm sm:w-auto sm:h-12 sm:text-xl"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}