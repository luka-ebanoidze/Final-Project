import { useState } from "react";

import { useGetProducts } from "@src/hooks/useGetProducts";

import { ProductsContainer } from "@src/components/ProductsContainer";
import { Pagination } from "@src/components/Pagination";
import { Filter } from "@src/components/Filter";

export function HomeContent() {
  const [activePage, setActivePage] = useState(1);
  const limit = 9;

  const {
    products: { data, loading },
    totalNum: { totalNum },
  } = useGetProducts(activePage, limit);

  type TProducts = {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    rating: number;
    item: any;
    category: any;
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-cente h-full bg-gray-300 rounded-xl">
        <Filter />
        <div className="flex flex-wrap justify-center gap-10 bg-gray-300">
          {data?.map((product: TProducts) => {
            return (
              <ProductsContainer
                key={product.id}
                title={product.title}
                price={product.price}
                thumbnail={product.thumbnail}
                rating={product.rating}
                id={product.id}
                item={product}
                category={product.category}
              />
            );
          })}
        </div>
        <div className="w-full flex justify-center">
            <Pagination
              setActivePage={setActivePage}
              total={totalNum}
              limit={limit}
            />
        </div>
      </div>
    </div>
  );
}
