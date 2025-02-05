'use client';
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

// Handle login logic separately
const SocialLoginHandler = () => {
    const router = useRouter();
    const session = useSession();
    const searchParams = useSearchParams();
    const redirect = searchParams?.get("redirect") || '/'; // Fallback redirect

    const loginHandler = async (provider) => {
        await signIn(provider, { redirect: false });
    };

    useEffect(() => {
        if (session.status === 'authenticated') {
            setTimeout(() => {
                router.replace(redirect);
            }, 100);
        }
    }, [session.status]);  // Removed router from dependencies

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
