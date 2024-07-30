import React, { useEffect, useState } from "react";


const PathoArealist = ({ selected, setSelected, active }) => {
    // ----------------------------
    const [searchResult, setSearchResult] = useState();
    const [searchText, setSearchText] = useState("");
    const [zoneName, setZoneName] = useState("")
    const [open, setOpen] = useState(false);


    useEffect(() => {
        if(active){
            fetch(`/api/aladdin/api/v1/zones/${active}/area-list`)
            .then((res) => res.json()) // <- Corrected line
            .then((data) => {
                setSearchResult();
                const match = data?.data?.data?.filter((d) =>
                    d.area_name.toLowerCase().includes(searchText.toLowerCase())
                );
                setSearchResult(match);
            })
            .catch((error) => console.error('Error fetching data:', error));
        }
        // if (searchText === "") {
        //     setSearchResult(data)
        // } else {
        //     const match = data.filter((d) =>
        //         d.area_name.toLowerCase().includes(searchText.toLowerCase())
        //     );
        //     setSearchResult(match);
        // }
    }, [searchText,active]);



    // ----------------------------
    const handleSearchChange = (event) => {
        const name = event.target.value;
        setSearchText(name);
    };
    const handleSelectCity = (area) => {
        if (area?.area_name) {
            let districtName = area.area_name;
            if(area.home_delivery_available){
                setSelected(area?.area_id);
                setZoneName(districtName)
            }
            setOpen(false);
            setSearchText("");
        }
    };

    return (
        <>
            {/* ---------------------------------------------------------- */}
            <label htmlFor="" className="w-full  block">
                <label htmlFor="name" className="leading-7 text-sm ">
                    Select Area
                </label>
                <div className="font-medium relative w-full">
                    <button
                        type="button"
                        disabled={active ? false : true}
                        onClick={() => setOpen(!open)}
                        className={`shadow-sm border  bg-white  text-black w-full p-3 flex items-center justify-between rounded-lg ${!zoneName && "text-black"
                            } ${active ? "cursor-pointer" : " cursor-not-allowed"} ${open ? " border-primary" : ""}`}
                    >
                        {zoneName ? (
                            zoneName?.length > 25 ? (
                                zoneName?.substring(0, 25) + "..."
                            ) : (
                                zoneName
                            )
                        ) : (
                            <div className="flex  gap-2">
                                <p className="text-sm pt-[4px] text-slate-500 font-semibold">
                                    Choice your Area
                                </p>
                            </div>
                        )}
                    </button>
                    <ul
                        className={`overflow-y-auto scrollBarHidden ${open ? "max-h-60 absolute w-full left-0 right-0 z-30" : "max-h-0"
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
                            {searchResult?.map((area, i) => (
                                <li
                                    key={i}
                                    className={`p-2 text-sm  font-bold  ${area.home_delivery_available ? "cursor-pointer" : ' cursor-not-allowed'}`}
                                    onClick={() => handleSelectCity(area)}
                                >
                                    <div className="flex gap-5">
                                        <p className={area.home_delivery_available ? "" : ' text-red-500'}>{area.area_name}</p>
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

export default PathoArealist;
