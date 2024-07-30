import React from "react";
import DashboardLayout from "../../../../src/Components/DashboardLayout";
import { Icon } from "@iconify/react";
import CustomModal from "../../../../src/Shared/CustomModal";
import { useState } from "react";
import AddBalance from "../../../../src/Components/Admin/Acount/Balance/AddBalance";
import BalanceCard from "../../../../src/Components/Admin/Acount/Balance/BalanceCard";
import { useQuery } from "react-query";
import { getAccountingOverview, getAcount } from "../../../../lib/helper";
import LoadingComponets from "../../../../src/Shared/LoadingComponets";
import { server_url_v2 } from "../../../../lib/config";
import TodayDueExpense from "../../../../src/Components/Admin/Acount/TodaysExpense/TodayDueExpense";
import AdminDashboardBreadcrumb from "../../../../src/Shared/AdminDashboardBreadcrumb";
import MoneyCard from "../../../../src/Components/Admin/Acount/Balance/MoneyCard";
import DatePicker from "react-datepicker";
import { useEffect } from "react";
import { convertTimestamp2 } from "../../../../lib/convertTimestampDateAndTime";
import ExpenseIncomeAdd from "../../../../src/Components/Admin/Acount/Category/ExpenseIncomeAdd";

const Balance = () => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState("");

  const url = `${server_url_v2}/accounts/opening-balance`;
  // expenses/overview-expense-income-return

  //http://localhost:5000/api/v2/expenses/overview-expense-income-return?startDate=&endDate=

  const [balanceAddShow, setBalanceAddShow] = useState(false);
  // filter date-------------------
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [queryFilter, setQueryFilter] = useState("");
  const {
    data: overview,
    isLoading: isOverLoading,
    refetch: overRefetch,
  } = useQuery(["accounting-dashboard-overview-d", queryFilter], () => {
    return getAccountingOverview(queryFilter);
  });
  useEffect(() => {
    if (startDate === null) {
      setQueryFilter("");
    } else if (startDate && endDate) {
      const formattedStartDate = convertTimestamp2(startDate);
      const formattedEndDates = convertTimestamp2(endDate);
      setQueryFilter(
        `startDate=${formattedStartDate}&endDate=${formattedEndDates}`
      );
      overRefetch([
        "accounting-dashboard-overview",
        formattedStartDate,
        formattedEndDates,
      ]);
    }
  }, [startDate, endDate, overRefetch]);

  // here get all bank account and total amount
  const { data, isLoading, refetch } = useQuery(["accounts"], () =>
    getAcount(url)
  );
  // overview of accounting
  // const { data: overview, isLoading: isOverLoading, refetch: overRefetch } = useQuery(["overview", urlOfOverview], () => getAcount(urlOfOverview));
  // due ache loading ta laganu

  // ekahne sudo 3 ta total wiht date filter

  return (
    <>
      <DashboardLayout>
        <section className=" mb-16">
          <AdminDashboardBreadcrumb title={"Accounts Overview"} />
          {/* onClick={() => setBalanceAddShow(true)} */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-3 justify-end mt-5">
            <span className=" ">
              {" "}
              <button
                onClick={() => {
                  setShow(true);
                  setType("expense");
                }}
                className="btn bg-red-500 w-full btn-xs text-white flex items-center gap-1"
              >
                <Icon icon="fluent-mdl2:sell" color="#fff" fontSize={15} />
                Add New Expenses
              </button>
            </span>
            <span className="">
              <button
                onClick={() => {
                  setShow(true);
                  setType("income");
                }}
                className="btn bg-green-500 w-full btn-xs text-white flex items-center gap-1 ]"
              >
                <Icon icon="game-icons:profit" color="#fff" fontSize={17} />
                Add New Income
              </button>
            </span>
            <span className="hidden md:block"></span>

            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              isClearable={true}
              placeholderText="Filter By Date"
              className={`w-full ${startDate && endDate
                ? "border-2 border-primary"
                : "border border-primary/60"
                }  rounded-md pl-2 pr-8 py-1 outline-primary`}
            />
          </div>
          <div className="mt-2">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 ">
              <MoneyCard
                {...{
                  iconColor: "bg-primary/70",
                  title: "Total Balance",
                  amount: data?.totalAmount,
                  icon: (
                    <Icon
                      icon="icon-park-outline:bank-card"
                      color="#fff"
                      fontSize={22}
                    />
                  ),
                }}
              />
              <div
                className={
                  startDate &&
                  endDate &&
                  "shadow-lg shadow-primary border-2 rounded-md border-primary"
                }
              >
                <MoneyCard
                  {...{
                    iconColor: "bg-red-500",
                    title: "Total Expensed",
                    amount: overview?.data?.totalExpense,
                    icon: (
                      <Icon
                        icon="fluent-mdl2:sell"
                        color="#fff"
                        fontSize={22}
                      />
                    ),
                  }}
                />
              </div>
              <div
                className={
                  startDate &&
                  endDate &&
                  "shadow-lg shadow-primary border-2 rounded-md border-primary"
                }
              >
                <MoneyCard
                  {...{
                    iconColor: "bg-green-500",
                    title: "Total Income",
                    amount: overview?.data?.totalIncome,
                    icon: (
                      <Icon
                        icon="game-icons:profit"
                        color="#fff"
                        fontSize={22}
                      />
                    ),
                  }}
                />
              </div>
              <div
                className={
                  startDate &&
                  endDate &&
                  "shadow-lg shadow-primary border-2 rounded-md border-primary"
                }
              >
                <MoneyCard
                  {...{
                    iconColor: "bg-yellow-500",
                    title: "Total Return",
                    amount: overview?.data?.totalReturnMoney,
                    icon: (
                      <Icon
                        icon="fluent-mdl2:return-key"
                        color="#fff"
                        fontSize={22}
                      />
                    ),
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 ">
              <MoneyCard
                {...{
                  iconColor: "bg-red-500",
                  title: "This Month Total Expenses",
                  amount: overview?.data?.thisMonthExpense,
                  icon: (
                    <Icon icon="fluent-mdl2:sell" color="#fff" fontSize={22} />
                  ),
                }}
              />
              <MoneyCard
                {...{
                  iconColor: "bg-red-500",
                  title: "Today Expenses",
                  amount: overview?.data?.todayExpense,
                  icon: (
                    <Icon icon="fluent-mdl2:sell" color="#fff" fontSize={22} />
                  ),
                }}
              />
              <MoneyCard
                {...{
                  iconColor: "bg-green-500",
                  title: "This Month Income",
                  amount: overview?.data?.thisMonthIncome,
                  icon: (
                    <Icon icon="game-icons:profit" color="#fff" fontSize={22} />
                  ),
                }}
              />
              <MoneyCard
                {...{
                  iconColor: "bg-green-500",
                  title: "Today Income",
                  amount: overview?.data?.todayIncome,
                  icon: (
                    <Icon icon="game-icons:profit" color="#fff" fontSize={22} />
                  ),
                }}
              />
              <div
                className={
                  startDate &&
                  endDate &&
                  "shadow-lg shadow-primary border-2 rounded-md border-primary"
                }
              >
                <MoneyCard
                  {...{
                    iconColor: "bg-red-700",
                    title: "Total Due Expenses",
                    amount: overview?.data?.totalDueExpense,
                    icon: (
                      <Icon icon="gg:calendar-due" color="#fff" fontSize={22} />
                    ),
                  }}
                />
              </div>
              <MoneyCard
                {...{
                  iconColor: "bg-red-700",
                  title: "This Month Due Expenses",
                  amount: overview?.data?.thisMonthDueExpense,
                  icon: (
                    <Icon icon="gg:calendar-due" color="#fff" fontSize={22} />
                  ),
                }}
              />
              <MoneyCard
                {...{
                  iconColor: "bg-red-700",
                  title: "Today Due Expenses",
                  amount: overview?.data?.todayDueExpense,
                  icon: (
                    <Icon icon="gg:calendar-due" color="#fff" fontSize={22} />
                  ),
                }}
              />
            </div>
          </div>
          {/* -----------------all bank account------------- */}
          <div className="mt-8 md:mt-12">
            {/* ==== Balance Card==== */}
            <div className="block md:flex gap-8 items-center justify-between">
              {" "}
              <h2 className="text-xl font-bold text-slate-600 uppercase">
                Accounts Balance
              </h2>
              <button
                onClick={() => setBalanceAddShow(true)}
                className="btn btn-primary my-2 btn-xs rounded-md text-white flex items-center justify-center"
              >
                <Icon fontSize={22} icon="ic:baseline-add" />
                Add New Account
              </button>
            </div>

            {!isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 flex-wrap">
                {data?.data?.Accounts?.map((account, index) => (
                  <BalanceCard
                    key={index}
                    customStyle={{
                      topBg: "hsl(195, 74%, 62%)",
                      mainBg: account.bgColor,
                    }}
                    account={account}
                    refetch={refetch}
                  />
                ))}
              </div>
            ) : (
              <LoadingComponets />
            )}
          </div>

          {/* ------------------todays expense------------------ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <TodayDueExpense
              day={"today"}
              overRefetch={overRefetch}
              accountRefetch={refetch}
            />
            <TodayDueExpense
              day={"all"}
              overRefetch={overRefetch}
              accountRefetch={refetch}
            />
          </div>
        </section>
      </DashboardLayout>

      {/* ====add Opening Balance Modale==== */}
      <CustomModal modalIsOpen={balanceAddShow} setIsOpen={setBalanceAddShow}>
        <AddBalance refetch={refetch} setBalanceAddShow={setBalanceAddShow} />
      </CustomModal>

      {/* ====add expanse and income==== */}
      <CustomModal modalIsOpen={show} setIsOpen={setShow}>
        <ExpenseIncomeAdd
          setShow={setShow}
          type={type}
          overRefetch={overRefetch}
          accountRefetch={refetch}
        />
      </CustomModal>
    </>
  );
};

export default Balance;
