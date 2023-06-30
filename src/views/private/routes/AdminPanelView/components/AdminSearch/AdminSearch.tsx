import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { AdminContext } from "../../context/AdminContext";



export function AdminSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([]);

  const {t} = useTranslation()

  const { reload, setReload } = useContext(AdminContext);
  
  const navigate = useNavigate();

  async function searchProducts() {
    try {
      const resp = await axios.get(
        `http://localhost:3001/products?search=${searchValue}`
      );   
      
      setProducts(resp.data);
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    searchProducts();
    
  }, [searchValue, reload]);

  return (
    <div className="w-full border-4">
      <form>
        <div className="flex w-full">
          <div className="w-full">
            <input
              type="search"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              id="search-dropdown"
              className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border-l-1 border border-gray-400 focus:ring-500 focus:border-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-500 outline-none"
              placeholder={t("placeHolder.search")}
              required
            />
          </div>
        </div>
      </form>
      <div className="w-full bg-white flex flex-col gap-3 divide-y-2">
        {searchValue !== "" &&
          products.slice(0, 5).map((product: any) => (
            <div
              className="flex justify-between p-1 items-center pr-10 max-lg:gap-5 max-lg:pr-0 max-sm:justify-center max-sm:pr-0"
              key={product.id}
            >
              <div className="w-[120px] h-[100px] bg-blue-500 object-cover max-sm:hidden">
                <img src={product.thumbnail} className="w-full h-full" />
              </div>
              <div className="flex justify-evenly gap-10 max-lg:flex-col max-sm:gap-3 w-full">
                <div>{product.id}</div>
                <div className=" flex gap-5 max-sm:flex-col">
                  <div>{product.title}</div>
                  <div>{product.price} $</div>
                </div>
              </div>
            </div>
          ))}
        {searchValue !== "" && products.length === 0 && <div className="h-[50px] flex items-center p-5">{t("error.PrNotFound")}</div>}
      </div>
    </div>
  );
}
