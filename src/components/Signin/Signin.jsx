import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { tokenContext } from "../../context/TokenContext";
import { useNavigate } from "react-router-dom";

export default function Signin() {
    const [signinMessage, setSetSigninMessage] = useState("");
    const {userToken , setUserToken} = useContext(tokenContext)
    const navigate = useNavigate()
    function fetchMessageHandling(err) {
        setSetSigninMessage(err);
        setTimeout(() => {
            setSetSigninMessage("");
        }, 2500);
    }

    async function signin(values) {

        axios
            .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
            .then((res) => {
                console.log(res.data);
                console.log("token", res.data.token);
                localStorage.setItem("token", res.data.token);
                setUserToken(res.data.token);
                navigate("/")
            })
            .catch((err) => {
                console.log(err.response.data);
                fetchMessageHandling(err.response.data.message);
            });
    }

    const registerForm = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        onSubmit: (values) => {
            signin(values);
            console.log(values);
        },
    });

    return (
        <div>
            <form
                onSubmit={registerForm.handleSubmit}
                className="max-w-md mx-auto"
            >
                <div className="relative z-0 w-full mb-3 mt-3 group">
                    <input
                        type="email"
                        value={registerForm.values.email}
                        name="email"
                        onBlur={registerForm.handleBlur}
                        onChange={registerForm.handleChange}
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
                {signinMessage != "" ? (
                    <div
                        className={`flex items-center p-4 mb-4 text-sm  border border-red-300 rounded-lg  dark:bg-gray-800 
                                text-red-800 bg-red-50 dark:text-red-400
                        dark:border-red-800`}
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
                            <span className="font-medium">{signinMessage}</span>
                        </div>
                    </div>
                ) : null}
                <button
                    type="Signin"
                    className="text-white mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
