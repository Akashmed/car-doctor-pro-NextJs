'use client'
import Link from 'next/link';
import Image from 'next/image';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import SocialLogin from '@/components/SocialLogin';


const page = () => {
    const handleSignUP = async (e) => {
        e.preventDefault();
        const form = e.target;
        const newUser = {
            name: form.name.value,
            email: form.email.value,
            password: form.password.value
        };
        try {
            const res = await fetch(`http://localhost:3000/signup/api`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            if (!res.ok) {
                console.error(`Error: ${res.statusText}`);
                return;
            }

            const data = await res.json();
            if (data.data.acknowledged) {
                e.target.reset();
            }
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen justify-between container mx-auto">
            <div className='text-black flex justify-center items-center w-full p-5'>
                <Image src={'/assets/images/login/login.svg'} height={340} width={440} alt='login page' />
            </div>
            <div className='text-black flex justify-center items-center w-full'>
                <div className="w-2/3 rounded-lg shadow-lg border border-base-300 p-7 h-[90%] flex flex-col justify-center">
                    <h1 className="text-3xl text-center font-bold">Sign Up</h1>
                    <form onSubmit={handleSignUP}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input required type="text" name='name' placeholder="Name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input required type="text" name='email' placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input required type="password" name='password' placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Sign up" />
                        </div>
                    </form>
                    <div className='flex flex-col items-center mt-4'>
                        <span>Or sign up with</span>
                        <div>
                            <SocialLogin />
                        </div>
                    </div>
                    <p className='my-4 text-center'>Already have an account ? <Link href={'/login'} className='text-orange-600 font-bold'>Login</Link> </p>
                </div>
            </div>
        </div>
    );
};

export default page;