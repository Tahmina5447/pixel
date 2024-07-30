import React, { useState } from "react";
import server_url from "../../../../lib/config";
import { updateMethodHook } from "../../../../lib/usePostHooks";

const EditBannerPostion = ({ banner, refetch }) => {
  const [positionValue, setPositionValue] = useState(banner?.position);
  const url = `${server_url}/banner/${banner?._id}`;

  const handleSavePosition = () => {
    const data = { position: positionValue };
    updateMethodHook(url, data, refetch);
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      <label>Position</label>
      <input
        value={positionValue}
        onChange={(e) => setPositionValue(e.target.value)}
        className="input input-bordered"
      />
      <button
        onClick={handleSavePosition}
        className="btn btn-xs btn-success text-white"
      >
        Save
      </button>
    </div>
  );
};

export default EditBannerPostion;
