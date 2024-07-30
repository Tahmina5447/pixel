import Link from "next/link";
import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi"
import CustomModal from "../../../../Shared/CustomModal";
import BalanceUpdate from "./BalanceUpdate";
import BalanceHistory from "./BalanceHistory";
import TransferBalance from "./TransferBalance";
import CreateContext from "../../../CreateContex";
import { useContext } from "react";

const BalanceCard = ({ account, customStyle, refetch }) => {
  {/* ==== update modal state ==== */ }
  const [updateShow, setUodateShow] = useState(false)
  {/* ==== history modal state ==== */ }
  const [historyShow, sethistoryShow] = useState(false)
  {/* ==== transfer modal state ==== */ }
  const [transferShow, setTransferShow] = useState(false)
  const { setHistoryName } = useContext(CreateContext)

  return (
    <>
      {/*   <div>
        <div className="adminCard work">
          <div
            className={`img-section`}
            style={{ background: customStyle?.topBg }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="77" width="76">
              <path
                fillRule="nonzero"
                fill="#3F9CBB"
                d="m60.91 71.846 12.314-19.892c3.317-5.36 3.78-13.818-2.31-19.908l-26.36-26.36c-4.457-4.457-12.586-6.843-19.908-2.31L4.753 15.69c-5.4 3.343-6.275 10.854-1.779 15.35a7.773 7.773 0 0 0 7.346 2.035l7.783-1.945a3.947 3.947 0 0 1 3.731 1.033l22.602 22.602c.97.97 1.367 2.4 1.033 3.732l-1.945 7.782a7.775 7.775 0 0 0 2.037 7.349c4.49 4.49 12.003 3.624 15.349-1.782Zm-24.227-46.12-1.891-1.892-1.892 1.892a2.342 2.342 0 0 1-3.312-3.312l1.892-1.892-1.892-1.891a2.342 2.342 0 0 1 3.312-3.312l1.892 1.891 1.891-1.891a2.342 2.342 0 0 1 3.312 3.312l-1.891 1.891 1.891 1.892a2.342 2.342 0 0 1-3.312 3.312Zm14.19 14.19a2.343 2.343 0 1 1 3.315-3.312 2.343 2.343 0 0 1-3.314 3.312Zm0 7.096a2.343 2.343 0 0 1 3.313-3.312 2.343 2.343 0 0 1-3.312 3.312Zm7.096-7.095a2.343 2.343 0 1 1 3.312 0 2.343 2.343 0 0 1-3.312 0Zm0 7.095a2.343 2.343 0 0 1 3.312-3.312 2.343 2.343 0 0 1-3.312 3.312Z"
              ></path>
            </svg>
          </div>
          <div style={{ background: customStyle?.mainBg }} className={`adminCard-desc cursor-default shadow-xl `}>
            <div className=" flex items-center justify-between">
              <div className=" text-2xl font-bold uppercase">{account.accountName}</div>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <HiDotsVertical size={20} />
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box text-black w-40"
                >
                  <li>
                    <div onClick={() => setUodateShow(true)}>Update Balance</div>
                  </li>
                  <li>
                    <div onClick={()=>setTransferShow(true)} className="justify-between text-black">
                      Transfer Balance
                    </div>
                  </li>
                  <li>
                    <Link onClick={()=>setHistoryName(account.accountName)} href={`/admin/account/balance/accountHistory/${account._id}`} className="justify-between text-black">
                      Balance History
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="adminCard-time">
              ৳{account.amount}
            </div>
          </div>
        </div>
      </div> */}
      {/* ------------------------------old here */}
        <div className="rounded-md shadow-md" style={{ borderBottom: `4px solid ${customStyle?.mainBg} ` }}>
          {/* customStyle?.mainBg */}
          <div className="bg-white p-3 rounded-md">
            <div className=" flex items-center justify-between">
              <div className="">
                <p className="text-xs text-slate-600 uppercase">{account.accountName}</p>
                <p className="font-bold">  ৳{account.amount}</p>
              </div>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <HiDotsVertical size={20} />
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-1 p-2 shadow bg-base-100 rounded-sm text-black w-40"
                >
                  <li>
                    <div onClick={() => setUodateShow(true)}>Update Balance</div>
                  </li>
                  <li>
                    <div onClick={() => setTransferShow(true)} className="justify-between text-black">
                      Transfer Balance
                    </div>
                  </li>
                  <li>
                    <Link onClick={() => setHistoryName(account.accountName)} href={`/admin/account/balance/accountHistory/${account._id}`} className="justify-between text-black">
                      Balance History
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>

      {/* ==== update modal ==== */}
      <CustomModal CustomModal modalIsOpen={updateShow} setIsOpen={setUodateShow} >
        <BalanceUpdate refetch={refetch} modalheiden={setUodateShow} account={account} />
      </CustomModal >
      {/* ==== history modal ==== */}
      <CustomModal CustomModal modalIsOpen={historyShow} setIsOpen={sethistoryShow} >
        <BalanceHistory id={account._id} accountName={account.accountName} />
      </CustomModal >
      {/* ==== history modal ==== */}
      <CustomModal CustomModal modalIsOpen={transferShow} setIsOpen={setTransferShow} >
        <TransferBalance refetch={refetch} modalheiden={setTransferShow} account={account} />
      </CustomModal >
    </>
  );
};

export default BalanceCard;
