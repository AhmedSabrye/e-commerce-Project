import axios from "axios";
import { useFormik } from "formik";
import React from "react";

export default function ForgetPassword() {
    function forgetPassword(values) {
        console.log(values);
        axios
            .post(
                "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
                values
            )
            .then((res) => console.log(res));
    }

    const forgetPasswordForm = useFormik({
        initialValues: {
            email: "",
        },

        onSubmit: (values) => {
            forgetPassword(values);
            console.log(values);
        },
    });
    return (
        <div>
            <div>
                <form
                    onSubmit={forgetPasswordForm.handleSubmit}
                    className="max-w-md mx-auto"
                >
                    <div className="relative z-0 w-full mb-3 mt-3 group">
                        <input
                            type="email"
                            value={forgetPasswordForm.values.email}
                            name="email"
                            onBlur={forgetPasswordForm.handleBlur}
                            onChange={forgetPasswordForm.handleChange}
                            id="email"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            email
                        </label>
                    </div>

                    <div className="flex justify-evenly">
                        <button
                            type="submit"
                            className="text-white mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Confirm email
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
