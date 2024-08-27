import { useContext } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { tokenContext } from "../../context/TokenContext";
import "./Navbar.css"

export default function Navbar() {
    const { userToken, setUserToken } = useContext(tokenContext);
    const navigate = useNavigate()
    function clearToken() {
        setUserToken(null);
        localStorage.setItem("token", "");
        navigate("/signin")
    }
    return (
        <div className=" flex justify-between lg:max-w-screen-lg md:max-w-screen-md max-w-7xl text-sm container mx-auto py-4 ">
            <div className="flex space-x-5 items-center">
                <Link to={""} className="img-contaienr">
                    <img src={logo} alt="Fresh Cart" />
                </Link>
                <div>
                    <ul className="flex space-x-3 text-gray-400">
                        <li>
                            <NavLink className={"font-bold"} to={""}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink className={"font-bold"} to={"/Cart"}>Cart</NavLink>
                        </li>
                        <li>
                            <NavLink className={"font-bold"} to={"/Products"}>Products</NavLink>
                        </li>
                        <li>
                            <NavLink className={"font-bold"} to={"/Categories"}>Categories</NavLink>
                        </li>
                        <li>
                            <NavLink className={"font-bold"} to={"/Brands"}>Brands</NavLink>
                        </li>
                        <li>
                            <NavLink className={"font-bold"} to={"/wishlist"}>Wishlist</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex space-x-6">
                <div>
                    <ul className="flex space-x-3 ">
                        <li>
                            <i className="fa-brands cursor-pointer text-lg hover:text-orange-400 duration-150 fa-instagram"></i>
                        </li>
                        <li>
                            <i className="fa-brands cursor-pointer text-lg hover:text-sky-600 duration-150 fa-facebook"></i>
                        </li>
                        <li>
                            <i className="fa-brands cursor-pointer text-lg hover:text-red-600 duration-150 fa-tiktok"></i>
                        </li>
                        <li>
                            <i className="fa-brands cursor-pointer text-lg hover:text-sky-400 duration-150 fa-twitter"></i>
                        </li>
                        <li>
                            <i className="fa-brands cursor-pointer text-lg hover:text-blue-800 duration-150 fa-linkedin"></i>
                        </li>
                        <li>
                            <i className="fa-brands cursor-pointer text-lg hover:text-red-600 duration-150 fa-youtube"></i>
                        </li>
                    </ul>
                </div>
                <div className="space-x-2 ">
                    {userToken ? (
                        <span onClick={() => clearToken()} className="cursor-pointer">Signout</span>
                    ) : (
                        <>
                            <Link to={"register"}>Register</Link>
                            <Link to={"signin"}>Signin</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
