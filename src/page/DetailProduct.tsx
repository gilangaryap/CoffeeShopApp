import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStoreDispatch, useStoreSelector } from "../redux/hook";
import { producDetailtAction } from "../redux/slice/productDetailSlice";
import Swal from "sweetalert2";
import { checkoutAction } from "../redux/slice/checkout";
import { ItransactionProduct } from "../models/product";

export default function DetailProduct() {
  const dispatch = useStoreDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const { uuid } = useParams<{ uuid: string }>();
  const { token } = useStoreSelector((state) => state.auth);
  const { productDetail } = useStoreSelector((state) => state.productDetail);
  
  useEffect(() => {
    if (uuid && token) {
      dispatch(producDetailtAction.productDetailThunk({ uuid, token }));
    }
  }, [dispatch, uuid, token]);

  useEffect(() => {
    setDefaultProduct((prevProduct) => ({ ...prevProduct, product_id: productDetail?.product?.uuid }));
  }, [productDetail?.product?.uuid]);

  const [defaultProduct, setDefaultProduct] = useState<ItransactionProduct>({
    product_id: productDetail?.product?.uuid,
    count: 1,
    size_id: undefined,
    ice_hot: 0,
    delivery_id: undefined,
    payment_id: undefined,
  });

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
    setDefaultProduct((prevProduct) => ({ ...prevProduct, count: count + 1 }));
  };

  const handleDecrement = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
    setDefaultProduct((prevProduct) => ({ ...prevProduct, count: count - 1 }));
  };

  const handleSizeChange = (size: number) => {
    setDefaultProduct((prevProduct) => ({ ...prevProduct, size_id: size }));
  };

  /*   const handleDeliveryChange = (delivery: number) => {
    setDefaultProduct((prevProduct) => ({ ...prevProduct, delivery }));
  };

  const handlePaymentChange = (payment: number) => {
    setDefaultProduct((prevProduct) => ({ ...prevProduct, payment }));
  }; */

  const handleIceChange = (ice: number) => {
    setDefaultProduct((prevProduct) => ({ ...prevProduct, ice_hot: ice }));
  };

  function checkoutProduct(isNavigate: boolean) {
    Swal.fire({
      title: "Berhasil!",
      text: "Produk Berhasil Disimpan!",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
      position: "top-end",
      customClass: {
        popup:
          "bg-blue-500 text-black text-sm rounded-lg shadow-lg mt-8 tbt:mt-16",
      },
      toast: true,
    });
    dispatch(checkoutAction.checkoutProduct(defaultProduct));
    if (isNavigate) {
      navigate("/checkout");
    }
  }
  
  return (
    <main className="">
        <section key={productDetail?.product?.uuid} className="grid grid-cols-1 grid-rows-[auto,1fr] lg:grid-cols-2 lg:grid-rows-1 pt-10 lg:pt-20 pb-2">

          <div className=" px-5 md:px-10 lg:px-14 grid grid-cols-1 grid-rows-[auto,20%] lg:grid-rows-[auto,1fr] lg:grid-cols-1 lg:grid-rows-auto gap-1 ">
            {/* grid-cols-1 grid-rows-[auto,20%] lg:grid-rows-[auto,1fr] lg:grid-cols-1 lg:grid-rows-auto gap-2 */}

            <div className="w-full h-[300px] bg-black">
              <img
                className=" h-[3 00px] bg-black md:h-full w-full object-cover"
                src={productDetail?.imgProduct?.img_1}
                alt="..."
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className=" h-[80px] lg:h-[162px]">
                <img
                  className="w-full h-[80px] lg:h-[162px] object-cover"
                  src={productDetail?.imgProduct?.img_2}
                  alt="..."
                />
              </div>

              <div className=" h-[80px] lg:h-[162px]">
                <img
                  className="w-full h-[80px] lg:h-[162px] object-cover"
                  src={productDetail?.imgProduct?.img_3}
                  alt="..."
                />
              </div>

              <div className=" h-[80px] lg:h-[162px]">
                <img
                  className="w-full h-[80px] lg:h-[162px]  object-cover"
                  src={productDetail?.imgProduct?.img_4}
                  alt="..."
                />
              </div>
            </div>
            
          </div>

          <div className=" py-5 pr-10 pl-10 md:pr-14 md:pl-14 lg:pl-5 lg:pr-20 gap-3 flex flex-col justify-center">
            <h2 className="text-lg font-bold text-white p-3 bg-[#D00000] w-fit rounded-3xl">
              FLASH SALE!
            </h2>

            <h1 className="font-bold text-heading_mobile lg:text-heading_desktop">
              {productDetail?.product?.product_name}
            </h1>

            <div className="grid grid-cols-[auto,1fr] items-center">
              <p className="text-xs line-through text-red-800	pr-2">
                IDR {productDetail?.product?.discount_price}
              </p>
              <p className="text-2xl text-[#FF8906]">
              IDR {productDetail?.product?.product_price}
              </p>
            </div>
            <div className="grid grid-cols-[auto,1fr]">
              <div className=" text-[#FF8906]">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <div className=" pl-1">5/5</div>
            </div>
            <p className="text-gray-700 text-base">{productDetail?.product?.product_description}</p>

            <div className="flex items-center border w-fit rounded-md">
              <button
                onClick={handleDecrement}
                className="text-lg text-black border w-8 h-8 grid place-content-center border-primary rounded-md">
                -
              </button>
              <span className=" text-lg text-black px-5 ">{count}</span>
              <button
                onClick={handleIncrement}
                className="text-lg text-black border w-8 h-8 grid place-content-center border-primary rounded-md">
                +
              </button>
            </div>

            <h1 className="text-lg font-bold">Choose Size</h1>
            <div className="flex flex-row justify-between ">
              <button
              style={{
                backgroundColor: defaultProduct?.size_id === 1 ? 'blue' :'white'
              }}
                onClick={() => handleSizeChange(1)}
                className=" py-2 w-full text-base border border-solid border-white text-lightgray hover:border-primary  active:bg-darkgray focus:border-primary focus:text-black">
                Regular
              </button>
              <button
              style={{
                backgroundColor: defaultProduct?.size_id === 2 ? 'blue' :'white'
              }}
                onClick={() => handleSizeChange(2)}
                className=" py-2 w-full text-base border border-solid border-white text-lightgray hover:border-primary  active:bg-darkgray focus:border-primary focus:text-black">
                Large
              </button>
              <button
              style={{
                backgroundColor: defaultProduct?.size_id === 3 ? 'blue' :'white'
              }}
                onClick={() => handleSizeChange(3)}
                className=" py-2 w-full text-base border border-solid border-white text-lightgray hover:border-primary  active:bg-darkgray focus:border-primary focus:text-black ">
                Medium
              </button>
            </div>

            <h1 className="text-lg font-bold">Hot/Ice?</h1>
            <div className="flex flex-row justify-between ">
              <button
                style={{
                  backgroundColor: defaultProduct?.ice_hot === 1 ? 'blue' :'white'
                }}
                onClick={() => handleIceChange(1)}
                className="py-2 w-full text-base border border-solid border-white text-lightgray hover:border-primary  active:bg-darkgray focus:border-primary focus:text-black">
                Ice
              </button>
              <button
              style={{
                backgroundColor: defaultProduct?.ice_hot === 2 ? 'blue' :'white'
              }}
                onClick={() => handleIceChange(2)}
                className=" py-2 w-full text-base border border-solid border-white text-lightgray hover:border-primary  active:bg-darkgray focus:border-primary focus:text-black">
                Hot
              </button>
            </div>

            <div className=" flex flex-row gap-2 justify-between">
              <button
                onClick={() => {
                  checkoutProduct(true);
                }}
                className=" bg-orange-400 rounded-xl py-2 w-full text-black text-sm">
                Buy
              </button>
              <button
                onClick={() => {
                  checkoutProduct(false);
                }}
                className="rounded-xl py-2 border-2 w-full border-primary bg-transparent text-sm flex justify-center items-center gap-3 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="size-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                Add to chart
              </button>
            </div>
          </div>

        </section>
    </main>
  );
}

{
  /*  
    <section className="pl-10 pr-10 lg:pl-20 lg:pr-20 grid gap-3">
 
        <h1 className="text-heading_mobile lg:text-heading_desktop text-black text-plus-jakarta ml-0">Recommendation <span className="text-[#8E6447]">For You</span></h1>
        
        // slide Product 
        <div className="slide-content grid justify-items-center items-center grid-cols-[1fr,1fr,1fr,1fr]  gap-9 h-fit bg-white overflow-x-scroll snap-mandatory snap-x">
          // Product 
          <cardProduct/>
        </div>

    </section> 
*/
}
