'use client';
import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import SocialLogin from '@/components/SocialLogin';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const LoginForm = () => {
    const searchParams = useSearchParams();
    const redirect = searchParams?.get("redirect");

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        await signIn('credentials', {
            email,
            password,
            redirect: true, // Let NextAuth handle the redirection
            callbackUrl: redirect || '/' // Redirect to intended page or fallback to home
        });
    };

    return (
        <form onSubmit={handleLogin}>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input required type="text" name="email" placeholder="email" className="input input-bordered" />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input required type="password" name="password" placeholder="password" className="input input-bordered" />
                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
            </div>
            <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="Login" />
            </div>
        </form>
    );
};

const Page = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen justify-between container mx-auto">
            <div className="text-black flex justify-center items-center w-full p-5">
                <Image src="/assets/images/login/login.svg" height={340} width={440} alt="login page" />
            </div>
            <div className="text-black flex justify-center items-center p-3 md:p-0 w-full">
                <div className="md:w-2/3 w-full rounded-lg shadow-lg border border-base-300 p-7 h-[90%] flex flex-col justify-center">
                    <h1 className="text-3xl text-center font-bold">Login</h1>

                    {/* Safe Suspense wrapper to avoid server-client mismatch errors */}
                    <Suspense fallback={<div>Loading login form...</div>}>
                        <LoginForm />
                    </Suspense>

                    <div className="flex flex-col items-center mt-4">
                        <span>Or sign in with</span>
                        <div>
                            <SocialLogin />
                        </div>
                    </div>
                    <p className="my-4 text-center">
                        New to Car Doctor? 
                        <Link href="/signup" className="text-orange-600 font-bold"> Sign Up </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Page;
