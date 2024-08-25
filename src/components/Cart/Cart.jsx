import { useContext, useEffect } from "react";
import { cartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
    const {
        allProducts,
        totalCartPrice,
        numOfCartItems,
        getCart,
        changeCount,
        removeItem,
        cartId,
    } = useContext(cartContext);

    useEffect(() => {
        getCart();

        return;
    }, []);
    return (
        <div>
            <div className="relative overflow-x-auto max-w-screen-xl mx-auto my-6 shadow-md sm:rounded-lg">
                <div className="my-8">
                    <h2 className="text-xl my-2 text-center text-emerald-800 font-extrabold">
                        total price = {totalCartPrice}
                    </h2>
                    <h5 className="text-md text-center text-emerald-800 font-extrabold">
                        total cart items = {numOfCartItems}
                    </h5>
                    <Link
                        to={"/shippingAddress"}
                        className="py-2 px-12 w-fit bg-emerald-300 hover:bg-emerald-500 active:bg-emerald-800 hover:text-white duration-150 mx-auto block font-bold my-5 rounded-3xl"
                    >
                        Pay
                    </Link>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Qty
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price/Unit
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProducts?.map((product) => {
                            return (
                                <tr
                                    key={product._id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td className="p-4">
                                        <img
                                            src={product.product.imageCover}
                                            className="w-16 max-w-full"
                                            alt={product.product.name}
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {product.product.title
                                            .split(" ")
                                            .slice(0, 2)
                                            .join(" ")}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <button
                                                className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                onClick={() =>
                                                    changeCount(
                                                        product.product._id,
                                                        product.count - 1
                                                    )
                                                }
                                                type="button"
                                            >
                                                <span className="sr-only">
                                                    Quantity button
                                                </span>
                                                <svg
                                                    className="w-3 h-3"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 18 2"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M1 1h16"
                                                    />
                                                </svg>
                                            </button>
                                            <div>
                                                <input
                                                    type="number"
                                                    id="first_product"
                                                    className="bg-gray-50 w-24 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder={product.count}
                                                    onChange={(e) => {
                                                        changeCount(
                                                            product.product._id,
                                                            Number(
                                                                e.target.value
                                                            )
                                                        );
                                                    }}
                                                    required
                                                />
                                            </div>
                                            <button
                                                className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                type="button"
                                                onClick={() =>
                                                    changeCount(
                                                        product.product._id,
                                                        product.count + 1
                                                    )
                                                }
                                            >
                                                <span className="sr-only">
                                                    Quantity button
                                                </span>
                                                <svg
                                                    className="w-3 h-3"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 18 18"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M9 1v16M1 9h16"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {product.price} EGP
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {product.price * product.count} EGP
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            href="#"
                                            className="font-medium text-emerald-600 dark:text-emerald-500 hover:underline"
                                            onClick={() =>
                                                removeItem(product.product._id)
                                            }
                                        >
                                            <i className=" text-2xl fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
