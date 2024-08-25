import WishlistContext, {
    wishlistContextObject,
} from "../../context/WishlistContext";
import { useContext, useEffect } from "react";
import { cartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import Heart from "react-heart";
import { Triangle } from "react-loader-spinner";

export default function Wishlist() {
    const { wishlistArray, wishlistArrayId, modifyWishlistItem, getWishlist } =
        useContext(wishlistContextObject);

    return (
        <div>
            {wishlistArray.length != 0 ? (
                <div className="relative overflow-x-auto max-w-screen-xl mx-auto my-6 shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th
                                    scope="col text-center"
                                    className="px-16 py-3"
                                >
                                    <span className="sr-only">Image</span>
                                </th>
                                <th
                                    scope="col text-center"
                                    className="px-6 py-3"
                                >
                                    Product
                                </th>
                                <th
                                    scope="col text-center"
                                    className="px-6 py-3"
                                >
                                    Price/Unit
                                </th>
                                <th
                                    scope="col text-center"
                                    className="px-6 py-3"
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {wishlistArray?.map((product) => {
                                return (
                                    <tr
                                        key={product?._id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <td className=" p-4">
                                            <img
                                                src={product?.imageCover}
                                                className="w-16 max-w-full"
                                                alt={product?.title}
                                            />
                                        </td>
                                        <td className=" px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            {product.title
                                                .split(" ")
                                                .slice(0, 2)
                                                .join(" ")}
                                        </td>
                                        <td className=" px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            {product?.price} EGP
                                        </td>
                                        <td className="px-6 py-4 flex justify-center relative">
                                            <Heart
                                                className={`size-16`}
                                                isActive={wishlistArray.some(
                                                    (obj) =>
                                                        obj._id == product._id
                                                )}
                                                onClick={() => {
                                                    modifyWishlistItem(
                                                        product._id
                                                    );
                                                }}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="min-h-96 flex justify-center items-center">
                    
                    <h1>
                        your Wish List is empty
                    </h1>
                </div>
            )}
        </div>
    );
}
