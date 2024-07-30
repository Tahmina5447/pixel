import React, { useState } from 'react';
import server_url from '../../lib/config';
import { updateMethodHook } from '../../lib/usePostHooks';

const ExtraDiscountOrder = ({ orderInfo, refetch }) => {
    const [discountAmount, setDiscountAmount] = useState(orderInfo.extraDiscount || 0);
    const [newOrderPrice, setNewOrderPrice] = useState({
        extraDiscount: orderInfo.extraDiscount || 0,
        discount: orderInfo.discount,
        afterDiscountPrice: orderInfo.afterDiscountPrice,
        totalAmount: orderInfo.totalAmount
    });
    
    const [deliveryPriceAmount, setDeliveryPriceAmount] = useState(orderInfo.shippingPrice || 0);
    const [newDeliveryPrice, setNewDeliveryPrice] = useState({
        shippingPrice: orderInfo.shippingPrice || 0,
        totalAmount: orderInfo.totalAmount
    });

    const handleDiscountChange = (e) => {
        const extraDiscount = Math.min(parseInt(e.target.value) || 0, orderInfo.afterDiscountPrice);
        const newData = {
            extraDiscount: extraDiscount,
            discount: orderInfo.discount + extraDiscount,
            afterDiscountPrice: orderInfo.afterDiscountPrice - extraDiscount,
            totalAmount: orderInfo.totalAmount - extraDiscount
        };
        setDiscountAmount(extraDiscount);
        setNewOrderPrice(newData);
    };
    const handleDeliveryChange = (e) => {
        const deliveryPrice = Math.min(parseInt(e.target.value) || 0);
        const newData = {
            shippingPrice: deliveryPrice,
            totalAmount: orderInfo.afterDiscountPrice + deliveryPrice
        };
        setDeliveryPriceAmount(deliveryPrice);
        setNewDeliveryPrice(newData);
    };

    const updateExtraDiscount = async () => {
        const url = `${server_url}/order/${orderInfo._id}`;
        // Implement your API call logic here
        updateMethodHook(url, newOrderPrice, refetch);
    };
    const updateDeliveryPrice = async () => {
        const url = `${server_url}/order/${orderInfo._id}`;
        // Implement your API call logic here
        updateMethodHook(url, newDeliveryPrice, refetch);
    };

    return (
        <div className='block md:flex gap-5 '>
            <form className=''>
                <div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="extraDiscount" className="block dark:text-gray-600">Extra Discount</label>
                        <input
                            type="number"
                            placeholder="Extra Discount"
                            className="w-full px-4 py-3 rounded-md border-2 focus:border-primary"
                            value={discountAmount}
                            max={orderInfo.afterDiscountPrice}
                            onChange={handleDiscountChange}
                        />
                    </div>
                </div>
                <span onClick={updateExtraDiscount} className="btn btn-xs btn-success text-white rounded-sm mt-2 hover:bg-opacity-5 hover:text-success">Update Extra Discount</span>
                <div>
                    <p>Extra Discount: {newOrderPrice.extraDiscount}</p>
                    <p>Discount: {newOrderPrice.discount}</p>
                    <p>Total Product Price: {newOrderPrice.afterDiscountPrice}</p>
                    <p>Total Order Amount: {newOrderPrice.totalAmount}</p>
                </div>
            </form>
            <form className=''>
                <div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="extraDiscount" className="block dark:text-gray-600">Custom Delivery Price</label>
                        <input
                            type="number"
                            placeholder="Extra Discount"
                            className="w-full px-4 py-3 rounded-md border-2 focus:border-primary"
                            value={deliveryPriceAmount}
                            max={orderInfo.shippingPrice}
                            onChange={handleDeliveryChange}
                        />
                    </div>
                </div>
                <span onClick={updateDeliveryPrice} className="btn btn-xs btn-success text-white rounded-sm mt-2 hover:bg-opacity-5 hover:text-success">Update Delivery Price</span>
                <div>
                    <p>Delivery charge: {newDeliveryPrice.shippingPrice}</p>
                    <p>Total Order Amount: {newDeliveryPrice.totalAmount}</p>
                   
                </div>
            </form>
        </div>
    );
};

export default ExtraDiscountOrder;
