import React from "react";
import { BsSmartwatch } from "react-icons/bs";

const SideBarMobileViewCatgory = () => {
  const menus = [
    {
      catagoryName: "Man",
      subMenu: [
        { name: "t-shirt", path: "/t-shirt" },
        { name: "watch", path: "/watch" },
      ],
    },
  ];

  return (
    <div>
      <ul className="flex flex-col gap-2 ">
        <li>
          <a
            href=""
            className="flex items-center gap-2 text-primary bg-secondary w-full p-2"
          >
            <BsSmartwatch size={20} /> Paraints Item
          </a>
        </li>
        <li>
          <a
            href=""
            className="flex items-center gap-2 text-primary bg-secondary w-full p-2"
          >
            <BsSmartwatch size={20} /> Paraints Item
          </a>
        </li>
        <li>
          <a
            href=""
            className="flex items-center gap-2 text-primary bg-secondary w-full p-2"
          >
            <BsSmartwatch size={20} /> Paraints Item
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideBarMobileViewCatgory;
