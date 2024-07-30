import React, { useContext, useEffect, useState } from "react";
import CreateContext from "../../Components/CreateContex";



const PathoCity = ({ selectedCity, setSelectedCity, siteApiSettingData }) => {
  // ----------------------------
  const [searchResult, setSearchResult] = useState();
  const [cityName, setCityName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/aladdin/api/v1/countries/1/city-list');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const match = data?.data?.data?.filter((d) =>
        d.city_name.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResult(match);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state here if needed
      }
    };

    fetchData();
  }, [searchText]);

  // ----------------------------
  const handleSearchChange = (event) => {
    const name = event.target.value;
    setSearchText(name);
  };
  const handleSelectCity = (district) => {
    if (district?.city_name) {
      let districtName = district.city_name;
      setSelectedCity(district?.city_id);
      setCityName(districtName);
      setOpen(false);
      setSearchText("");
    }
  };

  return (
    <>
      {/* ---------------------------------------------------------- */}
      <label htmlFor="" className="w-full mb-3 block">
        <label htmlFor="name" className="leading-7 text-sm ">
          Select City
        </label>
        <div className="font-medium w-full relative">
          <div
            onClick={() => setOpen(!open)}
            className={`shadow-sm border  bg-white text-black w-full  p-3 flex items-center justify-between rounded-lg cursor-pointer ${
              !cityName && "text-black"
            } ${open ? " border-primary" : ""}`}
          >
            {cityName ? (
              cityName?.length > 25 ? (
                cityName?.substring(0, 25) + "..."
              ) : (
                cityName
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
            className={`overflow-y-auto scrollBarHidden ${
              open ? "max-h-60 absolute left-0  right-0 w-full z-30" : "max-h-0"
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
                    <p className="w-20">{district.city_name}</p>
                    <p className="w-2">-</p>
                    {/* <p className="w-20">{district.bn_name}</p> */}
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

export default PathoCity;
