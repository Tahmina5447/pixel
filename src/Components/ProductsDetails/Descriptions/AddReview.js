import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import StarRating from '../../../Shared/StarRating';
import { getAdminToken } from '../../../../lib/getToken';
import swal from 'sweetalert';
import { useRouter } from 'next/router';
import CustomButtonLoading from '../../../Shared/CustomButtonLoading';
import { server_url_v4 } from '../../../../lib/config';

const AddReview = ({id}) => {
    const [loading, setLoading] = useState(false);
    const [ratingValue, SetRatingValue] = useState(5);
    const router = useRouter();


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm();

    const addReview = (data) => {
        setLoading(true)
        const reviewInfo = {
            fullName: data?.name,
            comment: data?.comment,
            rating: ratingValue
        }
        fetch(`${server_url_v4}/review/create/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminToken()}`
            },
            body: JSON.stringify(reviewInfo),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.status === "success") {
                    setLoading(false)
                    swal("Review Added Successfully. After admin approved your comment will be publish.", {
                        icon: "success",
                    });
                    reset()
                    // setOpenModal(false)
                } else {
                    setLoading(false)
                    swal("Something is wrong.", {
                        icon: "error",
                    });
                    //   setOpenModal(false)
                }
            });

    }

    return (
        <div>
        <h1 className="text-xl md:text-2xl font-bold text-black mb-4">Write a Review For This Product</h1>
        <form
            onSubmit={handleSubmit(addReview)}
            className=""
        >


            <div className=" w-full">
                <div className="flex flex-col">
                <div className=" font-semibold mt-3 mb-4 w-full">
                        <p className="text-sm mb-2 font-bold">Select Rating</p>
                        <StarRating
                            SetRatingValue={SetRatingValue}
                            ratingValue={ratingValue}
                        />
                    </div>
                    <div className=" font-semibold">
                    
                        <p className="text-sm mb-2 font-bold">Name</p>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            className=" bg-accent rounded input input-sm text-xs py-5 input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className=" font-semibold mt-3 w-full">
                        <p className="text-sm mb-2 font-bold">Comment</p>
                        <textarea
                            type="text"
                            {...register("comment", { required: true })}
                            className="w-full rounded input input-sm text-xs h-20 bg-accent py-2 input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                            placeholder="Type your comment"
                        />
                    </div>
                
                    <button className="bg-primary rounded py-1 px-2 w-24 text-white mt-6">
                        {(loading) ? <CustomButtonLoading /> : 'Submit'}
                    </button>

                </div>

            </div>


        </form>
    </div>
    );
};

export default AddReview;