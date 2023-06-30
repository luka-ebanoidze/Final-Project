import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export function ChangeProduct(props: any) {
  const {t} = useTranslation()
  const { setClicked } = props;

  const [id, setId] = useState("");

  const [displaytitle, setDisplayTitle] = useState(false);
  const [displaydesc, setDisplayDesc] = useState(false);
  const [displayprice, setDisplayPrice] = useState(false);

  type TLoginForm = {
    title: string;
    description: string;
    price: number;
  };

  const {
    register,
    handleSubmit,
    // setError,
    // formState: { errors },
  } = useForm<TLoginForm>();

  async function changeProduct(data: TLoginForm) {

    try {
      await axios.put(`http://localhost:3001/products/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('acces-token')}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full bg-gray-200 rounded-xl p-5 flex flex-col gap-5 justify-between">
      <div className="flex gap-5 max-sm:flex-col">
        <div className="flex gap-3">
          <label htmlFor="title">{t("label.title")}</label>
          <input
            type="checkbox"
            onChange={() => setDisplayTitle(!displaytitle)}
            name="title"
          />
        </div>
        <div className="flex gap-3">
          <label htmlFor="desc">{t("label.desc")}</label>
          <input
            type="checkbox"
            onChange={() => setDisplayDesc(!displaydesc)}
            name="desc"
          />
        </div>
        <div className="flex gap-3">
          <label htmlFor="price">{t("label.price")}</label>
          <input
            type="checkbox"
            onChange={() => setDisplayPrice(!displayprice)}
            name="price"
          />
        </div>
      </div>
      {/* setClicked(false); formis onsubmitshi */}
      <form
        action="#"
        className="flex justify-between items-center max-xl:flex-col max-xl:gap-5"
        onSubmit={handleSubmit(changeProduct)}
      >
        <div className="flex flex-col gap-4 max-xl:w-full">
          <div className="">
            <p>Id</p>
            <input
              className="w-full"
              value={id}
              onChange={(e) => setId(e.target.value)}
              type="text"
              name="id"
              id="id"
            />
          </div>
          {displaytitle && (
            <div>
              <p>{t("label.title")}</p>
              <input
                className="w-full"
                {...register("title", { required: true })}
                type="text"
                name="title"
                id="title"
              />
            </div>
          )}
          {displaydesc && (
            <div>
              <p>{t("label.desc")}</p>
              <input
                className="w-full"
                {...register("description", { required: true })}
                type="text"
                name="description"
                id="description"
              />
            </div>
          )}
          {displayprice && (
            <div>
              <p>{t("label.price")}</p>
              <input
                className="w-full"
                type="number"
                {...register("price", { valueAsNumber: true, required: true })}
                name="price"
                id="price"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="border-solid border-[3px] bg-white border-blue-600 flex justify-center items-center py-2 px-10 rounded-full"
        >
          {t("btnText.change")}
        </button>
      </form>
    </div>
  );
}
