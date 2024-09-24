import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import { IProductBody } from "../models/product";


interface CardProductProps {
  product: IProductBody;
}

export default function CardProduct({ product }: CardProductProps) {
  const navigate = useNavigate();

  const handleComponentClick = (uuid: string) => {
    navigate(`/detailproduct/${uuid}`);
  };

  return (
    <>
        <div
          onClick={() => handleComponentClick(product.uuid)}
          className="w-[230px] h-[411px] lg:w-[250px] lg:h-[431px] flex flex-col items-center  snap-center hover:box-s">
          <div className="w-full h-[268px] overflow-hidden">
            <img
              src={product.img_product}
              alt={product.product_name}
              className="h-full w-full object-cover transition-transform duration-300 ease-out transform hover:scale-[1.01]"
            />
          </div>
          <div className="border -translate-y-1/4 bg-white p-3 box-border w-[220px] h-fit flex flex-col place-items-center shadow-md border-neutral-400">
            <h1 className="font-medium text-xl text-[#0B132A] mb-3 truncate w-full max-w-xs">
              {product.product_name}
            </h1>
            <p className="font-normal text-text text-sm mb-3 truncate w-full max-w-xs">
              {product.product_description}
            </p>
            <p className="font-medium text-xl mb-3 text-primary">
              IDR. {product.product_price}
            </p>

            <div className="flex w-full">
              <>
                <button
                  onClick={() => handleComponentClick(product.uuid)}
                  className="py-1 w-full mr-2 text-center bg-primary text-[#0B132A]border-transparent rounded-lg">
                  buy
                </button>
              </>

              <button
                onClick={() => handleComponentClick(product.uuid)}
                className="py-1 px-3 rounded-md border border-primary bg-transparent text-primary items-center justify-center">
                <div className="w-6 h-6">
                  <ShoppingCartIcon />
                </div>
              </button>
            </div>
          </div>
        </div>
    </>
  );
}
