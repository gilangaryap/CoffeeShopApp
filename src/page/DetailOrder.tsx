import imgProduct from "../assets/image/image_product.jpeg";

export default function Detailorder() {
  return (
    <main className="py-2 px-5 md:px-10 lg:px-14 grid gap-5">
      <div className="grid grid-rows-2 gap-2 items-beetwen pt-10 lg:pt-20">
        <div className="gap-2 text-wrap flex flex-row text-heading_mobile lg:text-heading_desktop ">
          <p className="font-semibold ">Order</p>
          <p className="font-bold">#12354-09893</p>
        </div>
        <p className="text-xl text-gray-400">21 March 2023 at 10:30 AM</p>
      </div>

      <div className="grid grid-rows-[auto,auto] grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 gap-4">
        <div className="">
          <p className="text-2xl font-medium ">Order Information</p>

          <div className=" w-full">
            <div className="flex-col flex p-4">
              <div className="flex-row flex  justify-between border-b-2 py-3">
                <div className="flex flex-row gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>

                  <h1 className="font-normal text-base">Fullname</h1>
                </div>
                <div className="font-semibold text-base">Galuh wizard</div>
              </div>

              <div className="flex-row flex  justify-between border-b-2 py-3">
                <div className="flex flex-row gap-2 items-center">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4">
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

                  <h1 className="font-normal text-base">Address</h1>
                </div>
                <div className="font-semibold text-base">
                  Griya bandung indah
                </div>
              </div>

              <div className="flex-row flex  justify-between border-b-2 py-3">
                <div className="flex flex-row gap-2 items-center">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>

                  <h1 className="font-normal text-base">Phone</h1>
                </div>
                <div className="font-semibold text-base">082116304338</div>
              </div>

              <div className="flex-row flex  justify-between border-b-2 py-3">
                <div className="flex flex-row gap-2 items-center">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                    />
                  </svg>

                  <h1 className="font-normal text-base">Payment Method</h1>
                </div>
                <div className="font-semibold text-base">Cash</div>
              </div>

              <div className="flex-row flex  justify-between border-b-2	py-3">
                <div className="flex flex-row gap-2 items-center">
                    
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>

                  <h1 className="font-normal text-base">Shipping</h1>
                </div>
                <div className="font-semibold text-base">Dine In</div>
              </div>

              <div className="flex-row flex  justify-between py-3">
                <div className="flex flex-row gap-2 items-center">
                  <h1 className="font-normal text-base">Total Transaksi</h1>
                </div>
                <div className="font-semibold text-base text-primary">
                  Idr 40.000
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <p className="text-2xl font-medium ">Your Order</p>

          <div className="grid gap-3">
            <div className="grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-[auto,1fr] items-center gap-3 p-3 border border-neutral-300">
              <div className="w-auto h-auto grid justify-center items-center">
                <img
                  className="w-[178px] h-[170px] object-cover"
                  src={imgProduct}
                  alt="Sunset in the mountains"
                />
              </div>

              <div className="grid grid-cols-[1fr,auto] md:grid-cols-[1fr,auto] h-full pr-5 ">
                <div className="grid grid-cols-1">
                  <h1 className="text-white text-xs h-fit bg-red-700 rounded-3xl px-3 py-1 w-fit">
                    Flash Sale!
                  </h1>

                  <h1 className="font-bold text-lg ">Hazelnut Latte</h1>

                  <h1 className=" text-lg text-text">
                    2 pcs | Regular | Ice | Dine In
                  </h1>

                  <div className="grid grid-rows-1  grid-cols-1 md:grid-rows-2md:grid-cols-1 h-fit">
                    <div className=" line-through text-red-800	">
                      <p>40.000</p>
                    </div>
                    <div className="pl-5 text-xl text-[#FF8906]">
                      <p>IDR 10.000</p>
                    </div>
                  </div>
                </div>

                <div className=" flex items-center justify-end ">
                  <button className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-[auto,1fr] items-center gap-3 p-3 border border-neutral-300">
              <div className="w-auto h-auto grid justify-center items-center">
                <img
                  className="w-[178px] h-[170px] object-cover"
                  src={imgProduct}
                  alt="Sunset in the mountains"
                />
              </div>

              <div className="grid grid-cols-[1fr,auto] md:grid-cols-[1fr,auto] h-full pr-5 ">
                <div className="grid grid-cols-1">
                  <h1 className="text-white text-xs h-fit bg-red-700 rounded-3xl px-3 py-1 w-fit">
                    Flash Sale!
                  </h1>

                  <h1 className="font-bold text-lg ">Hazelnut Latte</h1>

                  <h1 className=" text-lg text-text">
                    2 pcs | Regular | Ice | Dine In
                  </h1>

                  <div className="grid grid-rows-1  grid-cols-1 md:grid-rows-2md:grid-cols-1 h-fit">
                    <div className=" line-through text-red-800	">
                      <p>40.000</p>
                    </div>
                    <div className="pl-5 text-xl text-[#FF8906]">
                      <p>IDR 10.000</p>
                    </div>
                  </div>
                </div>

                <div className=" flex items-center justify-end ">
                  <button className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
