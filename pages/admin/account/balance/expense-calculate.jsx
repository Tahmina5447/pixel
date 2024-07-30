import React from "react";
import DashboardLayout from "../../../../src/Components/DashboardLayout";
import { useState } from "react";
import CalculateList from "../../../../src/Components/Admin/Acount/ExpenseCalculate/CalculateList";
import ExCalculateOverViewCard from "../../../../src/Shared/ExpenseCalculate/ExCalculateOverViewCard";
import CustomHeadPart from "../../../../src/Shared/CustomHeadPart";
import { useQuery } from "react-query";
import { getAcount, getExpaince, getExpainceRow } from "../../../../lib/helper";
import { useEffect } from "react";
import LoadingComponets from "../../../../src/Shared/LoadingComponets";
import Reminders from "../../../../src/Components/Admin/Acount/ExpenseCalculate/Reminders";
import { Icon } from "@iconify/react";
import MoneyCard from "../../../../src/Components/Admin/Acount/Balance/MoneyCard";
import CustomModal from "../../../../src/Shared/CustomModal";
import AddMainExpenseCard from "../../../../src/Components/Admin/Acount/ExpenseCalculate/AddMainExpenseCard";
import { server_url_v2 } from "../../../../lib/config";

const ExpenseCalculate = () => {
  const [expense, setExpense] = useState([]);
  const [List, setList] = useState([]);
  const [activeTab, setActiveTab] = useState("expense");
  const [show, setShow] = useState(false);
  const { data, isLoading, refetch } = useQuery(["expaince"], () =>
    getExpaince()
  );

  const url = `${server_url_v2}/accounts/opening-balance`;

  const { data:totalData, } = useQuery(["accounts"], () =>
  getAcount(url)
);

  const expainseRow = useQuery(["ExpainceRow"], () => getExpainceRow());


  useEffect(() => {
    if (data?.status === "success") {
      setExpense(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (expainseRow.data?.status === "success") {
      setList(expainseRow.data.data.result);
    }
  }, [expainseRow.data]);

  const getTotalAmount = (transactions) => {
    let totalAmount = 0;
    for (const transaction of transactions) {
      totalAmount += transaction.amount;
    }
    return totalAmount;
  };

  const getPaidAmount = (transactions) => {
    const paidTransactions = transactions.filter(
      (transaction) => transaction.isPaid === "paid"
    );
    const totalPaidAmount = paidTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
    return totalPaidAmount;
  };

  const getDueAmount = (transactions) => {
    const paidTransactions = transactions.filter(
      (transaction) => transaction.isPaid === "unpaid"
    );
    const totalPaidAmount = paidTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
    return totalPaidAmount;
  };

  return (
    <DashboardLayout>
      <div className="">
        <div>
          <CustomHeadPart
            title={"EXPENSES BUDGET CALCULATOR"}
            refetch={refetch}
          />
        </div>
        <div className=" grid md:grid-cols-3 grid-cols-1 gap-5 my-5">
          {/* <ExCalculateOverViewCard
            {...{ amount: getTotalAmount(List), title: "total balance" }}
          /> */}
          <MoneyCard
            {...{
              iconColor: "bg-primary/70",
              title: "Total Available Balance",
              amount: totalData?.totalAmount,
              icon: (
                <Icon
                  icon="icon-park-outline:bank-card"
                  color="#fff"
                  fontSize={22}
                />
              ),
            }}
          />
          <MoneyCard
            {...{
              iconColor: "bg-red-500",
              title: "total paid expenses",
              amount: getPaidAmount(List),
              icon: <Icon icon="fluent-mdl2:sell" color="#fff" fontSize={22} />,
            }}
          />
          <MoneyCard
            {...{
              iconColor: "bg-red-500",
              title: "total due expenses",
              amount: getDueAmount(List),
              icon: <Icon icon="fluent-mdl2:sell" color="#fff" fontSize={22} />,
            }}
          />
          {/* <ExCalculateOverViewCard
            {...{ amount: getPaidAmount(List), title: "total paid expense" }}
          /> */}
          {/* <ExCalculateOverViewCard
            {...{ amount: getDueAmount(List), title: "total due expense" }}
          /> */}
        </div>

        <div className=" bg-white rounded-md drop-shadow-md">
          {/* <hr className='h-[2px] mt-[-2px] bg-slate-200' /> */}
        </div>

        <div className="mt-10">
          <div className=" flex items-center justify-between">
            <h2 className=" font-bold text-[20px]">All Expenses</h2>
            <button
              onClick={() => setShow(true)}
              className="btn btn-primary font-bold  flex items-center justify-center gap-2 text-white"
            >
              <Icon icon="mingcute:add-fill" className="text-[20px]" /> Add
              Expenses Card
            </button>
          </div>

          <div className=" duration-300">
            {isLoading ? (
              <>
                <LoadingComponets />
              </>
            ) : (
              <>
                <div className=" mt-2">
                  <CalculateList
                    expenses={expense}
                    setExpense={setExpense}
                    refetch={refetch}
                    rowrefetch={expainseRow.refetch}
                    List={List}
                    setList={setList}
                  />
                </div>
              </>
            )}
          </div>
          {/* {activeTab === "Reminders" && (
            <div className=" duration-300 mt-8">
              <Reminders />
            </div>
          )} */}
        </div>

        <CustomModal modalIsOpen={show} setIsOpen={setShow}>
          <AddMainExpenseCard setIsOpen={setShow} refetch={refetch} />
        </CustomModal>
      </div>
    </DashboardLayout>
  );
};

export default ExpenseCalculate;
