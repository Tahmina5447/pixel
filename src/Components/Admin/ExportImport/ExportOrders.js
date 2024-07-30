import React, { useState } from "react";
import server_url from "../../../../lib/config";
import { AiOutlineDownload } from "react-icons/ai";

const ExportOrder = ({ startDate, endDate }) => {
  const [loading, setLoading] = useState(false);
  const handleExport = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${server_url}/order/export-orders?startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.blob();

      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "orders.csv");
      document.body.appendChild(link);
      link.click();
      setLoading(false);
    } catch (error) {
      console.error("Export failed:", error);
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <button className="btn loading btn-primary  text-white btn-sm text-xs">
          Download Products
        </button>
      ) : (
        <button
          onClick={handleExport}
          className="btn btn-primary hover:btn-success text-white btn-sm text-xs"
        >
          <AiOutlineDownload size={20} className="mr-2" /> Download
        </button>
      )}
    </>
  );
};

export default ExportOrder;
