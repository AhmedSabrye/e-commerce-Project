import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Triangle } from "react-loader-spinner";

export default function Brands() {
    function getAllBrands() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    }

    const { isLoading, isError, data } = useQuery({
        queryKey: ["allBrands"],
        queryFn: getAllBrands,
    });

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">

            <Triangle
                visible={true}
                height="120"
                width="120"
                color="#4fa94d"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
                </div>
        );
    }
    if (isError) {
        return <h1>Error</h1>;
    }

    return (
        <>
            <div className=" container mx-auto  p-5 my-5 grid grid-cols-5 gap-5">
                {data.data.data.map((brand) => {
                    return (
                        <div
                            key={brand._id}
                            className="bg-emerald-500 rounded-2xl p-3"
                        >
                            <img
                                src={brand.image}
                                alt={brand.name}
                                className="w-full"
                            />
                            <h3>{brand.name}</h3>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
