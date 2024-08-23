import axios from "axios";
import { createContext, useState } from "react";

export const wishlistContextObject = createContext(WishlistContext);

export default function WishlistContext({ children }) {
    const [wishlistArray, setWishlistArray] = useState([]);

    function addToWishlist(productId) {
        console.log("in add");
        axios
            .post(
                "https://ecommerce.routemisr.com/api/v1/wishlist",
                {
                    productId: productId,
                },
                {
                    headers: { token: localStorage.getItem("token") },
                }
            )
            .then((res) => setWishlistArray(res.data.data));
    }
    function removeFromWishlist(productId) {
        console.log("in remove");
        axios
            .delete(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                {
                    headers: { token: localStorage.getItem("token") },
                }
            )
            .then((res) => {
                setWishlistArray(res.data.data);
                console.log("in remove then");
            });
    }

    function isInWishlist(id) {
        return wishlistArray.includes(id);
    }

    function modifyWishlistItem(id) {
        if (!isInWishlist(id)) {
            addToWishlist(id);
            return;
        } else {
            removeFromWishlist(id);
        }
    }
    return (
        <wishlistContextObject.Provider
            value={{
                setWishlistArray,
                wishlistArray,
                addToWishlist,
                removeFromWishlist,
                modifyWishlistItem,

            }}
        >
            {children}
        </wishlistContextObject.Provider>
    );
}
