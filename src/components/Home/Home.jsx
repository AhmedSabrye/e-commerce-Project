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
    const { modifyWishlistItem,getWishlist } = useContext(wishlistContextObject);
    function getAllProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }
    useEffect(() => {
        getWishlist()
    }, []);

    const { isError, isLoading, data, error } = useQuery({
        queryKey: ["allProducts"],
        queryFn: getAllProducts,
    });

    if (isError) {
        return (
            <>
                <div className="h-screen flex justify-center items-center">
                    <h1>{error}</h1>
                </div>
            </>
        );
    }

    return (
        <div className="">
            {!isLoading ? (
                <div className="container mx-auto my-5">
                    <Landing />
                    <div className="px-12">
                        <PopularCategories />
                    </div>
                    <div className="flex justify-center items-center min-h-24">
                        <div className=" grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-5 sm:px-24 grid gap-5">
                            {data.data.data.map((product) => {
                                return (
                                    <Product
                                        product={product}
                                        key={product._id}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="min-h-96 flex justify-center items-center">
                    <Triangle
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="triangle-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            )}
        </div>
    );
}
