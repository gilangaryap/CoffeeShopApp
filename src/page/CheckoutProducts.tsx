import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  useStoreSelector } from "../redux/hook";
import CheckoutProductCard from "../components/CheckoutProductCard";

export default function CheckoutProduct() {
  const navigate = useNavigate();
  const [isModalCheckoutVisible, setIsModalCheckoutVisible] = useState(false);
  const checkoutModalBgRef = useRef<HTMLDivElement>(null);
  const { checkout } = useStoreSelector((state) => state.checkout);

  const handleCheckoutClick = () => {
    setIsModalCheckoutVisible(true);
  };

  const handleCancelCheckoutClick = () => {
    setIsModalCheckoutVisible(false);
  };

  const handleConfirmCheckoutClick = () => {
    alert("You have been checkout item!");
    setIsModalCheckoutVisible(false);
  };

  const handleBackgroundCheckoutClick = (event: React.MouseEvent) => {
    if (event.target === checkoutModalBgRef.current) {
      setIsModalCheckoutVisible(false);
    }
  };

  const handleAddMenuClick = () => {
    navigate(`/product`);
  };

  return (
    <main className="py-2 px-5 md:px-10 lg:px-14 grid gap-5">
      <section className=" items-beetwen pt-10 lg:pt-20">
        <p className="text-header  text-wrap text-heading_mobile lg:text-heading_desktop font-medium  ">
          Payment Details
        </p>
      </section>

      <section className="grid grid-cols-1 grid-rows-[1fr,auto] lg:grid-cols-[1fr,auto] lg:grid-rows-1 gap-3 ">
        <div className="max-w-full max-h-fit flex flex-col gap-4">
          <div className="flex flex-row justify-between ">
            <p className="text-xl font-medium ">Your Order</p>
            <button
              onClick={() => handleAddMenuClick()}
              className="px-4 py-2 rounded-lg bg-primary font-normal">
              + Add Menu
            </button>
          </div>

          <div className="grid gap-3">
            {checkout.map((products, index) => (
              <CheckoutProductCard key={index} product={products} productIndex={index}/>
            ))}
          </div>
        </div>

        <div className="">
          <p className="text-2xl font-medium ">Total</p>

          <div className=" w-full  bg-gray-100">
            <div className="flex-col flex gap-4 p-4">
              <div className="flex-row flex  justify-between">
                <div className="font-normal	 text-xl mb-2">Order</div>
                <div className="font-semibold text-xl mb-2">IDR 40.000</div>
              </div>

              <div className="flex-row flex  justify-between">
                <div className="font-normal	 text-xl mb-2">Delivery</div>
                <div className="font-semibold text-xl mb-2">IDR 40.000</div>
              </div>
              <div className="flex-row flex  justify-between">
                <div className="font-normal	 text-xl mb-2">Tax</div>
                <div className="font-semibold text-xl mb-2">IDR 40.000</div>
              </div>

              <div className="flex-row flex  justify-between">
                <div className="font-normal	 text-xl mb-2">Sub Total</div>
                <div className="font-semibold text-xl mb-2">IDR 40.000</div>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="item h-10 px-4 py-2 rounded-lg bg-primary font-bold w-full">
                Checkout
              </button>
              {isModalCheckoutVisible && (
                <div
                  ref={checkoutModalBgRef}
                  onClick={handleBackgroundCheckoutClick}
                  className="show fixed z-50 inset-0 bg-black bg-opacity-50 modal-bg justify-center items-center">
                  <div className="bg-white p-6 rounded shadow-lg max-w-md uw:max-w-2xl w-3/4 tbt:w-full text-center">
                    <h2 className="text-sm tbt:text-2xl uw:text-4xl font-semibold mb-4">
                      Confirm Checkout
                    </h2>

                    <p className="text-xs xsm:text-sm tbt:text-base uw:text-2xl mb-6">
                      Are you sure you want to checkout?
                    </p>

                    <div className="flex justify-center">
                      <button
                        onClick={handleConfirmCheckoutClick}
                        className="text-xs tbt:text-base uw:text-2xl bg-primary hover:bg-darkprimary2 active:bg-darkprimary text-white px-4 py-2 rounded mr-2">
                        Checkout
                      </button>
                      <button
                        onClick={handleCancelCheckoutClick}
                        className="text-xs tbt:text-base uw:text-2xl bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white px-4 py-2 rounded">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className=" text-xl text-gray-400">We accept</div>

              <a>
                <img
                  className="h-auto w-[439px]"
                  src="{imgbank}"
                  alt="banker"
                />
              </a>

              <p className=" text-xl text-gray-400">
                *Get Discount if you pay with Bank Central Asia
              </p>

              <div>
                {isModalCheckoutVisible && (
                  <div
                    ref={checkoutModalBgRef}
                    onClick={handleBackgroundCheckoutClick}
                    className="show fixed inset-0 bg-black bg-opacity-50 modal-bg justify-center items-center">
                    <div className="modal-content bg-white p-6 rounded shadow-lg max-w-md uw:max-w-2xl w-3/4 tbt:w-full text-center">
                      <h2 className="text-sm tbt:text-2xl uw:text-4xl font-semibold mb-4">
                        Confirm Checkout
                      </h2>
                      <p className="text-xs xsm:text-sm tbt:text-base uw:text-2xl mb-6">
                        Are you sure you want to checkout?
                      </p>
                      <div className="flex justify-center">
                        <button
                          onClick={handleConfirmCheckoutClick}
                          className="text-xs tbt:text-base uw:text-2xl bg-primary hover:bg-darkprimary2 active:bg-darkprimary text-white px-4 py-2 rounded mr-2">
                          Checkout
                        </button>
                        <button
                          onClick={handleCancelCheckoutClick}
                          className="text-xs tbt:text-base uw:text-2xl bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white px-4 py-2 rounded">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 grid-rows-[auto,1fr] gap-4 lg:w-[50%]">
        <h1 className="text-xl font-medium">Payment Info & Delivery</h1>

        <form className="flex flex-col gap-4 w-full font-medium" action="">
          <div className="item-form gap-2 ">
            <label>Full Name</label>
            <div className="flex items-center text-neutral-400 gap-2 border-2 w-full rounded-lg h-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              <input
                type="text"
                id="fullname"
                placeholder="Enter Your Full Name"
              />
            </div>
          </div>

          <div className="item-form gap-4">
            <label>Email</label>
            <div className="flex items-center text-neutral-400 gap-2 border-2 w-full rounded-lg h-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>

              <input type="email" id="email" placeholder="Enter Your Email" />
            </div>
          </div>

          <div className="item-form gap-4">
            <label>Address</label>
            <div className="flex items-center text-neutral-400 gap-2 border-2 w-full rounded-lg h-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <input
                type="text"
                id="address"
                placeholder="Enter Your address Again"
              />
            </div>
          </div>

          <div className="grid gap-3 lg:hidden">
            <div className=" grid grid-cols-[1fr,1fr,auto] gap-2">
              <div>
                <div className="">
                  <button
                    id="categoryBtn"
                    type="button"
                    className="flex items-center justify-center gap-2 py-2 w-full px-3 bg-primary rounded-md">
                    Delivery
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-4">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>

                  <div
                    id="categoryDropdown"
                    className="hidden absolute dropdown-menu w-fit py-3 px-10 rounded-lg bg-slate-300 text-sm">
                    <option value="">All Products</option>
                    <option value="">Favorite Coffee</option>
                    <option value="">Favorite Non-Coffee</option>
                    <option value="">Favorite Foods</option>
                    <option value="">Add-Ons</option>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <label className="hidden md:block">Delivery</label>
          <div className=" grid-cols-3 gap-3 hidden md:grid ">
            <div className="text-center py-2 text-black border border-primary rounded-lg">
              Regular
            </div>
            <div className="text-center py-2 text-black border hover:border-primary rounded-lg">
              Medium
            </div>
            <div className="text-center py-2 text-black border hover:border-primary rounded-lg">
              Large
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
