import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import {
  Autoplay,
  FreeMode,
  Pagination,
} from "swiper/modules";

import ReactStars from "react-rating-stars-component";
import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";
import { FaStar } from "react-icons/fa";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    (async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );
      if (data?.success) {
        const filteredReviews = data?.data.filter(
          (review) => review.course !== null
        );
        setReviews(filteredReviews);
      }
    })();
  }, []);

  return (
    <div className="text-white px-4 sm:px-8 py-10">
      <div className="max-w-screen-xl mx-auto">
        <Swiper
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 25 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i}>
              <div className="bg-richblack-800 p-4 rounded-xl shadow-md h-[200px] flex flex-col justify-between transition-all duration-300 transform hover:scale-105 hover:shadow-yellow-100/20 max-w-[320px] mx-auto">
                {/* User Info */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={
                      review?.user?.image
                        ? review?.user?.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt="User"
                    className="h-10 w-10 rounded-full object-cover border border-richblack-600"
                  />
                  <div className="flex flex-col w-full overflow-hidden">
                    <p className="text-richblack-5 font-semibold text-sm truncate">
                      {review?.user?.firstName} {review?.user?.lastName}
                    </p>
                    <p className="text-xs text-richblack-200 truncate">
                      {review?.course?.courseName}
                    </p>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-richblack-100 text-sm mb-3 leading-relaxed line-clamp-3">
                  {review?.review}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-auto">
                  <span className="font-bold text-yellow-100 text-sm">
                    {review.rating.toFixed(1)}
                  </span>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;

