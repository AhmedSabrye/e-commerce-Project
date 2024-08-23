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
        <div className=" flex justify-between lg:max-w-screen-lg md:max-w-screen-md max-w-7xl text-sm container mx-auto py-4">
            <div className="flex space-x-5 items-center">
                <Link to={""} className="img-contaienr">
                    <img src={logo} alt="Fresh Cart" />
                </Link>
                <div>
                    <ul className="flex space-x-3 text-gray-400">
                        <li>
                            <NavLink to={""}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to={"Cart"}>Cart</NavLink>
                        </li>
                        <li>
                            <NavLink to={"Products"}>Products</NavLink>
                        </li>
                        <li>
                            <NavLink to={"Categories"}>Categories</NavLink>
                        </li>
                        <li>
                            <NavLink to={"Brands"}>Brands</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex space-x-3">
                <div>
                    <ul className="flex space-x-3 ">
                        <li>
                            <i className="fa-brands fa-instagram"></i>
                        </li>
                        <li>
                            <i className="fa-brands fa-facebook"></i>
                        </li>
                        <li>
                            <i className="fa-brands fa-tiktok"></i>
                        </li>
                        <li>
                            <i className="fa-brands fa-twitter"></i>
                        </li>
                        <li>
                            <i className="fa-brands fa-linkedin"></i>
                        </li>
                        <li>
                            <i className="fa-brands fa-youtube"></i>
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
