import React from "react";
import CustomModal from "../../../../Shared/CustomModal";
import AddCategoryModal from "./AddCategoryModal";
import { useFetchVersionTwo } from "../../../../hooks/usePublicFetchVersionTwo";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomeInput from "../../../../Shared/AddressInput/CustomeInput";
import { Icon } from "@iconify/react";
import { server_url_v2 } from "../../../../../lib/config";
import Select from "react-select";
import {
  ModalPostMethodHook,
  updateExpanseHook,
} from "../../../../../lib/usePostHooks";
import { base_url_v2 } from "../../../../../lib/helper";
import CustomButtonLoading from "../../../../Shared/CustomButtonLoading";
import swal from "sweetalert";

const UpdateExpense = ({
  setAddExpenseModalOpen,
  amount,
  title,
  id,
  refetchToDayDue,
  overRefetch,
  accountRefetch,
}) => {
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allAccounts, setAllAccounts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [acountblance, setAccountBlance] = useState();

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
  } = useForm();

  // get acount funcation
  useEffect(() => {
    fetch(`${server_url_v2}/accounts/opening-balance`)
      .then((res) => res.json())
      .then((data) => {
        setAllAccounts(data?.data?.Accounts);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);



  // set select acount blance
  useEffect(() => {
    const filter = allAccounts.find((item) => item._id === selectedAccount);
    setAccountBlance(filter?.amount);
  }, [selectedAccount]);

  // input funcation
  const handleSelectedAccount = (event) => {
    setSelectedAccount(event.target.value);
  };
  const handleSelectedCategory = (event) => {
    setSelectedCategory(event.value);
  };

  // get Acount Category
  const {
    data: categories,
    isLoading,
    refetch,
  } = useFetchVersionTwo(["expense-category"], "expense-category");
  const allCategories = categories?.data?.result?.result;

  // add expance
  const addExpense = (data) => {
    const url = `${server_url_v2}/expenses`;
    const updateUrl = `${server_url_v2}/expense-calculate-sub-item/${id}`;
    const body = {
      title: title,
      note: data.note,
      category: selectedCategory,
      amount: amount,
      fromBalance: selectedAccount,
      type: "expense",
    };
    const updateBody = {
      isPaid: "paid",
    };

    if (amount > acountblance) {
      swal("error", "Your Account Balance Is Low", "error");
    } else {
      updateExpanseHook(
        updateUrl,
        updateBody,
        refetchToDayDue,
        setAddExpenseModalOpen,
        overRefetch,
        accountRefetch
      );
      ModalPostMethodHook(
        url,
        body,
        refetchToDayDue,
        setLoading,
        setAddExpenseModalOpen
      );
    }
  };



  return (
    <div className="w-[320px] sm:w-[630px] md:w-[700px]">
      <form onSubmit={handleSubmit(addExpense)} className=" my-5">
        <h1 className="text-xl font-bold mb-7">Update Expense</h1>
        <div className="md:flex items-center gap-5 mt-0 md:mt-3">
          <div className=" w-full ">
            <label htmlFor="name" className="leading-7 text-sm font-bold ">
              <p>Account Name :</p>
            </label>
            <div className="w-full">
              <select
                onChange={handleSelectedAccount}
                value={selectedAccount}
                className=" border px-[5px] py-[11px] rounded-md w-full outline-none  focus:border-primary "
                placeholder="Choose Your Account Name"
              >
                <option hidden>Select...</option>
                {allAccounts?.map((account, index) => (
                  <option className=" py-2" value={account._id} key={index}>
                    {account?.accountName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className=" w-full my-3 md:my-0">
            <label htmlFor="name" className="leading-7 text-sm font-bold ">
              <p>Category :</p>
            </label>
            <div className=" flex w-full">
              <Select
                defaultValue={selectedCategory}
                onChange={handleSelectedCategory}
                // isMulti
                name="colors"
                required
                options={allCategories?.map((category) => {
                  return { value: category?._id, label: category?.title };
                })}
                className="w-full outline-none py-1 border rounded-md rounded-e-none focus:border-primary "
                id="choose_account_category"
                classNamePrefix="select"
              />
              <div
                onClick={() => setAddCategoryModalOpen(true)}
                className="flex items-center rounded-e-md border hover:bg-white border-s-0 bg-primary px-3"
              >
                <Icon
                  className="bg-primary cursor-pointer text-white rounded-full"
                  icon="ooui:add"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:mt-4">
          <label htmlFor="name" className="leading-7 text-sm font-bold ">
            Note
          </label>
          <textarea
            name={"note"}
            placeholder={"Write Note"}
            {...register("note", { required: "Note is required" })}
            onKeyUp={(e) => {
              trigger("note");
            }}
            className="shadow-sm border outline-none focus:border-primary  bg-white  text-black w-full p-3 flex items-center justify-between rounded-lg"
          ></textarea>
          <small className="text-[#FF4B2B] text-xs font-medium my-2">
            {errors?.note?.message}
          </small>
        </div>

        <div className=" mt-10 mb-5">
          <button
            type="submit"
            className={`btn border-none bg-primary text-white `}
          >
            {loading ? <CustomButtonLoading /> : `Save`}
          </button>
        </div>
      </form>
      <CustomModal
        modalIsOpen={addCategoryModalOpen}
        setIsOpen={setAddCategoryModalOpen}
      >
        <AddCategoryModal
          setAddCategoryModalOpen={setAddCategoryModalOpen}
          refetch={refetch}
        />
      </CustomModal>
    </div>
  );
};

export default UpdateExpense;
