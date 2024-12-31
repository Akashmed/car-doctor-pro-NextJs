'use client'
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
    const router = useRouter();
    const session = useSession();
    const loginHandler = async (provider) => {
        const res = await signIn(provider, { redirect: false })
    }
    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/');
        }
    }, [session?.status, router]);

    return (
        <div className='flex justify-center items-center gap-3 mt-4'>
            <button onClick={() => loginHandler('google')} className='text-2xl rounded-full p-3 bg-base-200'><FcGoogle /></button>
            <button onClick={() => loginHandler('github')} className='text-2xl rounded-full p-3 bg-base-200'><FaGithub /></button>
        </div>
    );
};

export default SocialLogin;