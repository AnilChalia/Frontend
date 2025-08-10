import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import Markdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "../components/common/ConfirmationModal";
import Footer from "../components/common/Footer";
import RatingStars from "../components/common/RatingStars";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import { formatDate } from "../services/formDate";
import { fetchCourseDetails } from "../services/operations/courseDetailsApi";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";
import { ACCOUNT_TYPE } from "../utils/constants";
import { addToCart } from "../slices/cartSlice";
import toast from "react-hot-toast";

function CourseDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [isActive, setIsActive] = useState([]);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchCourseDetails(courseId);
        if (res?.success) {
          setCourse(res.data.courseDetails);
        } else {
          setCourse({ error: true });
        }
      } catch (error) {
        console.error("Could not fetch Course Details", error);
        setCourse({ error: true });
      }
    })();
  }, [courseId]);

  useEffect(() => {
    if (course?.ratingAndReviews) {
      const count = GetAvgRating(course.ratingAndReviews);
      setAvgReviewCount(count);
    }
  }, [course]);

  useEffect(() => {
    if (course?.courseContent) {
      let lectures = 0;
      course.courseContent.forEach(
        (sec) => (lectures += sec.subSection.length || 0)
      );
      setTotalNoOfLectures(lectures);
    }
  }, [course]);

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    );
  };

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.");
      return;
    }
    if (token) {
      dispatch(addToCart(course));
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  if (loading || !course) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (course?.error) {
    return <Error />;
  }

  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  const isEnrolled = user && course?.studentsEnrolled?.includes(user?._id);

  return (
    <>
      <div className="relative w-full bg-richblack-800">
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            {/* Thumbnail for mobile */}
            <div className="relative block w-full max-h-[30rem] overflow-hidden lg:hidden">
              <img
                src={course.thumbnail}
                alt="course thumbnail"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Course Info */}
            <div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5">
              <p className="text-4xl font-bold sm:text-[42px]">{course.courseName}</p>
              <p className="text-richblack-200">{course.courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>({course.ratingAndReviews.length} reviews)</span>
                <span>{course.studentsEnrolled.length} students enrolled</span>
              </div>
              <p>Created By {`${course.instructor.firstName} ${course.instructor.lastName}`}</p>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  <BiInfoCircle /> Created at {formatDate(course.createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>

            {/* Mobile Price & Buttons */}
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {course.price}
              </p>
              <button
                className="yellowButton"
                onClick={isEnrolled ? () => navigate("/dashboard/enrolled-courses") : handleBuyCourse}
              >
                {isEnrolled ? "Go To Course" : "Buy Now"}
              </button>
              {!isEnrolled && (
                <button onClick={handleAddToCart} className="blackButton relative z-10">
                  Add to Cart
                </button>
              )}
            </div>
          </div>

          {/* Desktop Card */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block">
            <CourseDetailsCard
              course={course}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>

      {/* What you'll learn */}
      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              <Markdown>{course.whatYouWillLearn}</Markdown>
            </div>
          </div>

          {/* Course content */}
          <div className="max-w-[830px]">
            <p className="text-[28px] font-semibold">Course Content</p>
            <div className="flex flex-wrap justify-between gap-2">
              <div className="flex gap-2">
                <span>{course.courseContent.length} section(s)</span>
                <span>{totalNoOfLectures} lecture(s)</span>
                <span>{course.totalDuration} total length</span>
              </div>
              <button className="text-yellow-25" onClick={() => setIsActive([])}>
                Collapse all sections
              </button>
            </div>

            {/* Accordion */}
            <div className="py-4">
              {course.courseContent.map((section, idx) => (
                <CourseAccordionBar
                  course={section}
                  key={idx}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    course.instructor.image
                      ? course.instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${course.instructor.firstName} ${course.instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${course.instructor.firstName} ${course.instructor.lastName}`}</p>
              </div>
              <p className="text-richblack-50">
                {course?.instructor?.additionalDetails?.about}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

export default CourseDetails;
