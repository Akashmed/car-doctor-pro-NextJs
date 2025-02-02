'use client'
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { IoCartOutline, IoSearchSharp } from "react-icons/io5";

const Navbar = () => {
    const usrInfo = useSession();
    return (
        <div className="bg-base-100 text-slate-900">
            <div className="navbar container mx-auto">
                <div className="navbar-start">
                    <Link href={'/'}>
                        <Image src={'/assets/logo.svg'} alt="logo" height={60} width={100} />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <div className="flex items-center space-x-6">
                        {
                            navLinks.map(item => (
                                <Link className="font-semibold hover:text-primary duration-300" href={item.path} key={item.title}>{item.title}</Link>
                            ))
                        }
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="flex justify-center items-center space-x-3">
                        <Link href={'/myBookings'} className="text-2xl"><IoCartOutline /></Link>
                        {/* <button className="text-2xl"><IoSearchSharp /></button> */}
                        {
                            usrInfo?.data?.user?.type === 'Admin' ? <Link href={'/admin'} className="btn btn-outline btn-primary px-6">Admin</Link> : <Link href={'/checkout'} className="btn hidden md:inline-flex btn-outline btn-primary md:px-6">Appoinment</Link>

                        }
                        {
                            !usrInfo.data ? <Link className="btn btn-outline btn-primary px-6" href={'/login'}>
                                Login</Link> : <button onClick={signOut} className="btn btn-outline btn-primary px-6">Logout</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
const navLinks = [
    {
        title: "Home",
        path: '/'
    },
    {
        title: "About",
        path: '/#about'
    },
    {
        title: "Services",
        path: '/#services'
    },
    {
        title: "Blog",
        path: '/blog'
    },
    {
        title: "Contact",
        path: '/contact'
    }
]

export default Navbar;