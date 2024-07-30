import { useState } from "react";
import CustomModal from "../../../Shared/CustomModal";
import { Tooltip } from 'react-tooltip';
import { FaTrashAlt } from "react-icons/fa";
import { server_url_v4 } from "../../../../lib/config";
import swal from 'sweetalert';
import { deleteMethodHook } from "../../../../lib/deleteMethodHook";
import { getAdminToken } from "../../../../lib/getToken";
import Image from "next/image";

const ReviewTableItems = ({ review, index ,refetch}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [reviewStatus, setReviewStatus] = useState("inactive")

  const handleDelteReview = (id) => {
    const url = `${server_url_v4}/review/delete/${id}`;
    deleteMethodHook(url, refetch);
  };


  console.log(review)

  const handleUpdateReview=(id)=>{

    const reviewInfo={
      status:reviewStatus
    }
    fetch(
      `${server_url_v4}/review/update/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getAdminToken()}`
        },
        body: JSON.stringify(reviewInfo),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.status == "success") {
          swal("Review updated successfully.", {
            icon: "success",
          });
          refetch()
        }
        if (result.status !== "success") {
          // console.log(result)
          swal("Something is wrong.", {
            icon: "error",
          });
        }
      });
  }
  return (
    <>
      <tr
        className={`py-2 text-center`}
      >
        <td>
          <Image src={review?.product?.imageURLs[0]} width={60} height={60} alt="product"/>
        </td>
        <td ><div className="w-[200px] flex items-center"><p className=" ">{review?.product?.name?.slice(0,50)}</p></div></td>
        <td>{review?.fullName}</td>
        <td>
          <button onClick={() => setModalOpen(true)}>
            {review?.comment.slice(0, 25)}...
          </button>

        </td>
        <td>
        <span className="flex items-center flex-wrap gap-3">

        {review?.status==="inactive" ? (
            <button
              onClick={() => {handleUpdateReview(review?._id); setReviewStatus("active")}}
              className="btn btn-xs border-none bg-success text-white"
            >
              Publish
            </button>
          ) : (
            <button
            onClick={() => {handleUpdateReview(review?._id); setReviewStatus("inactive")}}
              className="btn uppercase btn-xs btn-success text-white font-bold"
            >
              Active
            </button>
          )}
          <span className="flex justify-center gap-2 ">
            <Tooltip anchorSelect="#delete-review">
              Delete
            </Tooltip>
            <button
              id="delete-review"
              onClick={() => handleDelteReview(review?._id)}
              className="cursor-pointer"
            >
              <FaTrashAlt size={15} className="text-red-600 block mx-auto " />
            </button>
          </span>
        </span>
        </td>

      </tr>
      <CustomModal modalIsOpen={modalOpen} setIsOpen={setModalOpen}>
        <div>
          <p className="text-justify p-3">{review?.comment}</p>
        </div>
      </CustomModal>

    </>
  );
};

export default ReviewTableItems;
