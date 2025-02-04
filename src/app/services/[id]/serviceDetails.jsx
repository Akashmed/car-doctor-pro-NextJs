"use client";

import { useEffect, useState } from "react";
import { getServiceDetails } from "@/services/getServices";
import { FaRegCirclePlay } from "react-icons/fa6";
import numWords from "num-words";
import Services from "@/components/serviceDetails/Services";
import Download from "@/components/serviceDetails/Download";
import CarDoctor from "@/components/serviceDetails/CarDoctor";
import Link from "next/link";

const ServiceDetails = ({ serviceId }) => {
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!serviceId) return;

            try {
                const details = await getServiceDetails(serviceId);
                if (details?.service) {
                    setService(details.service);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [serviceId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner text-error"></span>
            </div>
        );
    }

    if (!service) return <p>No service details found.</p>;

    // Destructure service object
    const { description, img, facility, price, title } = service;

    return (
        <div className="w-full">
            <div className="container md:w-[95%] mx-auto space-y-24 p-5 md:p-0">
                {/* Upper banner */}
                <div className="relative">
                    <img src="/assets/images/banner/4.jpg" className="h-[300px] w-full object-cover rounded-xl" />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]"></div>
                    <h2 className="font-bold text-4xl text-white absolute top-1/2 -translate-y-1/2 md:left-20 left-10">
                        Service Details
                    </h2>
                    <span className="p-3 px-10 bg-[#FF3811] absolute bottom-0 left-1/2 -translate-x-1/2"
                        style={{ clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0% 100%)" }}>
                        Home/Services Details
                    </span>
                </div>

                {/* Content */}
                <div className="flex flex-col md:flex-row w-full">
                    {/* Left Section (2/3) */}
                    <div className="md:w-2/3 space-y-10">
                        <img src={img} className="h-[400px] w-[752px] object-cover rounded-xl" />
                        <div className="space-y-5">
                            <h2 className="text-black text-3xl font-bold">{title}</h2>
                            <p className="text-slate-500">{description}</p>

                            <div className="grid grid-cols-2 gap-4">
                                {facility?.length > 0 &&
                                    facility.map((fcl, inx) => (
                                        <div key={inx} className="bg-base-200 border-t-2 border-[#FF3811] p-8 rounded-xl">
                                            <h4 className="text-xl text-black font-semibold">{fcl.name}</h4>
                                            <p className="text-slate-500 text-sm">{fcl.details}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Steps Section */}
                        <div className="space-y-5">
                            <h2 className="text-black text-3xl font-bold">3 Simple Steps to Process</h2>
                            <p className="text-slate-500">{description.slice(0, 250)}</p>
                            <div className="grid grid-cols-3 gap-4">
                                {[1, 2, 3].map((it, indx) => (
                                    <div key={indx} className="flex flex-col justify-center items-center space-y-3 p-5 border border-slate-300 rounded-xl">
                                        <div className="p-3 bg-[#ff39112d] rounded-full">
                                            <p className="p-3 px-4 bg-[#FF3811] rounded-full text-white text-lg font-bold">0{it}</p>
                                        </div>
                                        <h3 className="text-black text-lg font-semibold">STEP {numWords(it).toUpperCase()}</h3>
                                        <p className="text-slate-500">It Uses A Dictionary Over 200.</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Video Section */}
                        <div className="video-container relative">
                            <img src='/assets/images/banner/2.jpg' className="h-[360px] w-full object-cover rounded-xl" />
                            <FaRegCirclePlay className="text-6xl text-red-600 cursor-pointer absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
                        </div>
                    </div>

                    {/* Right Section (1/3) */}
                    <div className="md:w-1/3 space-y-10 md:px-3 mt-10 md:mt-0">
                        <Services />
                        <Download />
                        <CarDoctor />
                        <div className="flex flex-col space-y-5">
                            <p className="text-3xl font-bold text-black">Price ${price}</p>
                            <Link href="/checkout" className="btn w-full font-bold text-center btn-primary text-lg">Proceed to Checkout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;
