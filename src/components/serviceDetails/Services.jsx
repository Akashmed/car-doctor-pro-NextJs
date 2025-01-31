import { FaArrowRight } from "react-icons/fa6";

const serArray = ['Full Car Repair', 'Engine Repair', 'Automatic Services', 'Engine Oil Change', 'Battery Change']

const Services = () => {
    return (
        <div className="p-8 space-y-4 bg-base-200 rounded-xl">
            <p className="text-black text-3xl font-bold">Services</p>
            {
                serArray.map((it, indx) => (
                    <div
                        key={indx}
                        className="group p-4 text-black transition duration-300 hover:text-white flex justify-between items-center bg-base-100 hover:bg-[#FF3811] rounded-lg"
                    >
                        <p className="font-semibold">{it}</p>
                        <p className="text-[#FF3811] group-hover:text-white">
                            <FaArrowRight />
                        </p>
                    </div>
                ))

            }
        </div>
    );
};

export default Services;