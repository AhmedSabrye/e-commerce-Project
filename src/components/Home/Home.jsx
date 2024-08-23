import axios from "axios";
import { Triangle } from "react-loader-spinner";
import Product from "../Product/Product";
import PopularCategories from "./PopularCategories/PopularCategories";
import Landing from "./Landing/Landing";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { wishlistContextObject } from "../../context/WishlistContext";

export default function Home() {
    // const [allProducts, setAllProducts] = useState(null);
    const {modifyWishlistItem} = useContext(wishlistContextObject)
    function getAllProducts() {
        return axios
            .get("https://ecommerce.routemisr.com/api/v1/products")
            // .then((res) => {
            //     setAllProducts(res.data.data);
            // })
            // .catch((err) => {
            //     console.log(err);
            // });
    }
    useEffect(() => {
    //     getAllProducts();
    //     //there is nothing to get the array of wishlisted items so we do this to solve  it
        modifyWishlistItem("6428e479dc1175abc65ca078");
        modifyWishlistItem("6428e479dc1175abc65ca078");
    //     console.log(allProducts);
    //     return;
    }, []);
    // useEffect(() => {
    //     console.log(allProducts);
    // }, [allProducts]);

    const {isError, isLoading, data} = useQuery({
        queryKey: ["allProducts"],
        queryFn: getAllProducts,

    })
    
    
    return (
        <div className="container  mx-auto my-5">
            <Landing />
            <PopularCategories />

            <div className="flex justify-center items-center min-h-24">
                {!isLoading ? (
                    <div className=" grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 px-24 grid gap-5">
                        {data.data.data.map((product) => {
                            return (
                                <Product product={product} key={product._id} />
                            );
                        })}
                    </div>
                ) : (
                    <Triangle
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="triangle-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                )}
            </div>
        </div>
    );
}
