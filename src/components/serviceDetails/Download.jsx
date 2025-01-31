import { FaArrowRight } from "react-icons/fa6";
import { HiDocumentChartBar } from "react-icons/hi2";

const Download = () => {
    return (
        <div className="p-8 space-y-3 bg-black rounded-xl">
            <p className="text-white text-3xl font-bold">Download</p>
            <div>
                <div className="flex p-4 justify-between items-center hover:bg-gray-900 rounded-lg cursor-pointer">
                    <div className="flex items-center justify-center gap-5">
                        <p className="text-3xl"><HiDocumentChartBar /></p>
                        <p><span className="text-xl font-semibold">Our Brochure</span><br />
                        <span>Download</span></p>
                    </div>
                    <p className="bg-[#FF3811] rounded-lg p-4"><FaArrowRight /></p>
                </div>
            </div>
            <div>
                <div className="flex p-4 justify-between items-center hover:bg-gray-900 rounded-lg cursor-pointer">
                    <div className="flex items-center justify-center gap-5">
                        <p className="text-3xl"><HiDocumentChartBar /></p>
                        <p><span className="text-xl font-semibold">Company Details</span><br />
                        <span>Download</span></p>
                    </div>
                    <p className="bg-[#FF3811] rounded-lg p-4"><FaArrowRight /></p>
                </div>
            </div>
        </div>
    );
};

export default Download;