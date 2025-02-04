'use client'
import { getServices } from '@/services/getServices';
import ServiceCard from '../ServiceCard';
import { useEffect, useState } from 'react';

const Services = () => {
    const [ser, setSer] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSer = async () => {
            try {
                setLoading(true);
                const { services } = await getServices(); // Fetch services
                setSer(services);
            } catch (error) {
                console.error("Fetching services failed:", error.message);
            } finally {
                setLoading(false);
            }
        };
        getSer();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner text-error"></span>
            </div>
        );
    }


    return (
        <div id='services'>
            <div className="text-center">
                <h3 className="text-2xl font-bold text-[#FF3811]">Our Services</h3>
                <h2 className="text-5xl text-slate-900">Our Service Area</h2>
                <p className='text-[#737373]'>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which do not look even slightly believable. </p>
                {/* <button
                    className="btn btn-secondary mt-1">
                    {asc ? 'PRICE: HIGH TO LOW' : 'PRICE: LOW TO HIGH'}
                </button> */}
                {/* <p className="m-3 font-semibold">Showing results from {asc ? 'low to high' : 'high to low'}</p> */}
                <form>
                    <input type="text" name="search" className='border-[#d7d6d6] border-2 p-2 rounded-lg text-slate-900'></input>
                    <input className="btn" type="submit" value='search'></input>
                </form>
            </div>
            <div className="w-full flex justify-center">
                {/* this div in below doesn't get shown in production */}
                <div className='w-full text-black grid md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center'>
                    {
                        ser?.length > 0 && ser?.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Services;