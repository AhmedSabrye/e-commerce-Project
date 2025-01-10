import { useContext, useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { tokenContext } from "../../context/TokenContext";
import "./Navbar.css";

export default function Navbar() {
  const { userToken, setUserToken } = useContext(tokenContext);
  const navigate = useNavigate();
  function clearToken() {
    setUserToken(null);
    localStorage.setItem("token", "");
    navigate("/signin");
  }
  const [menu, setMenu] = useState(true);

  return (
    <div className=" flex justify-between w-100 px-5 relative max-w-7xl text-sm  mx-auto py-4 ">
      <div className="flex lg:space-x-5 items-center">
        <Link to={""} className="img-contaienr">
          <img src={logo} alt="Fresh Cart" />
        </Link>
        <div className={` absolute z-20 left-0 right-0 top-full ${menu? "h-0" : "h-96"} transition-all duration-300 overflow-hidden lg:overflow-visible lg:static bg-red-700`}>
          <ul className="flex flex-col lg:space-x-3 text-gray-400 *:py-4 *:lg:py-0  text-center  lg:flex-row">
            <li className="border-b lg:border-none">
              <NavLink className={"font-bold"} onClick={()=>{setMenu(true)}} to={""}>
                Home
              </NavLink>
            </li>
            <li className="border-b lg:border-none">
              <NavLink className={"font-bold"} onClick={()=>{setMenu(true)}} to={"/Cart"}>
                Cart
              </NavLink>
            </li>
            <li className="border-b lg:border-none">
              <NavLink className={"font-bold"} onClick={()=>{setMenu(true)}} to={"/Products"}>
                Products
              </NavLink>
            </li>
            <li className="border-b lg:border-none">
              <NavLink className={"font-bold"} onClick={()=>{setMenu(true)}} to={"/Categories"}>
                Categories
              </NavLink>
            </li>
            <li className="border-b lg:border-none">
              <NavLink className={"font-bold"} onClick={()=>{setMenu(true)}} to={"/Brands"}>
                Brands
              </NavLink>
            </li>
            <li className="border-b lg:border-none">
              <NavLink className={"font-bold"} onClick={()=>{setMenu(true)}} to={"/wishlist"}>
                Wishlist
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center">
        <button onClick={()=>{setMenu(!menu)}} className={`lg:hidden`}>Click me</button>
        <div className="flex space-x-6 pr-5">
          <div className="fixed lg:static left-5 top-20">
            <ul className="flex lg:space-x-3 flex-col justify-center items-center lg:flex-row">
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
          <div className="space-x-2">
            {userToken ? (
              <span onClick={() => clearToken()} className="cursor-pointer">
                Signout
              </span>
            ) : (
              <>
                <Link to={"register"}>Register</Link>
                <Link to={"signin"}>Signin</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
