import { Link, useNavigate } from "react-router-dom";
import heroImage from "../assets/images/47fdff79cb40a5f1a62aef1f4cd64c3e.jpeg";
import aboutImage from "../assets/images/1ff108caf42e05aafc2d71749bf4d116.png";
import { useEffect, useState } from "react";
import imgError from "../assets/images/Imageeror.png";
import axios from "axios";
import mapsImage from "../assets/images/Huge Global.png";
import { CardTestimonial } from "../components/card/CardTestimonial";



interface ProductBody {
  uuid: string;
  img_product: string;
  product_name: string;
  product_description: string;
  product_price: number;
}

export default function Home() {
  const [getProduct, setgetProduct] = useState<ProductBody[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDataProduct = async () => {
      const url = "http://localhost:8080/product";
      try {
        const result = await axios.get(url);
        setgetProduct(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDataProduct();
  }, []);

  const handleBuyClick = (uuid: string) => {
    navigate(`/product/${uuid}`);
  };
  return (
    <main>
      
      <section className="min-h-screen grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
        <article className="bg-black min-h-full flex flex-col place-content-center pt-10 md:pt-16 md:py-5 gap-5 lg:gap-4 text-white px-5 md:px-10  lg:pl-14 lg:pr-5">
          <h1 className="text-2xl lg:text-heading_desktop font-medium">
            Start Your Day with Coffee and Good Meals
          </h1>
          <p className="text-base">
            We provide high quality beans, good taste, and healthy meals made by
            love just for you. Start your day with us for a bigger smile!
          </p>
          <Link to="/product">
            <button className="sign-up rounded-lg px-6 py-2 bg-orange-500 opacity-100 border-none text-sm">
              Get Started
            </button>
          </Link>
          <div className="flex gap-4 pb-4">
            <div className="gap-3 border-r  border-gray-400 pr-3">
              <h1 className="text-2xl lg:text-5xl">90+</h1>
              <p className="text-sm lg:text-base">Staff</p>
            </div>
            <div className="gap-3 border-r  border-gray-400 pr-3">
              <h1 className="text-2xl lg:text-5xl">30+</h1>
              <p className="text-sm lg:text-base">Stores</p>
            </div>
            <div className="gap-3 border-r  border-gray-400 pr-3">
              <h1 className="text-2xl lg:text-5xl">800+</h1>
              <p className="text-sm lg:text-base">Customer</p>
            </div>
          </div>
        </article>

        <article className="h-full relative">
          <img
            className="w-full h-full object-cover absolute bg-center"
            src={heroImage}
            alt=""
          />
        </article>
      </section>

      <section className="grid grid-cols-1 grid-rows-1 lg:grid-cols-2 lg:grid-rows-1 h-fit lg:max-h-[70vh] ">
        <article className="flex flex-col place-content-center py-5 gap-5 lg:gap-4 px-5 md:px-10  lg:pl-14 lg:pr-5">
          <div className="grid grid-cols-[auto,1fr] items-center gap-2 ">
            <div className="w-2 h-16 bg-primary"></div>
            <h1 className="text-2xl lg:text-heading_desktop font-medium text-black">
              We Provide <span className="text-gray-700">Good Coffee</span> and{" "}
              <span className="text-gray-700">Healthy Meals</span>
            </h1>
          </div>

          <p className="text-text h-fit ">
            You can explore the menu that we provide with fun and have their own
            taste and make your day better.
          </p>

          <div className="grid gap-2 ">
            <div className="grid grid-cols-[auto,1fr] items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-green-600">
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-text pl-2">High quality beans</p>
            </div>

            <div className="grid grid-cols-[auto,1fr] items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-green-600">
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-text pl-2">
                Healthy meals, you can request the ingredients
              </p>
            </div>

            <div className="grid grid-cols-[auto,1fr] items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-green-600">
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-text pl-2">
                Chat with our staff to get better experience for ordering
              </p>
            </div>

            <div className="grid grid-cols-[auto,1fr] items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-green-600">
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-text pl-2">
                Free member card with a minimum purchase of IDR 200.000.
              </p>
            </div>
          </div>
        </article>

        <article className="hidden lg:block">
          <div className=" w-full h-full ">
            <img
              className="lg:h-full lg:w-full object-cover object-top"
              src={aboutImage}
              alt="...."
            />
          </div>
        </article>
      </section>

      <section className="pl-5 pr-5 md:pl-5 md:pr-5 lg:pl-20 lg:pr-5 min-h-screen grid grid-rows-[auto,1fr] items-center justify-center py-5 lg:py10">
        <div className=" grid items-center justify-center p-4 gap-1">
          <h1 className="text-center text-heading_mobile lg:text-heading_desktop pb-4">
            Here is People’s <span className="text-[#8E6447]">favorite</span>
          </h1>

          <div className="bg-orange-500 w-16 h-2 mx-auto"></div>

          <p className="text-text text-base text-center">
            Let’s choose and have a bit taste of poeple’s favorite. It might be
            yours too!
          </p>
        </div>

        <div className="slide-content grid justify-items-center items-center grid-cols-[1fr,1fr,1fr,1fr] gap-9 h-fit bg-white overflow-x-scroll snap-mandatory snap-x lg:overflow-x-auto lg:snap-none lg:grid-cols-4">
          {getProduct.slice(0, 4).map((product) => (
            <div
              key={product.uuid}
              className="w-[230px] h-[411px] lg:w-[250px] lg:h-[431px] flex flex-col items-center snap-center hover:box-s">
              <div className="w-full h-[268px] overflow-hidden">
                {product.img_product ? (
                  <img
                    src={product.img_product}
                    alt={product.product_name}
                    className="h-full w-full object-cover transition-transform duration-300 ease-out transform hover:scale-[1.01]"
                  />
                ) : (
                  <img
                    src={imgError}
                    alt={product.product_name}
                    className="h-full w-full object-cover transition-transform duration-300 ease-out transform hover:scale-[1.01]"
                  />
                )}
              </div>

              <div className="border -translate-y-1/4 bg-white p-3 box-border w-[220px] h-fit flex flex-col place-items-center shadow-md">
                <h1 className="font-medium text-xl text-[#0B132A] mb-3  truncate w-full max-w-xs">
                  {product.product_name}
                </h1>
                <p className="font-normal text-text text-sm mb-3 w-full max-w-xs line-clamp-2">
                  {product.product_description}
                </p>
                <p className="font-medium text-xl mb-3 text-primary">
                  IDR. {product.product_price}
                </p>

                <div className="flex w-full">
                  <button
                    onClick={() => handleBuyClick(product.uuid)}
                    className="py-1 w-full mr-2 bg-primary text-[#0B132A] border-transparent rounded-lg">
                    buy
                  </button>
                  <button className="py-1 px-3 rounded-md border border-primary bg-transparent text-primary items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="size-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="min-h-screen grid grid-rows-[auto,1fr] items-center justify-center pl-5 pr-5 md:pl-5 md:pr-5 lg:pl-20 lg:pr-20 py-5 lg:py-10">
        <div className=" lg:pr-5 grid items-center justify-center gap-3 pb-9">
          <h1 className="text-heading_mobile lg:text-heading_desktop font-medium text-[#8E6447] text-center">
            Visit Our Store{" "}
            <span className="text-[#0B132A]">in the Spot on the Map Below</span>
          </h1>
          <div className="bg-primary w-16 h-2 m-auto"></div>
          <p className="font-normal text-base bg-center text-text text-center">
            You can explore the menu that we provide with fun and have their own
            taste and make your day better.
          </p>
        </div>

        <div className=" w-full h-fit">
          <img src={mapsImage} alt="peta" />
        </div>
      </section>

      <CardTestimonial/>

    </main>
  );
}
