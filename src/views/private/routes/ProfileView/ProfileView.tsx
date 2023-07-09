import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ProfileView() {
  const { t } = useTranslation();

  const [clicked, setClicked] = useState(false);

  const [firstPass, setFirstPass] = useState("");
  const [secondPass, setSecondPass] = useState("");
  const [paramToChange, setParamToChange] = useState("");
  const [changingValue, setChangingValue] = useState("");

  const [error, setError] = useState("");
  

  function submit(e: any) {
    e.preventDefault();

    if (firstPass === secondPass && firstPass !== "" && secondPass !== "" && changingValue !== "") {
      setFirstPass("");
      setSecondPass("");
      setChangingValue("");
      setError("");
      // console.log("correct");
      // console.log(changingValue);
    }else if(firstPass === "" || secondPass === "" || changingValue === ""){
      setError(t("error.emptyInput"))
    } else {
      setError(t("error.diffPas"));
    }
  }

  async function change(param: string) {
  }

  return (
    <div className="min-h-[100vh] flex items-center justify-center py-10">
      <div className="flex flex-col mt-20 items-center bg-white w-8/12 p-5 max-lg:w-11/12">
        <div className="flex flex-col h-[300px] justify-around">
          <button
            onClick={() => {
              setClicked(true);
              setParamToChange("username");
            }}
          >
            {t("btnText.changeUsername")}
          </button>
          <button
            onClick={() => {
              setClicked(true);
              setParamToChange("email");
            }}
          >
            {t("btnText.changeEmail")}
          </button>
          <button
            onClick={() => {
              setClicked(true);
              setParamToChange("password");
            }}
          >
            {t("btnText.changePassword")}
          </button>
        </div>

        {clicked && (
          <form className="w-3/4 max-lg:w-11/12 bg-gray-300 p-5">
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {t("label.password")}
              </label>
              <input
                required
                value={firstPass}
                type="password"
                onChange={(e) => setFirstPass(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {t("label.retryPass")}
              </label>
              <input
                required
                onChange={(e) => setSecondPass(e.target.value)}
                value={secondPass}
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <div className="flex gap-2">
                  <span>{t("label.new")}</span>
                  <span>{t(`label.${paramToChange}`)}</span>
                </div>
              </label>
              <input
                required
                onChange={(e) => setChangingValue(e.target.value)}
                value={changingValue}
                type="text"
                id="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="my-3 text-red-500 font-bold">{error}</div>

            <div className="flex justify-between max-sm:flex-col max-sm:gap-5">
              <button
                onClick={(e) => {
                  submit(e);
                  change(changingValue);
                }}
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {t("btnText.change")}
              </button>
              <button onClick={() => setClicked(!clicked)}>
                {t("btnText.close")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
