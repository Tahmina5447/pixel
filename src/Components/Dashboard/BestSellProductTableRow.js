import React from 'react';

const BestSellProductTableRow = ({product,index}) => {
    return (
      <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
        <td className="p-3">
          <p>{index+1}</p>
        </td>
        <td className="p-3">
          <p>{product.name}</p>
        </td>
        <td className="p-3">
          <p>{product.salePrice}</p>
        </td>
        <td className="p-3">
          <p>{product.saleCount}</p>
        </td>
    
      </tr>
    );
};

export default BestSellProductTableRow;