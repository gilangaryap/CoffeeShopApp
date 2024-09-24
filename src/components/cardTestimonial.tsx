import { useStoreDispatch, useStoreSelector } from "../redux/hook";
import { useEffect } from "react";
import { testiActions } from "../redux/slice/testimonialSlice";



export const CardTestimonial = () => {
  const dispatch = useStoreDispatch();
  const { dataTesti, isLoading } = useStoreSelector((state) => state.testi); 

  useEffect(() => {
    dispatch(testiActions.getTestimonialThunk()); 
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (dataTesti.length === 0) {
    return <p>No testimonials available</p>;
  }

  const testimonial = dataTesti[0]; // Assuming `testi` contains the testimonials array

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
          <button className="py-2 px-2 rounded-full bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6" // Changed to class w-6 h-6 for sizing
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
          </button>
          <button className="py-2 px-2 rounded-full bg-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6" // Changed to class w-6 h-6 for sizing
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
};
