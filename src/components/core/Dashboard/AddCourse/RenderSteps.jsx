import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformation"
import PublishCourse from "./PublishCourse"

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course)

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]

  return (
    <>
      {/* Step Circles and Dashed Lines */}
      <div className="relative mb-4 flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-0">
        {steps.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col items-center"
          >
            {/* Circle */}
            <button
              className={`grid aspect-square w-[34px] place-items-center rounded-full border-[1px] text-sm font-medium 
                ${
                  step === item.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } ${step > item.id ? "bg-yellow-50 text-richblack-900" : ""}`}
            >
              {step > item.id ? <FaCheck /> : item.id}
            </button>

            {/* Step Title (below circle on small screens, spaced on large) */}
            <p
              className={`mt-2 text-xs sm:hidden ${
                step >= item.id ? "text-richblack-5" : "text-richblack-500"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))
        .reduce((acc, curr, index) => {
          acc.push(curr)
          if (index !== steps.length - 1) {
            // Add dashed line between steps
            acc.push(
              <div
                key={`divider-${index}`}
                className={`border-dashed border-b-2 sm:h-[calc(34px/2)] sm:w-[33%] h-4 w-0 border-l-2 sm:border-l-0 ${
                  step > steps[index].id
                    ? "border-yellow-50"
                    : "border-richblack-500"
                }`}
              />
            )
          }
          return acc
        }, [])}
      </div>

      {/* Step Titles (visible on sm and above) */}
      <div className="relative mb-8 hidden w-full select-none justify-between sm:flex">
        {steps.map((item) => (
          <div
            className="flex min-w-[130px] flex-col items-center gap-y-2"
            key={item.id}
          >
            <p
              className={`text-sm ${
                step >= item.id ? "text-richblack-5" : "text-richblack-500"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  )
}
