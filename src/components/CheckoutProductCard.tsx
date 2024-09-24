import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { XMarkIcon } from '@heroicons/react/16/solid'
import { useStoreDispatch } from '../redux/hook'
import { checkoutAction } from '../redux/slice/checkout'
import { IProductDetailResponse } from '../models/response'
import { IDetailProduct, ItransactionProduct } from '../models/product'

interface ICheckoutProductCard {
    product: ItransactionProduct,
    productIndex: number;
}

export default function CheckoutProductCard({product, productIndex}: ICheckoutProductCard) {
    const [products, setProducts] = useState<IDetailProduct>()
    const dispatch = useStoreDispatch()

    useEffect(() => {
        getProductDetail(product?.product_id)
    }, [product?.product_id])

    const getProductDetail = async (id?: string) => {
    const url = `http://localhost:8080/product/detail/${id}`;
      const result: AxiosResponse<IProductDetailResponse> = await axios(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer`,
        },
      });
      setProducts(result.data.data)
    }


  return (
    <div
                key={products?.product.uuid}
                className="grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-[auto,1fr] items-center gap-3 p-3 border border-neutral-300">
                <div className="w-auto h-auto grid justify-center items-center">
                  <img
                    className="w-[178px] h-[170px] object-cover"
                    src={products?.imgProduct?.img_1}
                    alt="Sunset in the mountains"
                  />
                </div>

                <div className="grid grid-cols-[1fr,auto] md:grid-cols-[1fr,auto] h-full pr-5 ">
                  <div className="grid grid-cols-1">
                    <h1 className="text-white text-xs h-fit bg-red-700 rounded-3xl px-3 py-1 w-fit">
                      Flash Sale!
                    </h1>

                    <h1 className="font-bold text-lg ">
                      {products?.product.product_name}
                    </h1>

                    <h1 className=" text-lg text-text">
                      {product.count}pcs |{" "}
                      {product.size_id === 1
                        ? "Regular"
                        : product.size_id === 2
                        ? "Medium"
                        : product.size_id === 3
                        ? "Large"
                        : ""}{" "}
                      | 
                      {product.ice_hot === 1  
                      ? "Ice" 
                      : product.ice_hot === 2 
                      ? "Hot"
                      : ""} |{" "}
                      {product.delivery_id === ''
                        ? "Dine In"
                        : product.delivery_id === ''
                        ? "Door Delivery"
                        : "Pick Up"}{" "}
                      |{" "}
                    </h1>

                    <div className="grid grid-rows-1  grid-cols-1 md:grid-rows-2md:grid-cols-1 h-fit">
                      <div className=" line-through text-red-800	">
                        <p>40.000</p>
                      </div>
                      <div className="pl-5 text-xl text-[#FF8906]">
                        <p>IDR {products?.product.product_price} </p>
                      </div>
                    </div>
                  </div>

                  <div className=" flex items-center justify-end ">
                    <button onClick={() => dispatch(checkoutAction.removeProduct(productIndex))} className="border-2 border-black rounded-full flex items-center justify-center">
                      <div className="w-6 h-6">
                        <XMarkIcon />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
  )
}
