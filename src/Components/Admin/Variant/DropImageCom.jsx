import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BiImageAdd } from "react-icons/bi";
import { BsCloudUploadFill } from "react-icons/bs";
import Image from "next/image";
import CustomButtonLoading from "../../../Shared/CustomButtonLoading";

const SortableImage = ({ img, id, handleRemoveImage }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-[100px] h-auto p-1 relative bg-white shadow-md rounded-md mt-3"
    >
      <Image
        src={img}
        width="100"
        height="2"
        alt="category image"
        className="w-full h-full object-contain"
      />
      <button
        type="button"
        onClick={() => handleRemoveImage(id)}
        className="btn btn-outline btn-warning rounded-full bg-red-700 absolute right-0 top-0 btn-xs"
      >
        x
      </button>
    </div>
  );
};

const DropImageCom = ({
  imageUrl,
  setImageUrl,
  handleImageUpload,
  imageLoading = false,
}) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setImageUrl((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleRemoveImage = (id) => {
    setImageUrl((items) => items.filter((img) => img !== id));
  };

  return (
    <div className="block md:flex gap-5 mb-4">
      <div className="w-[30%] text-lg font-semibold mt-3">
        <p>Product Images</p>
      </div>
      <div className="w-full md:w-[70%]">
        <div className="relative border-4 border-dashed w-full h-[150px] text-center">
          {imageLoading ? (
            <div className=" flex items-center w-full justify-center h-full">
              <div className="dot-spinner2">
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
              </div>
            </div>
          ) : (
            <>
              <BsCloudUploadFill
                size={35}
                className="text-primary mx-auto block mt-8"
              />

              <p className="text-xl font-bold text-slate-900">
                Drag your image here
              </p>
              <span className="text-xs font-bold text-slate-900">
                (Only *.jpeg and *.png images will be accepted)
              </span>
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="opacity-0 absolute top-0 left-0 bottom-0 right-0 w-full h-full cursor-pointer"
              />
            </>
          )}
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={imageUrl} strategy={rectSortingStrategy}>
            <div className="flex flex-wrap gap-2">
              {imageUrl.map((img, index) => (
                <SortableImage
                  img={img}
                  id={img}
                  key={index}
                  handleRemoveImage={handleRemoveImage}
                />
              ))}
              <div className="relative w-[100px] h-[100px] p-1 bg-white shadow-md rounded-md mt-3 flex justify-center items-center">
                <span>
                  <BiImageAdd
                    size={45}
                    className="text-primary cursor-pointer hover:text-slate-700"
                  />
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="opacity-0 absolute top-0 left-0 bottom-0 right-0 w-full h-full cursor-pointer"
                  />
                </span>
              </div>
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default DropImageCom;
