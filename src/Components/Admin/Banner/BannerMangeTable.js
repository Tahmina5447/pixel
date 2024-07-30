import React from "react";
import BannerTableRow from "./BannerTableRow";

const BannerMangeTable = ({ data, refetch }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 md:p-8 my-5">
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th className="bg-[#f3f3f3]">S/N</th>
              <th className="bg-[#f3f3f3]">IMAGE</th>
              <th className="bg-[#f3f3f3]">Title</th>
              <th className="bg-[#f3f3f3]">STATUS</th>
              <th className="bg-[#f3f3f3]">POSITION</th>
              <th className="bg-[#f3f3f3]">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.result.map((banner, index) => (
              <BannerTableRow
                key={banner?._id}
                banner={banner}
                index={index}
                refetch={refetch}
              ></BannerTableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BannerMangeTable;
