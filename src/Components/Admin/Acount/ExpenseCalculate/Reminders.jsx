import React from 'react'
import { useState } from 'react'
import ExpenseToDay from '../TodaysExpense/ExpenseToDay'
import AllExpense from '../TodaysExpense/AllExpense'

const Reminders = () => {

  const [active, setActive] = useState("today")


  return (
    <div className=''>
      <div className=' bg-primary/30 flex items-center gap-2 m-auto md:p-2 p-1 w-full rounded-md'>
        <button onClick={() => setActive("today")} className={`py-3 md:px-4 rounded-md w-full font-bold ${active === "today" ? "text-white bg-primary" : " bg-transparent"}`}>TODAYS EXPENSE </button>
        <button onClick={() => setActive("all")} className={`py-3 md:px-4 rounded-md w-full font-bold ${active === "all" ? "text-white bg-primary" : " bg-transparent"}`}>All EXPENSE </button>
      </div>

      <div>
        { active === "today" ? <ExpenseToDay /> :  <AllExpense />}
      </div>
    </div>
  )
}

export default Reminders