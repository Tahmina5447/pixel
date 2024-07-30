import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AiFillEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import swal from "sweetalert";
import { calculateDiscount } from "../../../lib/claculateDiscount";
import handleDelete from "../../../lib/handleDelete";
import handleUpdate from "../../../lib/handleUpdate";
import CreateContext from "../../Components/CreateContex";
import AdminProductDetails from "../AdminProductDetails";
import ProductShowModal from "../ProductShowModal";
const ProductsTableItemsRow = ({ product, index }) => {
  const { reolder, setReloader } = useContext(CreateContext);
  const [modalIsOpen, setIsOpenModal] = React.useState(false);
  const [modalProductData, setModalProductData] = React.useState({});
  const router = useRouter();

  let fethUrl = "http://localhost:5000/api/v1/product/";

  const handleDeleteProduct = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product.",
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

  const handleUpdateProduct = (id) => {
    fethUrl += id;
    const result = handleUpdate(
      fethUrl,
      {
        status: !product.status,
      },
      setReloader,
      reolder
    );
    setReloader(!reolder);

    swal("Success!.", {
      icon: "success",
    });
  };

  const handleEditProduct = (id) => {
    router.push(`/admin/products/update-product?id=${id}`);
  };
  const discountPrice = calculateDiscount(
    product?.productPrice,
    product?.salePrice
  );
  return (
    <>
      <tr title={product.name}
        className={`py-10   ${!product.stock ? "text-red-800 font-bold active" : "bg-none"
          }`}
      >
        <td className="text-start">{+index + 1}</td>
        <td className="text-start">{product.sku.slice(0, 15)}</td>
        <td className="text-start" >{product.name.slice(0, 15)}...</td>
        <td className="text-start">{product.category}</td>
        <td className="text-start">
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
        </td>

        <td className="text-center">

          <div>
            <p>
              <span className="text-xs font-bold">
                Quantity:{product.quantity}
              </span>
            </p>
            <p>
              <span className="text-xs font-bold">
                Display Status: {product.stock ? "In stock" : "Out of Stock"}
              </span>
            </p>

          </div>
        </td>
        {/* <td>
          <button className="btn btn-xs btn-danger text-white">
            {product.status ? "review" : "published"}
          </button>
        </td> */}

        <td>
          <label
            onClick={() => {
              setModalProductData(product);
              setIsOpenModal(true);
            }}
            className="cursor-pointer flex items-center justify-center"
          >
            <Tooltip anchorSelect="#view">View</Tooltip>
            <AiFillEye id="view" size={25} className={"text-primary"} />
          </label>
        </td>
        <td>
          {product.status ? (
            <button
              onClick={() => handleUpdateProduct(product._id)}
              className="btn btn-xs border-none bg-red-500 text-white"
            >
              unhide
            </button>
          ) : (
            <button
              onClick={() => handleUpdateProduct(product._id)}
              className="btn btn-xs btn-primary text-white font-bold"
            >
              hide
            </button>
          )}
        </td>
        <td>
          <span className="flex justify-center text-center gap-2 ">
            <Tooltip anchorSelect="#edit">Edit</Tooltip>
            <button id="edit" onClick={() => handleEditProduct(product._id)}>
              <FaEdit size={17} className="text-warning block mx-auto " />
            </button>
            <Tooltip anchorSelect="#delete">Delete</Tooltip>
            <button
              id="delete"
              onClick={() => handleDeleteProduct(product._id)}
              className="cursor-pointer"
            >
              <FaTrashAlt size={15} className="text-red-600 block mx-auto " />
            </button>
          </span>
        </td>
      </tr>
      <ProductShowModal
        modalIsOpen={modalIsOpen}
        setIsOpenModal={setIsOpenModal}
      >
        {/* <AdminProductDetails product={modalProductData} /> */}
        <div className="max-w-[600px] py-5">
          <AdminProductDetails product={product} />
        </div>
      </ProductShowModal>
    </>
  );
};

export default ProductsTableItemsRow;
