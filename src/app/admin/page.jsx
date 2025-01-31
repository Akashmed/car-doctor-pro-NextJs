'use client'
import AllBookings from "@/components/AllBookings";
import NewService from "@/components/NewService";
import { useState } from "react";

const Page = () => {
    const [activeTab, setActiveTab] = useState("Manage Bookings");

    return (
        <div className="w-full p-5 md:p-0">
            <div className="container mx-auto space-y-10">
                {/* tabs */}
                <div className="flex justify-center items-center">
                    <div className="flex overflow-x-auto whitespace-nowrap">
                        <button
                            className={`inline-flex items-center h-12 px-4 py-2 text-sm text-center border border-b-0 border-gray-300 sm:text-base dark:border-gray-500 rounded-t-md whitespace-nowrap focus:outline-none ${activeTab === "Manage Bookings" ? "text-black font-bold" : "text-gray-500"}`}
                            onClick={() => setActiveTab("Manage Bookings")}
                        >
                            Manage Bookings
                        </button>

                        <button
                            className={`inline-flex items-center h-12 px-4 py-2 text-sm text-center bg-transparent border-b border-gray-300 sm:text-base dark:border-gray-500 whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 dark:hover:border-gray-300 ${activeTab === "Add New Service" ? "text-black font-bold" : "text-gray-500"}`}
                            onClick={() => setActiveTab("Add New Service")}
                        >
                            Add New Service
                        </button>
                    </div>
                </div>
                {/* lower portion */}
                <div className="p-4 border border-gray-300 bg-base-200 rounded-xl">
                    {activeTab === "Manage Bookings" && <div><AllBookings/></div>}
                    {activeTab === "Add New Service" && <div><NewService/></div>}
                </div>
            </div>
        </div>
    );
};

export default Page;
