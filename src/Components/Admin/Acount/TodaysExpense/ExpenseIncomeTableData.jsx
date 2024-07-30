import React from "react";
import { convertTimestamp } from "../../../../../lib/convertTimestampDateAndTime";
import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomModal from "../../../../Shared/CustomModal";
import ReturnBalanceModal from "../Category/ReturnBalanceModal";
import { server_url_v2 } from "../../../../../lib/config";
import { useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { totalReturnOfExpense } from "../../../../../lib/totalReturnOfExpense";

const ExpenseIncomeTableData = ({ item, refetch, returnAllData,returnRefetch }) => {
  const { date, time } = convertTimestamp(item?.createdAt);
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [returnHistory, setReturnHistory] = useState({});

  const totalReturn = totalReturnOfExpense(item._id, returnAllData)

  return (
    <>
      <tr className="border-b border-opacity-20 border-gray-500 ">
        <td class="px-3 w-[250px] py-4 whitespace-wrap text-sm font-medium text-gray-800 ">
          <div className=" flex items-center gap-2">
            <div className="flex items-center justify-center">
              <div
                className={`${item?.type === "expense" && "bg-[#f0cfcd] text-red-400"
                  } p-2 rounded-md`}
              >
                {item?.type ? (
                  <>
                    {item?.type === "expense" && (
                      <Icon className="text-[18px] " icon="fluent-mdl2:sell" />
                    )}
                  </>
                ) : (
                  <>
                    <Icon
                      className="text-[20px] "
                      icon="grommet-icons:update"
                    />
                  </>
                )}
              </div>
            </div>
            <div>{item?.historyTitle}</div>
          </div>
        </td>
        <td class="px-6 py-4 w-[100px] whitespace-wrap text-sm font-medium text-gray-800 ">
          {item?.historyParentAccount?.accountName?.slice(0, 30)}
        </td>
        <td class="px-6 py-4 w-[100px] whitespace-wrap text-sm font-medium text-gray-800 ">
          ৳{item?.historyAmount - totalReturn}
        </td>
        <td class="px-6 py-4 w-[150px] whitespace-wrap text-sm font-medium text-gray-800 ">
          {item?.category?.title}
        </td>

        <td class="px-6 w-[300px] py-4 whitespace-wrap text-sm font-medium text-gray-800 ">
          {item?.note}
        </td>
        <td class="px-2 py-4 w-[150px] whitespace-wrap text-sm font-medium text-gray-800 ">
          <div>
            <span className="text-[12px] font-bold">{date}</span>
            {item?.type && (
              <div className="flex items-center gap-1 ">
                <div
                  className={`w-[10px] h-[10px] rounded-full ${(item?.type === "expense" && " bg-red-400") ||
                    (item?.type === "income" && " bg-green-400") ||
                    (item?.type === "return" && " bg-yellow-400")
                    }`}
                ></div>
                <span className="text-[14px] font-bold">{item?.type}</span>
              </div>
            )}
          </div>
        </td>
        <td class="px-3 py-4 whitespace-wrap text-sm font-medium text-gray-800 ">
          <div>
            <Tooltip anchorSelect="#expense_return">Return Balance</Tooltip>
            <button
              id="expense_return"
              onClick={() => setReturnModalOpen(true)}
              className="   border border-yellow-600  px-2 text-yellow-600 text-[15px] rounded flex items-center justify-between hover:text-white hover:bg-yellow-600 gap-1 "
            >
              Return{" "}
              <Icon
                icon="grommet-icons:return"
                className={`text-[10px]   mt-0`}
              />
            </button>
          </div>
          <div>
            {totalReturn > 0 && (
              <div className="flex items-center">
                <p className="">
                  <span className="font-extrabold uppercase text-[10px]">
                    Return:
                  </span>
                  <span className=" font-bold text-gray-500 text-xs">
                    ৳{totalReturn}
                  </span>
                </p>
              </div>
            )}
          </div>
        </td>
      </tr>

      <CustomModal modalIsOpen={returnModalOpen} setIsOpen={setReturnModalOpen}>
        <ReturnBalanceModal
          setReturnModalOpen={setReturnModalOpen}
          id={item?._id}
          refetch={refetch}
          returnRefetch={returnRefetch}
          expense={item.historyAmount}
          categoryId={item.category}
          returnHistory={returnAllData}
        />
      </CustomModal>
    </>
  );
};

export default ExpenseIncomeTableData;
