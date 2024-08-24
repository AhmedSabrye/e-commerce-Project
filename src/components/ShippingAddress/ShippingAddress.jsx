import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function ShippingAddress() {
    const { cartId } = useContext(cartContext);
    const [isOnlinePyament, setIsOnlinePyament] = useState(false);

    function cashPayment(values) {
        const address = {
            shippingAddress: {
                values,
            },
        };
        axios
            .post(
                `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
                {
                    address,
                },
                {
                    headers: { token: localStorage.getItem("token") },
                }
            )
            .then((res) => {
                console.log(res);

                toast.success("Cash Payment Confirmed", {
                    position: "top-right",
                });
            })
            .catch((err) => {
                if (err.response.data.message == "invalid ID null") {
                    toast.error("Cart is empty", {
                        position: "top-right",
                    });
                }
            });
    }

    function onlinePayment(values) {
        const address = {
            shippingAddress: {
                values,
            },
        };
        axios
            .post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
                {
                    address,
                },
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            )
            .then((res) => {
                window.open(res.data.session.url, "_self");
            });
    }

    function managePaymentFunctions(values) {
        if (isOnlinePyament) {
            onlinePayment(values);
            console.log("online payment buddy");
        }
        if (!isOnlinePyament) {
            cashPayment(values);
            console.log("Cash payment buddy");
        }
    }
    const shippingAddressForm = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },

        onSubmit: (values) => {
            managePaymentFunctions(values);
        },
    });

    return (
        <div>
            <form
                onSubmit={shippingAddressForm.handleSubmit}
                className="max-w-md mx-auto"
            >
                <div className="relative z-0 w-full mb-3 mt-3 group">
                    <input
                        type="text"
                        value={shippingAddressForm.values.details}
                        name="details"
                        onBlur={shippingAddressForm.handleBlur}
                        onChange={shippingAddressForm.handleChange}
                        id="details"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                    />
                    <label
                        htmlFor="details"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Details
                    </label>
                </div>

                <div className="relative z-0 w-full mb-3 mt-3 group">
                    <input
                        type="tel"
                        value={shippingAddressForm.values.phone}
                        name="phone"
                        onBlur={shippingAddressForm.handleBlur}
                        onChange={shippingAddressForm.handleChange}
                        id="phone"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                    />
                    <label
                        htmlFor="phone"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Phone
                    </label>
                </div>
                <div className="relative z-0 w-full mb-3 mt-3 group">
                    <input
                        type="text"
                        value={shippingAddressForm.values.city}
                        name="city"
                        onBlur={shippingAddressForm.handleBlur}
                        onChange={shippingAddressForm.handleChange}
                        id="city"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                    />
                    <label
                        htmlFor="city"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        City
                    </label>
                </div>

                <div className="flex justify-evenly">
                    <button
                        type="submit"
                        className="text-white mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => {
                            setIsOnlinePyament(false);
                        }}
                    >
                        Cash Payment
                    </button>
                    <button
                        type="submit"
                        className="text-white mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => {
                            setIsOnlinePyament(true);
                        }}
                    >
                        Online Payment
                    </button>
                </div>
            </form>
        </div>
    );
}
