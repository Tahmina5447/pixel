import React from "react";

const CustomerTableItem = ({ user }) => {
  return (
    <tr className="py-10 text-center">
      <th>1</th>
      <td>12/16/2020</td>
      <td>{user.fullName}</td>
      <td>example@email.com</td>
      <td>0185495055</td>
      <td>Blue</td>
    </tr>
  );
};

export default CustomerTableItem;
