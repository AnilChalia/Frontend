import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='mt-16 px-4 sm:px-6 md:px-10'>
      <div className='flex flex-col-reverse lg:flex-row gap-10 lg:gap-20 items-center'>

        <div className='w-full lg:w-[50%] flex flex-col gap-6 sm:gap-8'>
            <div className='text-3xl sm:text-4xl font-semibold'>
                Become an
                <HighlightText text={"Instructor"} />
            </div>

            <p className='font-medium text-[14px] sm:text-[16px] text-richblack-300 w-full sm:w-[90%]'>
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </p>

            <div className='w-full sm:w-fit flex justify-center sm:justify-start'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex flex-row gap-2 items-center text-center'>
                        Start Learning Today
                        <FaArrowRight />
                    </div>
                </CTAButton>
            </div>


        </div>

          <div className='w-full lg:w-[50%]'>
            <img
                src={Instructor}
                alt=""
                className='shadow-white w-full max-w-[500px] mx-auto'
            />
        </div>
      </div>
    </div>
  )
}

export default InstructorSection


