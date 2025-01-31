import Image from "next/image";
import Link from "next/link";

const CarDoctor = () => {
    return (
        <div className="p-8 py-16 bg-black rounded-xl space-y-5 flex flex-col items-center justify-center">
            <div className="flex justify-center">
                <Link href={'/'}>
                   <Image src={'/assets/logo_updated.svg'} alt="logo" height={150} width={150}/>
                </Link>
            </div>
            <p className="text-2xl font-bold text-center">Need help? We Are Here To Help You</p>
            <div className="p-10 bg-white relative rounded-xl">
                <p className="text-2xl text-black font-semibold"><span className="text-[#FF3811]">Car Doctor</span> Special</p>
                <p className="text-center font-bold text-black">Save Up To <span className="text-[#FF3811]">60% Off</span></p>
                <span className="bg-[#FF3811] text-white cursor-pointer font-bold rounded-lg px-5 py-3 absolute left-1/2 -translate-x-1/2 -bottom-5">Get A Quote</span>
            </div>
        </div>
    );
};

export default CarDoctor;