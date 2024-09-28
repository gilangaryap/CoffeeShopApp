import { useEffect, useState } from "react";
import FilterProduct from "../components/FilterProduct";
import { useStoreDispatch, useStoreSelector } from "../redux/hook";
import { productAction } from "../redux/slice/productSlice";
import PaginationNumbers from "../components/pagination/PaginationNumbers";
import CardProduct from "../components/card/CardProduct";

export default function Product() {
  const { isLoading, product, pagination } = useStoreSelector((state) => state.product);
  const dispatch = useStoreDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const [filters] = useState({
    category: "",
    sortBy: undefined,
    searchText: "",
    min_price: 0,
    max_price: 0,
  });

  useEffect(() => {
    dispatch(
      productAction.productThunk({ filters, currentPage, productsPerPage })
    );
  }, [dispatch, filters, currentPage]);

  return (
    <main className=" min-h-screen">
      <section
        className="bg-[url('/src/assets/image/Rectangle 299.png')] w-full h-[40vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url('/src/assets/image/Rectangle 299.png')`,
        }}>
        <p className="text-center text-heading_mobile lg:text-heading_desktop w-full font-medium text-white lg:w-[880px]">
          We Provide Good Coffee and Healthy Meals
        </p>
      </section>

      <div>
        {/* 
      <div className="px-5 md:px-10 lg:px-14">
        <section className="py-4 flex items-center justify-between">
          <h1 className="text-heading_mobile lg:text-heading_desktop text-black text-plus-jakarta ml-0">
            Today's <span className="text-[#8E6447]">Promos</span>
          </h1>

          <div className="hidden lg:block">
            <button
              id="btn-scroll-left"
              type="button"
              className="py-2 px-2 rounded-[50%] bg-[#E8E8E8]">
              <div className="w-6 h-6">
                <ArrowLeftIcon/>
              </div>
            </button>
            <button
              id="btn-scroll-right"
              type="button"
              className="py-2 px-2 rounded-[50%] bg-primary">
              <div className="w-6 h-6">
                <ArrowRightIcon/>
              </div>
            </button>
          </div>
        </section>

        <section className="py-2 ">
          <div
            id="scroll"
            className="min-w-full grid gap-3 grid-cols-[1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,] promo-container overflow-x-auto snap-mandatory snap-x lg:snap-none ">
            <CardPromo/>
          </div>
        </section>
      </div> */}
      </div>

      <section className="px-5 md:px-10 lg:px-14 grid gap-3">
        <h1 className="text-heading_mobile lg:text-heading_desktop text-black text-plus-jakarta ml-0">
          Our <span className="text-[#8E6447]">Product</span>
        </h1>

        <div className="grid grid-cols-1 grid-rows-[auto,1fr] lg:grid-cols-[30%,70%] lg:grid-rows-1 gap-5">
          {/* filter */}
          <FilterProduct />
          {/* slide product */}
          <div className="slide-content grid justify-items-center items-center grid-cols-1 lg:grid-cols-[1fr,1fr]  gap-1 h-fit p-5 overflow-x-scroll snap-mandatory snap-x">
            {/* product */}
            {isLoading ? (
              <p>Loading...</p>
            ) : product.length > 0 ? (
              product.map((productItem) => (
                <CardProduct key={productItem.uuid} product={productItem} />
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>
        </div>

        {/* Pagination Controls */}
        {/* <div className="flex justify-center mt-4 gap-4">
          {pagination.prevLink && (
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={isLoading}
              className="px-3 py-3 bg-primary text-white rounded-full mr-2 transition-opacity duration-200 hover:opacity-80">
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
                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                />
              </svg>
            </button>
          )}
          <button className="px-5 py-0 bg-primary text-white rounded-full transition-opacity duration-200 hover:opacity-80">{renderPaginationNumbers()}</button>
          {pagination.nextLink && (
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={isLoading}
              className="px-3 py-3 bg-primary text-white rounded-full transition-opacity duration-200 hover:opacity-80">
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
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          )}
        </div> */}
        <PaginationNumbers
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={setCurrentPage}
        />
      </section>
    </main>
  );
}
