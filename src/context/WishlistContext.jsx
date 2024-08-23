import axios from "axios";
import { createContext, useState } from "react";
import React from "react";

export const wishlistContextObject = createContext();

export default function WishlistContext({ children }) {
    const [wishlistArray, setWishlistArray] = useState([]);

    function addToWishlist(id) {
        axios
            .post(
                `https://ecommerce.routemisr.com/api/v1/wishlist`,
                {
                    productId: id,
                },
                {
                    headers: { token: localStorage.getItem("token") },
                }
            )
            .then((res) => {
                setWishlistArray(res.data.data);
            });
    }
    function removeFromWishlist(id) {
        axios
            .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
                headers: { token: localStorage.getItem("token") },
            })
            .then((res) => {
                setWishlistArray(res.data.data);
            });
    }

    function modifyWishlistItem(id) {
        if (wishlistArray.includes(id)) {
            return removeFromWishlist(id);
        }
        if (!wishlistArray.includes(id)) {
            return addToWishlist(id);
        }
    }

    return (
        <wishlistContextObject.Provider
            value={{ modifyWishlistItem, wishlistArray }}
        >
            {children}
        </wishlistContextObject.Provider>
    );
}
