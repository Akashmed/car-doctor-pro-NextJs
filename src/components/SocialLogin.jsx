'use client';
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

// Handle login logic separately
const SocialLoginHandler = () => {
    const session = useSession();
    const searchParams = useSearchParams();
    const redirect = searchParams?.get("redirect") ;

    const loginHandler = async (provider) => {
        await signIn(provider, { redirect: true, callbackUrl: redirect || '/' });
    };


    return (
        <div className='flex justify-center items-center gap-3 mt-4'>
            <button onClick={() => loginHandler('google')} className='text-2xl rounded-full p-3 bg-base-200'>
                <FcGoogle />
            </button>
            <button onClick={() => loginHandler('github')} className='text-2xl rounded-full p-3 bg-base-200'>
                <FaGithub />
            </button>
        </div>
    );
};

const SocialLogin = () => {
    return (
        <Suspense fallback={<div>Loading social login...</div>}>
            <SocialLoginHandler />
        </Suspense>
    );
};

export default SocialLogin;
