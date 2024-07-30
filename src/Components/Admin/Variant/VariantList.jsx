import React, { useContext } from "react";
import { AiFillEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import swal from "sweetalert";

import { useRouter } from "next/router";
import { Tooltip } from "react-tooltip";
import handleDelete from "../../../../lib/handleDelete";
import CreateContext from "../../CreateContex";
import Image from "next/image";
import CustomModal from "../../../Shared/CustomModal";
import UpdateVariant from "./UpdateVariant";
import server_url from "../../../../lib/config";

const VariantList = ({
  product,
  productId,
  item,
  index,
  setReloader,
  reolder,
}) => {
  const [modalIsOpen, setIsOpenModal] = React.useState(false);
  const [modalProductData, setModalProductData] = React.useState({});
  const router = useRouter();

  let fethUrl = `${server_url}/variant/delete/${productId}/`;

  const handleDeleteProduct = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Variant.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fethUrl += id;
        handleDelete(fethUrl, setReloader, reolder);
      } else {
        swal("Product is safe!");
      }
    });
  };

  const handleEditProduct = (id) => {
    // router.push(`/admin/products/update-product?id=${id}`);
    setIsOpenModal(true);
  };

  return (
    <>
      <tr
        className={`py-10 text-center  ${
          product.quantity < 3 ? "text-red-800 font-bold active" : "bg-none"
        }`}
      >
        <td>
          {product?.image ? (
            <div className=" ml-3">
              <Image
                src={product.image}
                width={40}
                height={40}
                alt="variant"
                className=" rounded-xl"
              />
            </div>
          ) : (
            <span className="">No image</span>
          )}
        </td>
        {item?.attributes?.colors && <td>{product.color}</td>}
        {item?.attributes?.sizes && <td>{product.size}</td>}
        {item?.attributes?.design && <td>{product.design}</td>}
        {item?.attributes?.set && <td>{product.set}</td>}
        {item?.attributes?.others && <td>{product.other}</td>}
        <td>{product.offer_quantity}</td>
        <td>{product.offer_discount}</td>
        <td>{product.buyingPrice}</td>
        <td>{product.salePrice}</td>
        <td>{product.productPrice}</td>
        {/* <td>
          <span>
            <p>
              <span className="text-xs font-bold">
                Buy.Price {product.buyingPrice}
              </span>
            </p>
            <p>
              <span className="text-xs font-bold">
                Reg.Price {product.productPrice}
              </span>
            </p>
            <p>
              <span className="text-xs font-bold">
                Sale.Price {product?.salePrice}
              </span>
            </p>
          </span>
        </td> */}

        <td>{product.discount}%</td>

        <td>
          <span className="flex justify-center gap-2 ">
            <Tooltip anchorSelect="#edit">Edit</Tooltip>
            <button id="edit" onClick={() => handleEditProduct(product._id)}>
              <FaEdit size={17} className="text-warning block mx-auto " />
            </button>
            <Tooltip anchorSelect="#delete">Delete</Tooltip>
            {/* {index > 0 && (
              <button
                id="delete"
                onClick={() => handleDeleteProduct(product._id)}
                className="cursor-pointer"
              >
                <FaTrashAlt size={15} className="text-red-600 block mx-auto " />
              </button>
            )} */}
          </span>
        </td>
      </tr>

      <CustomModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpenModal}>
        <UpdateVariant
          variant={product}
          id={product?._id}
          setOpen={setIsOpenModal}
          imageUrl2={product?.imageURLs}
          setReload={setReloader}
          productId={productId}
          item={item}
        />
      </CustomModal>
    </>
  );
};

export default VariantList;
