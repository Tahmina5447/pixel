import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import Drawer from "react-modern-drawer";
import CreateContext from "../../Components/CreateContex";
import CatagoryMenu from "../CatagoryMenu";
import AuthUser from "../../../lib/AuthUser";
import { useMyShopData } from "../../hooks/useMyShopData";
import Image from "next/image";
import { useMediaQuery } from "@react-hook/media-query";
import { Icon } from "@iconify/react/dist/iconify.js";

const CatagoryDrawer = ({
  isOpenCatgory,
  toggleDrawerCatagory,
  dir,
  products,
}) => {
  const [selectMenu, setSelectMenu] = useState("menu");
  const { setQueryFromCategory } = useContext(CreateContext);
  const { logout } = AuthUser();
  const { token, user } = useContext(CreateContext);
  const { isLoading, data: shopData, error } = useMyShopData();
  const userRole = user?.role;
  const [mobile, setMobile] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 1000px)");

  useEffect(() => {
    if (isSmallScreen) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [isSmallScreen]);

  let menus = [
    // {
    //   title: "Home",
    //   path: "/",
    // },
    // {
    //   title: "Shop",
    //   path: "/shop",
    // },
    {
      title: "Offer",
      path: "/offer",
    },
    // {
    //   title: "About Us",
    //   path: "/about",
    // },
    {
      title: "Blog",
      path: "/magazine",
    },
    {
      title: "Contact Us",
      path: "/contact",
    },
    // {
    //   title: "FAQ",
    //   path: "/faq",
    // },
  ];

  return (
    <>
      <Drawer
        open={isOpenCatgory}
        onClose={toggleDrawerCatagory}
        direction={dir}
        style={mobile ? { width: "75%" } : { width: "400px" }}
      >
        <div className=" bg-primary h-full overflow-y-auto">
          <div className=" p-3 md:py-4 md:px-7">
            <div className="flex justify-between">
              <span className="flex items-center text-primary gap-2">
                {/* <MdAddShoppingCart size={30} /> */}
                <span className="text-2xl font-bold text-primary">
                  <Image
                    src={"/logo2.png"}
                    width={700}
                    height={500}
                    alt="logo"
                    className="w-[100px]"
                  />
                </span>
              </span>
              <span className=" p-3">
                <button
                  onClick={toggleDrawerCatagory}
                  className=""
                >
                  <span><Icon className="text-2xl text-white" icon="charm:cross" /></span>
                </button>
              </span>
            </div>
          </div>

          <div className="">
            {/* <div className="w-full  grid grid-cols-2  border border-primary rounded-md overflow-hidden">
              <button
                onClick={() => setSelectMenu("cat")}
                className={`py-2 font-bold cursor-pointer ${selectMenu === "cat"
                  ? "bg-primary text-white"
                  : " bg-white text-primary "
                  }`}
              >
                Categories
              </button>
              <button
                onClick={() => setSelectMenu("menu")}
                className={`py-2 font-bold cursor-pointer ${selectMenu === "menu"
                  ? " bg-primary text-white"
                  : "bg-white text-primary"
                  }`}
              >
                Menu
              </button>

            </div> */}
          </div>
          <div>
            {!token && (
              <Link 
              onClick={toggleDrawerCatagory} className=" flex items-center gap-1 text-white font-bold text-sm py-2 px-4  border-b border-white/20 avenir2 " href={"/auth/login"}>
                <Icon className="text-white text-xl" icon="lucide:user-round" />
                LOGIN
              </Link>
            )}
          </div>
          <>
            <CatagoryMenu
              toggleDrawerCatagory={toggleDrawerCatagory}
              toggle={true}
            />
            <ul className="" id="">
              {menus.map((menu, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      if (menu.path === "/shop") {
                        setQueryFromCategory("");
                      }
                    }}
                  >
                    <Link
                      onClick={toggleDrawerCatagory}
                      href={menu.path}
                      className="flex items-center gap-2 uppercase font-bold text-white text-sm border-b border-white/20 py-2 px-4  avenir2 "
                    >
                      {menu.title}
                    </Link>
                  </li>
                );
              })}

              <li>
                {token && userRole === "user" && (
                  <Link
                  onClick={toggleDrawerCatagory}
                    className="flex items-center gap-2 uppercase font-bold text-white text-sm border-b border-white/20 py-2 px-4  avenir2"
                    href={"/user/dashboard"}
                  >
                    Dashboard
                  </Link>
                )}
                {userRole === "admin" && (
                  <Link
                  onClick={toggleDrawerCatagory}
                    className="flex items-center gap-2 uppercase font-bold text-white text-sm border-b border-white/20 py-2 px-4  avenir2 "
                    href={"/admin/dashboard"}
                  >
                    Dashboard
                  </Link>
                )}
              </li>

              {token && userRole === "user" && (
                <li>
                  <Link
                  onClick={toggleDrawerCatagory}
                    className="flex items-center gap-2 uppercase font-bold text-white text-sm border-b border-white/20 py-2 px-4  avenir2 "
                    href={"/user/my-order"}
                  >
                    My Order
                  </Link>
                </li>
              )}

              {token && (userRole === "admin" || userRole === "user") ? (
                <>
                  <li>
                    <span
                      className="flex items-center gap-2 uppercase font-bold text-white text-sm border-b border-white/20 py-2 px-4  avenir2 "
                      onClick={() => { logout(); toggleDrawerCatagory(); }}
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <></>
              )}

            </ul>
            <div className="flex items-center gap-3 justify-center mb-3 mt-5 text-3xl text-white">
              <Link href={'https://www.instagram.com/pixels.ultra'} target="_blank"><Icon icon="ri:instagram-line" /></Link>
              <Link href={'https://www.facebook.com/pixelsultra'} target="_blank"><Icon icon="ic:baseline-facebook" /></Link>
            </div>
          </>
          {/* {selectMenu === "menu" && (
            <>
              <ul className="p-2" id="test-catagory-menus">
                {menus.map((menu, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        if (menu.path === "/shop") {
                          setQueryFromCategory("");
                        }
                      }}
                    >
                      <Link
                        onClick={toggleDrawerCatagory}
                        href={menu.path}
                        className="flex items-center gap-2 text-primary hover:bg-white hover:text-gray-600 py-2 px-3 rounded-md font-bold "
                      >
                        - {menu.title}
                      </Link>
                    </li>
                  );
                })}
                {token && (
                  <h2 className=" text-primary font-bold  px-3 mt-3 text-xl">
                    My Dashboard
                  </h2>
                )}

                <li>
                  {token && userRole === "user" && (
                    <Link
                      className="flex items-center gap-2 text-primary hover:bg-white hover:text-gray-600 py-2 px-3 rounded-md font-bold "
                      href={"/user/dashboard"}
                    >
                      - Dashboard
                    </Link>
                  )}
                  {userRole === "admin" && (
                    <Link
                      className="flex items-center gap-2 text-primary hover:bg-white hover:text-gray-600 py-2 px-3 rounded-md font-bold "
                      href={"/admin/dashboard"}
                    >
                      - Dashboard
                    </Link>
                  )}
                </li>

                {token && userRole === "user" && (
                  <li>
                    <Link
                      className="flex items-center gap-2 text-white hover:bg-white hover:text-gray-600 py-2 px-3 rounded-md font-bold "
                      href={"/user/my-order"}
                    >
                      - My Order
                    </Link>
                  </li>
                )}

                {token && (userRole === "admin" || userRole === "user") ? (
                  <>
                    <li>
                      <span
                        className="flex items-center gap-2 text-white hover:bg-white hover:text-gray-600 py-2 px-3 rounded-md font-bold "
                        onClick={logout}
                      >
                        - Logout
                      </span>
                    </li>
                  </>
                ) : (
                  <></>
                )}
              </ul>
            </>
          )} */}
        </div>
      </Drawer>
    </>
  );
};

export default CatagoryDrawer;
