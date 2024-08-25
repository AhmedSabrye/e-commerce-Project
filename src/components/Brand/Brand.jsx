import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Triangle } from "react-loader-spinner";
import { useParams } from "react-router-dom";

export default function Brand() {
    const { id } = useParams();
    function getSpecificBrand() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
    }

    const { isError, isLoading, error, data } = useQuery({
        queryKey: ["specificBrand"],
        queryFn: getSpecificBrand,
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
        <div>
            {!isLoading ? (
                <div className="flex justify-center items-center ">
                    <div className="w-1/3">
                        <img
                            src={data.data.data.image}
                            className="w-full"
                            alt=""
                        />
                    </div>
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
    );
}
