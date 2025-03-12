import axios from "axios";
import React, { useState, useEffect } from "react";

export default function CartProduct({ _id, name, images, quantity, price }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantityVal, setQuantityVal] = useState(quantity);

    useEffect(() => {
        if (!images || images.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [images]);

    const handleIncrement = () => {
        const newQuantityVal = quantityVal + 1;
        setQuantityVal(newQuantityVal);
        updateQuantityVal(newQuantityVal);
    };

    const handleDecrement = () => {
        const newQuantityVal = quantityVal > 1 ? quantityVal - 1 : 1;
        setQuantityVal(newQuantityVal);
        updateQuantityVal(newQuantityVal);
    };

    const updateQuantityVal = (quantity) => {
        axios
            .put("http://localhost:5000/api/product/cartproduct/quantity", {
                email: "sarayu2926@gmail.com",
                productId: _id,
                quantity,
            })
            .then((res) => {
                console.log("Quantity updated:", res.data);
            })
            .catch((err) => {
                console.error("Error updating quantity:", err);
            });
    };
}
