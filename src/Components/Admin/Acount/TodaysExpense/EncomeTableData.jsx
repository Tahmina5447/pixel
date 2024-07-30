import React from "react";
import { convertTimestamp } from "../../../../../lib/convertTimestampDateAndTime";
import { Icon } from "@iconify/react";


const EncomeTableData = ({ item }) => {
  const { date, time } = convertTimestamp(item?.createdAt);
  return (
    <>
      <tr className="border-b border-opacity-20 border-gray-500 ">
        <td class="px-6 w-[250px] py-4 whitespace-wrap text-sm font-medium text-gray-800 ">
          <div className=" flex items-center gap-2">
            <div className="flex items-center justify-center">
              <div
                className={`
                        ${
                          item?.type === "expense" &&
                          "bg-[#f0cfcd] text-red-400"
                        }
                        ${
                          item?.type === "income" && "bg-[#cdf0e4] text-primary"
                        }
                        ${
                          item?.type === "return" &&
                          "bg-[#f0ebcd] text-yellow-400"
                        }
                        ${
                          item?.type === undefined &&
                          "bg-[#cdd5f0] text-blue-400"
                        }
                         p-2 rounded-md `}
              >
                {item?.type ? (
                  <>
                    {item?.type === "expense" && (
                      <Icon
                        className="text-[20px] "
                        icon="icon-park-outline:expenses-one"
                      />
                    )}
                    {item?.type === "income" && (
                      <Icon
                        className="text-[20px] "
                        icon="game-icons:profit"
                      />
                    )}
                    {item?.type === "return" && (
                      <Icon
                        className="text-[20px] "
                        icon="streamline:computer-keyboard-return-3-enter-return-keyboard"
                      />
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
          ৳{item?.historyAmount}
        </td>
        <td class="px-6 py-4 w-[150px] whitespace-wrap text-sm font-medium text-gray-800 ">
          {item?.category?.title}
        </td>

        <td class="px-6 w-[350px] py-4 whitespace-wrap text-sm font-medium text-gray-800 ">
          {item?.note}
        </td>
        <td class="px-6 py-4 whitespace-wrap text-sm font-medium text-gray-800 ">
          <div>
            <span className="text-[12px] font-bold">{date}</span>
            {item?.type && (
              <div className="flex items-center gap-1 ">
                <div
                  className={`w-[10px] h-[10px] rounded-full ${
                    (item?.type === "expense" && " bg-red-400") ||
                    (item?.type === "income" && " bg-green-400") ||
                    (item?.type === "return" && " bg-yellow-400")
                  }`}
                ></div>
                <span className="text-[14px] font-bold">{item?.type}</span>
              </div>
            )}
          </div>
        </td>
      </tr>

    </>
  );
};

export default EncomeTableData;


// {
//   returnHistory?.totalReturn > 0 && <div className='flex items-center'>
//       <h1 className='text-xs mr-2 ml-1'>|</h1>
//       <p className=''><span className='font-extrabold uppercase text-[10px]'>Return:</span><span className=' font-bold text-gray-500 text-xs'> ৳{returnHistory?.totalReturn}</span></p>
//   </div>
// }