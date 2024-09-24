import { useStoreDispatch, useStoreSelector } from "../redux/hook";
import { useEffect, useState } from "react";
import { testiActions } from "../redux/slice/testimonialSlice";
import { ITestimonialBody } from "../models/testimonial";
import PagePagination from "./pagination/PaginationArrow";

const defaultTestimonial: ITestimonialBody = {
  user_img: "src/assets/images/70840a4caeb335701029d52bbb650fae.jpeg",
  full_name: "Viezh Robert",
  user_phone: "Manager Coffe Shop",
  comment:
    "“Wow... I am very happy to spend my whole day here. the Wi-fi is good, and the coffee and meals tho. I like it here!! Very recommended!",
  rating: "5",
};

export const CardTestimonial = () => {
  const dispatch = useStoreDispatch();
  const { dataTesti, isLoading } = useStoreSelector((state) => state.testi);
  const [currentPage, setCurrentPage] = useState(1);
  const testimonialsPerPage = 1;

  useEffect(() => {
    dispatch(testiActions.getTestimonialThunk());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const totalTestimonials = dataTesti.length > 0 ? dataTesti.length : 1;
  const totalPages = Math.ceil(totalTestimonials / testimonialsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentIndex = (currentPage - 1) * testimonialsPerPage;
  const testimonial = dataTesti.length > 0 ? dataTesti[currentIndex] : defaultTestimonial;

  return (
    <main className="min-h-screen lg:min-h-[50vh] grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 bg-gradient-to-r pl-5 md:pr-10 pr-5 md:pl-10 lg:pl-20 lg:pr-20 py-5 lg:py-10">
      <div className="flex items-center justify-center">
        <img
          className="w-[289px] h-[261px] object-cover object-top"
          src={testimonial?.user_img || "default-image-url"}
          alt={testimonial ? testimonial.full_name : "No image available"}
        />
      </div>

      <div className="grid gap-1">
        <p className="text-white font-normal flex items-center">TESTIMONIAL</p>
        <div className="flex items-center gap-3">
          <div className="bg-primary w-2 h-12"></div>
          <h1 className="text-heading_mobile lg:text-heading_desktop text-white">
            {testimonial?.full_name || "Name"}
          </h1>
        </div>
        <p className="text-base font-normal flex items-center text-primary">
          {testimonial?.user_phone}
        </p>
        <p className="text-white text-base font-normal">
          {testimonial?.comment || "No comment available"}
        </p>
        <div className="grid grid-cols-[auto,1fr]">
          <div className="text-[#FF8906]">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className={`star ${
                  index < (Number(testimonial?.rating) || 0)
                    ? "text-[#FF8906]"
                    : "text-gray-400"
                }`}>
                ★
              </span>
            ))}
          </div>
          <div className="text-white pl-1">
            {testimonial?.rating || "0.0"}.0
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <PagePagination
            pages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </main>
  );
};
