import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Triangle } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Categories() {
    function getAllCategories() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    }

    const { isLoading, isError, data } = useQuery({
        queryKey: ["allCategories"],
        queryFn: getAllCategories,
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
            <div className=" container mx-auto  p-5 my-5 grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
                {data.data.data.map((categories) => {
                    return (
                        <Link
                            to={`/Categories/${categories._id}`}
                            key={categories._id}
                            className="ring-1 ring-emerald-600 overflow-hidden rounded-2xl hover:scale-125 bg-white duration-300 shadow-xl"
                        >
                            <img
                                src={categories.image}
                                alt={categories.name}
                                className="w-full h-52 object-cover object-top"
                            />
                            <h3 className="text-center my-3 font-extrabold">
                                {categories.name}
                            </h3>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}
