import axios from "axios";
import React, { useContext, useState } from "react";
import { tokenContext } from "./../../context/TokenContext";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import Heart from "react-heart";
import WishlistContext, {
    wishlistContextObject,
} from "../../context/WishlistContext";

export default function Product({ product }) {
    const { wishlistArray, modifyWishlistItem } = useContext(
        wishlistContextObject
    );

    const { addProduct } = useContext(cartContext);
    return (
        <Link to={`/product/${product._id}`}>
            <div className=" transition-colors duration-150 group relative">
                <div className="z-1 relative">
                    <img
                        src={product.imageCover}
                        className="object-cover w-full h-full object-cover"
                        alt={product.title}
                    />
                </div>
                <div className="p-3">
                    <h5 className="text-xs text-emerald-600">
                        {[product.category.name]}
                    </h5>
                    <h2 className="font-semibold">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                    </h2>
                    <div className="flex text-gray-700 justify-between">
                        <h5>{product.price} EGP</h5>
                        <h5>
                            {" "}
                            <i className="fa-solid text-yellow-400 fa-star"></i>{" "}
                            {product.ratingsAverage}
                        </h5>
                    </div>
                    {/* {["",""].} */}
                    <Heart
                        className={`absolute top-0 w-8 right-0`}
                        isActive={wishlistArray.includes(product._id)}
                        onClick={() => modifyWishlistItem(product._id)}
                    />
                </div>
                <div>
                    <button
                        onClick={() => {
                            addProduct(product._id);
                        }}
                        className="bg-emerald-400 w-full py-2 text-black hover:text-white group-hover:opacity-100 opacity-0 relative top-24 group-hover:top-0 transition-all duration-300 hover:bg-emerald-600 text-sm"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </Link>
    );
}
