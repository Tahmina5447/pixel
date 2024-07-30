import React from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import CalculateCard from './CalculateCard';
import { useState } from 'react';
import { useMemo } from 'react';
import CalculateItemCard from './CalculateItemCard';
import swal from 'sweetalert';
import { UpdateNewMethodHook } from '../../../../../lib/usePostHooks';
import { base_url_v2 } from '../../../../../lib/helper';

const CalculateList = ({ expenses, setExpense, refetch, rowrefetch, List, setList }) => {

  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const columnsId = useMemo(() => expenses?.map((col) => col.id), [expenses]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );


  // =======onDragStart funcation start here========
  function onDragStart(event) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.expense);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.item);
      return;
    }
  }

  // =======onDragStart funcation end here========


  // =======onDragEnd funcation start here========
  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;


    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;


    setExpense((columns) => {
      const activeColumnIndex = columns?.findIndex((col) => col._id === activeId);

      const overColumnIndex = columns?.findIndex((col) => col._id === overId);
      const body = arrayMove(columns, activeColumnIndex, overColumnIndex)

      const data2 = body?.map((item, i) => {
        return { ...item, columnPosition: i + 1 }
      })
      const url = `${base_url_v2}/expense-calculate/column-item-bulk-update`
      UpdateNewMethodHook(url, data2, refetch, rowrefetch)

      return data2;
    });
  }
  // =======onDragEnd funcation end here========

  // =======onDragOver funcation start here========
  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;
    if (isActiveATask && isOverATask) {
      setList((tasks) => {
        const activeIndex = tasks.findIndex((t) => t._id === activeId);
        const overIndex = tasks.findIndex((t) => t._id === overId);

        if (tasks[activeIndex].parentId != tasks[overIndex].parentId) {
          tasks[activeIndex].parentId = tasks[overIndex].parentId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        const body = arrayMove(tasks, activeIndex, overIndex)

        const data2 = body?.map((item, i) => {
          return { ...item, rowPosition: i + 1 }
        })
        if (data2) {
          const url = `${base_url_v2}/expense-calculate-sub-item/sub-item-bulk-update`
          UpdateNewMethodHook(url, data2, refetch, rowrefetch)
        }
       
        return data2;
      });
    }
    const isOverAColumn = over.data.current?.type === "Column";
    if (isActiveATask && isOverAColumn) {
      setList((tasks) => {
        const activeIndex = tasks.findIndex((t) => t._id === activeId);
        
        tasks[activeIndex].parentId = overId;
        const body = arrayMove(tasks, activeIndex, activeIndex)
        const data2 = body?.map((item, i) => {
          return { ...item, rowPosition: i + 1 }
        })

        if (data2) {
          const url = `${base_url_v2}/expense-calculate-sub-item/sub-item-bulk-update`
          UpdateNewMethodHook(url, data2, refetch, rowrefetch)
        }
        return data2;
      });
    }
  }
  // =======onDragOver funcation end here========


  return (
    <>
      <div className=' flex items-center justify-between'>
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <div className=" w-full">
            <div className="md:grid hidden xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full">
              <SortableContext items={columnsId}>
                {expenses?.map((expense) => (
                  // ======= dnd card main ========
                  <CalculateCard key={expense._id} refetch={refetch} rowrefetch={rowrefetch} expense={expense} List={List.filter(li => li.parentId === expense._id)} setList={setList} />
                ))}
              </SortableContext>
            </div>
          </div>



          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <CalculateCard expense={activeColumn} refetch={refetch} rowrefetch={rowrefetch} List={List.filter(li => li.parentId === activeColumn._id)} setList={setList} />
              )}
              {activeTask && (
                <CalculateItemCard
                  item={activeTask}
                />
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>

      <div className=' flex items-center justify-between'>
        <div className="grid md:hidden xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full">
          {expenses?.map((expense) => (
            // ======= dnd card main ========
            <CalculateCard key={expense._id} refetch={refetch} rowrefetch={rowrefetch} expense={expense} List={List.filter(li => li.parentId === expense._id)} setList={setList} />
          ))}
        </div>
      </div>

    </>
  )
}

export default CalculateList