import React, { useEffect } from "react";
import CustomModal from "../../../../Shared/CustomModal";
import EditCategoryModal from "../Category/EditCategoryModal";
import { useContext } from "react";
import CreateContext from "../../../CreateContex";
import { useState } from "react";
import { convertTimestamp } from "../../../../../lib/convertTimestampDateAndTime";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useQuery } from "react-query";
import { geBalanceHistory } from "../../../../../lib/helper";
import { server_url_v2 } from "../../../../../lib/config";

const CategoryTableData = ({ item, index, refetch,totalExpanseIncome }) => {
  const [queryFilter, setQueryFilter] = useState("");
  const [editCategoryModalOpen, setEditCategoryModalOpen] = useState(false);
  const [getCategoryId, setCategoryId] = useState(null);
  const { setHistoryName } = useContext(CreateContext);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [total,setTotal]=useState()
  const { date, time } = convertTimestamp(item?.createdAt);
  const handleCategoryUpdate = (id) => {
    setCategoryId(id);
  };


  useEffect(()=>{
      const total = totalExpanseIncome?.find(i=>i.title===item.title)
      setTotal(total)
  },[totalExpanseIncome,item])

  /* let url = `${server_url_v2}/accounts/account-history?sort=-createdAt&category=${item._id}`

  const { data, isLoading } = useQuery(
    ["Balance-History", item._id, queryFilter],
    () => {
        return geBalanceHistory(url, queryFilter);
    }
);

console.log(totalIncome) */
/* 
React.useEffect(() => {
  let income = 0;
  let expense = 0;

  data?.data?.Accounts?.forEach((transaction) => {
    if (transaction.type === "income") {
      income += transaction.historyAmount;
    } else if (transaction.type === "expense") {
      expense += transaction.historyAmount;
    }
  });

  setTotalIncome(income);
  setTotalExpense(expense);
}, [data]);

console.log(data) */


  return (
    <>
      <tr className="border-b border-opacity-20 border-gray-500 ">
        <td class="px-6  py-4 whitespace-wrap text-sm font-medium text-gray-800 ">
          {index + 1}
        </td>
        <td class="px-6 py-4  whitespace-wrap text-sm font-medium text-gray-800 ">
          {item?.title}
        </td>
        <td class="px-6 py-4  whitespace-wrap text-sm font-medium text-gray-800 ">
            ৳{total?.totalExpense - total?.totalReturn}
        </td>
        <td class="px-6 py-4  whitespace-wrap text-sm font-medium text-gray-800 ">
           ৳{total?.totalIncome}
        </td>

        <td class="px-6  py-4 whitespace-wrap text-sm font-medium text-gray-800 ">
          <div className=" flex items-center gap-2">
            <button
              onClick={() => {
                handleCategoryUpdate(item?._id);
                setEditCategoryModalOpen(true);
              }}
              className="py-2 px-3 flex items-center gap-1 bg-slate-200 rounded-md hover:bg-primary/70 hover:text-white duration-200"
            >
              <Icon icon="basil:edit-outline" className=" text-[17px]" />
              Edit
            </button>
            <Link onClick={()=>setHistoryName(item?.title)} href={`/admin/account/balance/history/${item._id}`} className="py-2 px-3 bg-slate-200 rounded-md flex items-center gap-1 hover:bg-primary/70 hover:text-white duration-200">
            <Icon icon="ic:baseline-history" className=" text-[17px]" />
              View History
            </Link>
          </div>
        </td>
      </tr>

      <CustomModal
        modalIsOpen={editCategoryModalOpen}
        setIsOpen={setEditCategoryModalOpen}
      >
        <EditCategoryModal
          setEditCategoryModalOpen={setEditCategoryModalOpen}
          id={getCategoryId}
          refetch={refetch}
          title={item?.title}
        />
      </CustomModal>
    </>
  );
};

export default CategoryTableData;

