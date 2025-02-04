import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
const ServiceCard = ({ service }) => {
    const { _id, title, img, price } = service;
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure className="px-10 pt-10 h-2/3">
                <img
                    src={img}
                    alt="Shoes"
                    className="rounded-xl h-[178px]" />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-slate-900">{title}</h2>
                <div className="card-actions flex justify-between">
                    <button className="text-lg font-semibold text-[#FF3811]">Price: ${price}</button>
                    <Link href={`services/${_id}`} className="text-lg font-semibold text-[#FF3811]"><FaArrowRight /></Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;