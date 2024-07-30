import React, { useEffect, useState } from "react";

const BdCity = ({ selectedCity, setSelectedCity, setShippingCost }) => {
  // ----------------------------
  const [searchResult, setSearchResult] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetch(`https://akashwebs.github.io/data-of-district/bd.json`)
      .then((res) => res.json())
      .then((data) => {
        const match = data.districts.filter((d) =>
          d.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchResult(match);
      });
  }, [searchText]);

  // ----------------------------
  const handleSearchChange = (event) => {
    const name = event.target.value;
    setSearchText(name);
  };
  const handleSelectCity = (district) => {
    if (district?.name) {
      let districtName = district.name;
      setSelectedCity(districtName);
      setOpen(false);
      setSearchText("");
      const url = `http://localhost:5000/api/v1/delivery-cost/get-delivery-for-user?city=${districtName}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setShippingCost(data?.data?.cost));
    }
  };

  return (
    <>
      {/* ---------------------------------------------------------- */}
      <label htmlFor="" className="w-full mb-3 block relative">
        <label htmlFor="name" className="leading-7 text-sm ">
          Select City
        </label>
        <div className="font-medium">
          <div
            onClick={() => setOpen(!open)}
            className={`shadow-sm border  bg-white text-black w-64  p-3 flex items-center justify-between rounded-lg cursor-pointer ${!selectedCity && "text-black"
              }`}
          >
            {selectedCity ? (
              selectedCity?.length > 25 ? (
                selectedCity?.substring(0, 25) + "..."
              ) : (
                selectedCity
              )
            ) : (
              <div className="flex  gap-2">
                <p className="text-sm pt-[4px] text-slate-500 font-semibold">
                  Choice your city
                </p>
              </div>
            )}
          </div>
          <ul
            className={`overflow-y-auto scrollBarHidden ${open ? "max-h-60 absolute w-64 z-30" : "max-h-0"
              } `}
          >
            <div className="flex items-center  sticky h-10 -pt-2 -mt-4 top-0  border-gray">
              {/* <Icon icon="fa:search" className="text-white" /> */}
              <input
                type="text"
                onChange={handleSearchChange}
                placeholder="Search"
                className="w-full bg-white p-3 rounded-t-lg border border-slate-400 border-b  duration-300 ease-in-out outline-none"
              />
            </div>

            <div className="pt-4 shadow-xl border  border-slate-400 bg-white rounded-b-lg ">
              {searchResult?.map((district) => (
                <li
                  key={district?.name}
                  className={`p-2 text-sm  font-bold  cursor-pointer`}
                  onClick={() => handleSelectCity(district)}
                >
                  <div className="flex gap-5">
                    <p className="w-20">{district.name}</p>
                    <p className="w-2">-</p>
                    <p className="w-20">{district.bn_name}</p>
                  </div>
                </li>
              ))}
            </div>
          </ul>
        </div>
      </label>
      {/* ---------------------------------------------------------- */}
    </>
  );
};

export default BdCity;
