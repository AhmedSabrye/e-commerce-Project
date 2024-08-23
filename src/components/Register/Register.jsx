import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { tokenContext } from "../../context/TokenContext";
import { useContext, useState } from "react";

export default function Register() {
    const {userToken , setUserToken} = useContext(tokenContext)
    const [signupMessage, setSignupMessage] = useState("");

    function fetchMessageHandling(err) {
        setSignupMessage(err);
        setTimeout(() => {
            setSignupMessage("");
        }, 2500);
    }
    async function signup(values) {
        axios
            .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
            .then((res) => {
                console.log(res.data);
                console.log("token", res.data.token);
                localStorage.setItem("token", res.data.token);
                // setToken(res.data.token);
                setUserToken(res.data.token);
                console.log("state",userToken)
                fetchMessageHandling(res.data.message);
            })
            .catch((err) => {
                console.log(err?.response?.data)
                fetchMessageHandling(err?.response?.data.message);
            });
    }
    const registerForm = useFormik({
        initialValues: {
            email: "",
            password: "",
            rePassword: "",
            name: "",
            lastName: "",
            phone: "",
            company: "",
        },

        onSubmit: (values) => {
            signup(values);
        },
        validationSchema: yup.object().shape({
            name: yup
                .string()
                .min(2, "at least two characters")
                .max(12, "maximum 12 characters")
                .required("name is required"),
            email: yup
                .string()
                .email("this email is not valid")
                .required("Email is required"),
            password: yup
                .string()
                .required("password is required")
                .min(5, "min 5 characters")
                .max(9, "max 9 characters"),
            rePassword: yup
                .string()
                .oneOf([yup.ref("password")], "rePassword must match password ")
                .required("this field is required"),
            phone: yup
                .string()
                .matches(/(01)[0125][0-9]{8}/, "this number is not valid "),
        }),
    });

    return (
        <div>
            <form
                onSubmit={registerForm.handleSubmit}
                noValidate
                className="max-w-md mx-auto"
            >
                <div className="relative z-0 w-full mb-3 mt-3 group">
                    <input
                        type="text"
                        value={registerForm.values.name}
                        name="name"
                        onBlur={registerForm.handleBlur}
                        onChange={registerForm.handleChange}
                        id="name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                    />
                    <label
                        htmlFor="name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        First name
                    </label>
                </div>
                {registerForm.errors.name && registerForm.touched.name ? (
                    <div
                        className="bg-red-200 border-red-600 text-red-600 border-l-4 p-4"
                        role="alert"
                    >
                        <p>{registerForm.errors.name}</p>
                    </div>
                ) : null}
                <div className="relative z-0 w-full mb-3 mt-3 group">
                    <input
                        type="email"
                        name="email"
                        onChange={registerForm.handleChange}
                        onBlur={registerForm.handleBlur}
                        value={registerForm.values.email}
                        id="email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                    />
                    <label
                        htmlFor="email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Email address
                    </label>
                </div>

                {registerForm.errors.email && registerForm.touched.email ? (
                    <div
                        className="bg-red-200 border-red-600 text-red-600 border-l-4 p-4"
                        role="alert"
                    >
                        <p>{registerForm.errors.email}</p>
                    </div>
                ) : null}
                <div className="relative z-0 w-full mb-3 mt-3 group">
                    <input
                        type="password"
                        name="password"
                        onChange={registerForm.handleChange}
                        onBlur={registerForm.handleBlur}
                        value={registerForm.values.password}
                        id="password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                    />
                    <label
                        htmlFor="password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Password
                    </label>
                </div>
                {registerForm.errors.password &&
                registerForm.touched.password ? (
                    <div
                        className="bg-red-200 border-red-600 text-red-600 border-l-4 p-4"
                        role="alert"
                    >
                        <p>{registerForm.errors.password}</p>
                    </div>
                ) : null}
                <div className="relative z-0 w-full mb-3 mt-3 group">
                    <input
                        type="password"
                        name="rePassword"
                        onBlur={registerForm.handleBlur}
                        value={registerForm.values.rePassword}
                        onChange={registerForm.handleChange}
                        id="floating_repeat_password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                    />
                    <label
                        htmlFor="floating_repeat_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Confirm password
                    </label>
                </div>
                {registerForm.errors.rePassword &&
                registerForm.touched.rePassword ? (
                    <div
                        className="bg-red-200 border-red-600 text-red-600 border-l-4 p-4"
                        role="alert"
                    >
                        <p>{registerForm.errors.rePassword}</p>
                    </div>
                ) : null}
                <div className="relative z-0 w-full mb-3 mt-3 group">
                    <input
                        type="tel"
                        value={registerForm.values.phone}
                        onBlur={registerForm.handleBlur}
                        name="phone"
                        onChange={registerForm.handleChange}
                        id="phone"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                    />
                    <label
                        htmlFor="phone"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Phone number (123-456-7890)
                    </label>
                </div>
                {registerForm.errors.phone && registerForm.touched.phone ? (
                    <div
                        className="bg-red-200 border-red-600 text-red-600 border-l-4 p-4"
                        role="alert"
                    >
                        <p>{registerForm.errors.phone}</p>
                    </div>
                ) : null}
                {signupMessage != "" ? (
                    <div
                        className={`flex items-center p-4 mb-4 text-sm  border border-red-300 rounded-lg  dark:bg-gray-800 ${signupMessage == "success" ? "dark:text-green-400 text-green-800 bg-green-50 " : "text-red-800 bg-red-50 dark:text-red-400" } dark:border-red-800`}
                        role="alert"
                    >
                        <svg
                            className="flex-shrink-0 inline w-4 h-4 me-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">{signupMessage}</span>
                        </div>
                    </div>
                ) : null}
                <button
                    type="submit"
                    className="text-white mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
