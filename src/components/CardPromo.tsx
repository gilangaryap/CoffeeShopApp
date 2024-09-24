import { Link } from "react-router-dom";
import img from "../assets/images/image_product.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { IPromoBody } from "../models/promo";

export default function CardPromo() {
  const [getPromo, setPromo] = useState<IPromoBody[]>([]);

  useEffect(() => {
    const getDataPromo = async () => {
      const url = "http://localhost:8080/promo";
      try {
        const result = await axios.get(url);
        setPromo(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDataPromo();
  });

  return (
    <>
      {getPromo.map((promo) => (
        <div
          key={promo.uuid}
          className="w-[335px] bg-[#88B788] overflow-hidden rounded-3xl grid grid-cols-[auto,1fr] snap-center grid-rows-1">
          <div className="w-24 h-[80px] pl-[1%] rounded-3xl">
            <img src={img} alt="" className="object-cover" />
          </div>

          <div className="w-full h-[85px] grid grid-rows-3 pl-2">
            <h1 className="text-sm font-bold ">{promo.product_name}</h1>
            
            <div className="pl-2 grid grid-cols-[auto,1fr]">
              <h2 className="text-sm font-medium text-red-500 line-through">
                {promo.product_price}
              </h2>
              <h2 className="text-2xl font-medium pl-4">
                {promo.discount_price}
              </h2>
            </div>
            <Link to="/buy">
              <button className="px-4 text-white rounded-md">buy</button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
