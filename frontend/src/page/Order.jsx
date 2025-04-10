

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';
import server from '../server';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addressId, userEmail, products } = location.state || {};

  const [productIds, setProductIds] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [confirmOrder, setConfirmOrder] = useState(false);

  useEffect(() => {
    const ids = products.map(item => item._id);
    const nos = products.map(item => item.quantity);
    setProductIds(ids);
    setQuantity(nos);

    const total = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [products]);

  const handleOrder = async () => {
    try {
      await axios.post(`${server}/my-order`, {
        addressId,
        email: userEmail,
        productIds,
        quantity,
        totalPrice
      });

      await axios.put(`${server}/product/clear-cart`, { email: userEmail });

      alert('Order confirmed successfully! Check your email for further details.');
      navigate('/thank-you');
    } catch (err) {
      console.error('Order failed:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold mb-4">Select Payment Method</h1>

        <div>
          <p className="text-gray-700 mb-4">Choose a payment method:</p>

          {/* ✅ PAYPAL INTEGRATION */}
          <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: totalPrice.toFixed(2),
                    },
                  }],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(async function (details) {
                  alert(`Transaction completed by ${details.payer.name.given_name}`);
                  await handleOrder();
                });
              }}
              onError={(err) => {
                console.error('PayPal Checkout onError', err);
                alert("Payment failed. Please try again.");
              }}
            />
          </PayPalScriptProvider>

          <div className="mt-4">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 w-full"
              onClick={() => setConfirmOrder(true)}
            >
              Cash on Delivery
            </button>
          </div>
        </div>

        {confirmOrder && (
          <div className="mt-4">
            <p className="text-gray-700 mb-4">Click to confirm your Cash on Delivery order:</p>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 w-full"
              onClick={handleOrder}
            >
              Confirm Order
            </button>
            <button
              className="bg-red-500 text-white px-6 py-2 mt-2 rounded-md hover:bg-red-600 w-full"
              onClick={() => setConfirmOrder(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmation;