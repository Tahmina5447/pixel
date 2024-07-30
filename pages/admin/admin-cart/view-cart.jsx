import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../src/Components/DashboardLayout";
import AdminDashboardBreadcrumb from "../../../src/Shared/AdminDashboardBreadcrumb";

import { BsCloudUploadFill } from "react-icons/bs";
import { TagsInput } from "react-tag-input-component";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import swal from "sweetalert";
import Image from "next/image";
import { getAdminToken } from "../../../lib/getToken";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProductShowModal from "../../../src/Shared/ProductShowModal";
import AdminProductDetails from "../../../src/Shared/AdminProductDetails";

const ViewCart = () => {
  const [selectedChildCategory, setSelectedChildCategory] = useState([]);
  const [imageUrl, setImageUrl] = useState(false);
  const [category, setCategory] = useState([]);
  const router = useRouter();
  const id = router.query.id;
  const [modalIsOpen, setIsOpenModal] = React.useState(false);
  const [modalProductData, setModalProductData] = React.useState({});

  let url = `http://localhost:5000/api/v4/cart/get-by-phone/${id}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setCategory(data.data);
        }
      });
  }, [id, imageUrl]);

  // ------------------------------------handle category add-------------------------
  const handleUpdateCategory = (item) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Product.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(
          `http://localhost:5000/api/v4/cart/delete-product/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getAdminToken()}`,
            },
            body: JSON.stringify({ item }),
          }
        )
          .then((res) => res.json())
          .then((result) => {
            if (result.status == "success") {
              swal("Product delete successfully.", {
                icon: "success",
              });
              setImageUrl(!imageUrl);
            } else {
              swal(result?.message, {
                icon: "error",
              });
            }
          })
          .catch((error) => { });
      } else {
        swal("Category is safe!");
      }
    });
  };

  return (
    <DashboardLayout>
      <div className="mid-container">
        <AdminDashboardBreadcrumb
          title={"View Customer Cart"}
          subtitle={"view Customer Cart and necessary information from here"}
        />

        <div className=" mt-5 grid md:grid-cols-2 grid-cols-1 gap-5 ">
          {category?.products?.reverse().map((item, index) => (
            <div
              key={index}
              className=" bg-white shadow-md p-5 rounded-lg flex items-start gap-2"
            >
              <div className="w-[100px]">
                <Image
                  src={item?.product?.imageURLs[0]}
                  width={200}
                  height={200}
                  className="w-[100px] h-[100px] rounded-xl "
                  alt="product"
                />
              </div>
              <div className="w-[80%]">
                <h2>{item?.product?.name}</h2>
                <div className="sm:flex items-center gap-1 mb-1 md:text-lg text-[11px]  sm:font-bold ">
                  <p className=" text-primary ">
                    BDT {item?.product?.salePrice}
                  </p>
                  <s className=" text-gray-400 ">
                    BDT {item?.product?.productPrice}
                  </s>
                </div>
                <div>
                  <p className="  ">Quantity : {item?.quantity}</p>
                </div>
                <div className=" flex items-center gap-2">
                  <button
                    className=" py-1 rounded-lg px-5 border-2 "
                    onClick={() => {
                      setIsOpenModal(true);
                      setModalProductData(item.product);
                    }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleUpdateCategory(item?.product?._id)}
                    className=" py-1 px-5 border-2 border-red-300 hover: text-red-500 rounded-lg "
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ToastContainer />
      </div>

      <ProductShowModal
        modalIsOpen={modalIsOpen}
        setIsOpenModal={setIsOpenModal}
      >
        {/* <AdminProductDetails product={modalProductData} /> */}
        <div className="max-w-[600px] py-5">
          <AdminProductDetails product={modalProductData} />
        </div>
      </ProductShowModal>
    </DashboardLayout>
  );
};

export default ViewCart;
