import { ChangeEvent } from "react";
import { useStoreDispatch, useStoreSelector } from "../redux/hook";
import { productAction } from "../redux/slice/productSlice";
import { IFilters } from "../models/product";

export default function FilterProduct() {
  const dispatch = useStoreDispatch();
  const { filter } = useStoreSelector((state) => state.product);
  const { productThunk, setFilter , resetFilter} = productAction;

  const onApply = () => {
    dispatch(productThunk({ filters: filter, currentPage: 1 ,productsPerPage: 6}))
  }

  const onReset = () => {
    dispatch(resetFilter());
  };


  const onChangeHandlerCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const filterTemp: IFilters = { ...filter, category: name };
    dispatch(setFilter(filterTemp));
  };

  const onChangeHandlerSortBy = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      const filterTemp: IFilters = { ...filter, sortBy: name as IFilters['sortBy'] };
      dispatch(setFilter(filterTemp));
    }
  };


  return (
    <div className="hidden lg:block">
      <div className="filter-menu basis-1/3 bg-black rounded-lg flex flex-col p-8 gap-4 h-max	">
        <section className="filter flex flex-row justify-between text-white w-full ">
          <div>
            <h4 className="text-2xl	">Filter</h4>
          </div>
          <button className="text-lg" onClick={onReset}>
            Reset Filter
          </button>
        </section>

        <section className="InputSearch text-white  flex flex-col gap-2">
          <label className="text-lg ">search</label>
          <input
            className="rounded-lg p-2 text-neutral-400 focus:outline-none"
            id="product_name"
            name="product_name"
            placeholder="Search Your Product"
            autoComplete="off"
            onChange={(e) => {
              const filterTemp: IFilters = { ...filter, searchText: e?.target?.value  }
              dispatch(setFilter(filterTemp))
            }}
            value={filter?.searchText}
          />
        </section>

        <section className=" category text-white grid gap-4">
          {/* category */}
          <div className="flex flex-col gap-2">
            <p className="text-xl text-white">Category</p>

            {/* filter category */}
            <form className="flex flex-col gap-4 ">
              {/* Mocktail */}
              <div className="gap-4 flex flex-row ">
                <input
                  className="w-6 h-6 rounded-lg bg-transparent"
                  type="checkbox"
                  id="specialty coffees"
                  name="specialty coffees"
                  value="specialty coffees"
                  checked={filter?.category === 'specialty coffees'}
                  onChange={onChangeHandlerCategory}
                />
                <label>Specialty Coffees</label>
              </div>

              {/* Smoothies */}
              <div className="gap-4 flex flex-row">
                <input
                  className="w-6 h-6 rounded-lg bg-transparent"
                  type="checkbox"
                  id="gourmet snacks"
                  name="gourmet snacks"
                  value="gourmet snacks"
                  checked={filter?.category === 'gourmet snacks'}
                  onChange={onChangeHandlerCategory}
                />
                <label>Gourmet Snacks</label>
              </div>

              {/* Non Coffee */}
              <div className="gap-4 flex flex-row ">
                <input
                  className="w-6 h-6 rounded-3xl"
                  type="checkbox"
                  id="sweet indulgences"
                  name="sweet indulgences"
                  value="sweet indulgences"
                  checked={filter?.category === 'sweet indulgences'}
                  onChange={onChangeHandlerCategory}
                />
                <label>Sweet Indulgences</label>
              </div>

              {/* Fruit Based */}
              <div className="gap-4 flex flex-row ">
                <input
                  className="w-6 h-6 rounded-3xl"
                  type="checkbox"
                  id="unique beverages"
                  name="unique beverages"
                  value="unique beverages"
                  checked={filter?.category === 'unique beverages'}
                  onChange={onChangeHandlerCategory}
                />
                <label>Unique Beverages</label>
              </div>
            </form>
          </div>

          {/* sortby */}
          <div className=" flex-col gap-2">
            <p className="text-xl text-white">Sort By</p>

            {/* filter by */}
            <form className="flex flex-col gap-4">
              <div className="gap-4 flex flex-row">
                <input
                  className="w-6 h-6 rounded-2 bg-black"
                  type="checkbox"
                  id="cheaped"
                  name="cheaped"
                  value="cheaped"
                  checked={filter?.sortBy === 'cheaped'}
                  onChange={onChangeHandlerSortBy}
                />
                <label htmlFor="cheaped">Cheaped</label>
              </div>
              <div className="gap-4 flex flex-row">
                <input
                  className="w-6 h-6 rounded-2"
                  type="checkbox"
                  id="priciest"
                  name="priciest"
                  value="priciest"
                  checked={filter?.sortBy === 'priciest'}
                  onChange={onChangeHandlerSortBy}
                />
                <label htmlFor="priciest">Priciest</label>
              </div>
              <div className="gap-4 flex flex-row">
                <input
                  className="w-6 h-6 rounded-3xl"
                  type="checkbox"
                  id="a-z"
                  name="a-z"
                  value="a-z"
                  checked={filter?.sortBy === 'a-z'}
                  onChange={onChangeHandlerSortBy}
                />
                <label htmlFor="a-z">A-Z</label>
              </div>
              <div className="gap-4 flex flex-row">
                <input
                  className="w-6 h-6 rounded-3xl bg-black"
                  type="checkbox"
                  id="z-a"
                  name="z-a"
                  value="z-a"
                  checked={filter?.sortBy === 'z-a'}
                  onChange={onChangeHandlerSortBy}
                />
                <label htmlFor="z-a">Z-A</label>
              </div>
            </form>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div>
            <p className="text-xl text-white">Range Price</p>
          </div>
          <div>
            {/* filter Price */}
            <div
              className="slidecontainer w-full"
            >
              <input
                type="range"
                id="min-price-range"
                min="0"
                max="100000"
                step="10000"
              />
              <input
                type="range"
                id="max-price-range"
                min="0"
                max="100000"
                step="10000"
              />
            </div>
          </div>
        </section>

        <section>
          <button
            onClick={onApply}
            className="bg-[#FF8906] w-full h-8 rounded-lg">
            Apply Filter
          </button>
        </section>
      </div>
    </div>
  );
}
