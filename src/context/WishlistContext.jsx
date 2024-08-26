import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from "react";
import toast from "react-hot-toast";

export const wishlistContextObject = createContext();

export default function WishlistContext({ children }) {
    const [wishlistArray, setWishlistArray] = useState([]);
    const [wishlistArrayId, setWishlistArrayId] = useState([]);
    useEffect(() => {
        getWishlist();
    }, []);
    function addToWishlist(id) {
        const addingToast = toast.loading("adding to favourite", {
            position: "top-right",
        });
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
                setWishlistArrayId(res.data.data);
                getWishlist();
                toast.success("added to favourite", {
                    id: addingToast,
                    position: "top-right",
                });
            });
    }
    function removeFromWishlist(id) {
        const deletingToast = toast.loading("removing from favourite", {
            position: "top-right",
        });
        axios
            .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
                headers: { token: localStorage.getItem("token") },
            })
            .then((res) => {
                setWishlistArrayId(res.data.data);
                getWishlist();
                toast.success("removed from favourite", {
                    id: deletingToast,
                    position: "top-right",
                });
            });
    }

    function getWishlist() {
        axios
            .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: {
                    token: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                setWishlistArray(res.data.data);
            });
    }

    function modifyWishlistItem(id) {
        if (wishlistArray.some((obj) => obj._id == id)) {
            console.log("removeinmodify");
            return removeFromWishlist(id);
        }
        if (!wishlistArray.some((obj) => obj._id == id)) {
            console.log("addinmodify");
            return addToWishlist(id);
        }
    }

    return (
        <wishlistContextObject.Provider
            value={{
                modifyWishlistItem,
                wishlistArray,
                getWishlist,
                wishlistArrayId,
            }}
        >
            {children}
        </wishlistContextObject.Provider>
    );
}
