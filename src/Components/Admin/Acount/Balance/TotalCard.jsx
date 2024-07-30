import Link from "next/link";
import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi"
import CustomModal from "../../../../Shared/CustomModal";
// import BalanceUpdate from "./BalanceUpdate";
// import TransferBalance from "./TransferBalance";
import BalanceHistory from "./BalanceHistory";
import { useContext } from "react";
import CreateContext from "../../../CreateContex";

const TotalCard = ({ customStyle, totalAmount }) => {
  {/* ==== update modal state ==== */ }
  const [updateShow, setUodateShow] = useState(false)
  {/* ==== history modal state ==== */ }
  const [historyShow, sethistoryShow] = useState(false)
  {/* ==== transfer modal state ==== */ }
  //   const [transferShow, setTransferShow] = useState(false)
  const { setHistoryName } = useContext(CreateContext)

  return (
    <>
      <div className="rounded-md shadow-md" style={{ borderBottom: `4px solid ${customStyle?.mainBg} ` }}>
        {/* customStyle?.mainBg */}
        <div className="bg-white p-3 rounded-md">
          <div className=" flex items-center justify-between">
            <div className="">
              <p className="text-xs text-slate-600 uppercase">Total Balance</p>
              <p className="font-bold">  ৳{totalAmount}</p>
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <HiDotsVertical size={20} />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box text-black w-40"
              >
                <li>
                  <Link onClick={() => setHistoryName("Total amount")} href={`/admin/account/balance/accountHistory/${123}`} className="justify-between text-black">
                    Balance History
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>


      {/* ==== history modal ==== */}
      <CustomModal modalIsOpen={historyShow} setIsOpen={sethistoryShow}>
        <BalanceHistory id={null} accountName={"Total amount"} />
      </CustomModal>
    </>
  );
};

export default TotalCard;
