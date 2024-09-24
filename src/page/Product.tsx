import { useEffect } from "react";
import CardProduct from "../components/CardProduct";
import FilterProduct from "../components/FilterProduct";
import { useStoreDispatch, useStoreSelector } from "../redux/hook";
import { productAction } from "../redux/slice/productSlice";

export default function Product() {
  const { isLoading, product } = useStoreSelector((state) => state.product);
  const dispatch = useStoreDispatch();
  
  useEffect(() => {
    dispatch(productAction.productThunk({
      category: '',
      sortBy: undefined,
      searchText: '',
      min_price: 0,
      max_price: 0,
    }))
  }, [dispatch])


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

      {/* <div className="px-5 md:px-10 lg:px-14">
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
           
              {!isLoading && product?.length > 0 && <CardProduct/>}
            
          </div>
        </div>
      </section>
    </main>
  );
}
