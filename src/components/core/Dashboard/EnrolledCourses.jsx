import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';


export default function EnrolledCourses(){

    const {token}  = useSelector((state) => state.auth);
    const navigate = useNavigate(); 

    const [enrolledCourses, setEnrolledCourses] = useState(null);


    const getEnrolledCourses = async() => {
        try{
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        }
        catch(error) {
            console.log("Unable to Fetch Enrolled Courses");
        }
    }

    useEffect(()=> {
        getEnrolledCourses();
    },[]);


  return (
    <>
    <div className="text-3xl font-bold text-richblack-50 mb-4">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
          {/* TODO: Modify this Empty State */}
        </p>
      ) : (
        <div className="my-8 sm:my-8 text-richblack-5 w-full overflow-x-auto">
          {/* Headings */}
          <div className="hidden sm:flex rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>
          {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex flex-col sm:flex-row items-start sm:items-center border border-richblack-700 gap-4 sm:gap-0 px-4 sm:px-0 py-3  ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex w-full sm:w-[45%] cursor-pointer items-start sm:items-center gap-4 px-0 sm:px-5"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />

                <div className="flex flex-col gap-1 w-full text-left sm:text-start">
                  <p className="font-semibold text-sm sm:text-base break-words">{course.courseName}</p>
                  <p className="text-xs sm:text-sm text-richblack-300 break-words">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>

              </div>
              {/* <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div> */}
              <div className="w-full sm:w-1/4 px-0 sm:px-2 text-sm">
                <p className="block sm:hidden text-richblack-300">Duration:</p>
                {course?.totalDuration}
              </div>

              <div className="w-full sm:w-1/5 px-0 sm:px-2 flex flex-col gap-2">
                <p className='text-sm'>Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}     
    </>
  )
}

