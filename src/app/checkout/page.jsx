'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
    const session = useSession();
    const email  = session?.data?.user?.email;
    const router = useRouter();
    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const data = {
            first_name: form.fname.value,
            last_name: form.lname.value,
            phone: form.phone.value,
            email: form.email.value,
            message: form.msg.value
        }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout/api`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const dat = await res.json();

            if (dat?.data?.acknowledged) {
                router.push('/');
                e.target.reset();
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className="w-full">
            <div className="container mx-auto space-y-24 p-5 md:p-0">
                <div className="relative">
                    {/* Upper banner */}
                    <img src="/assets/images/banner/4.jpg" className="h-[300px] w-full object-cover rounded-xl" />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]"></div>
                    <h2 className="font-bold text-4xl text-white absolute top-1/2 -translate-y-1/2 md:left-20 left-10">
                        Checkout
                    </h2>
                    <span className="p-3 px-10 bg-[#FF3811] absolute bottom-0 left-1/2 -translate-x-1/2" style={{
                        clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0% 100%)",
                    }}>Home/Checkout</span>
                </div>
                {/* form part */}
                <form onSubmit={handleSubmit}>
                    <div className="bg-base-200 p-6 md:p-24 rounded-xl gap-5 grid grid-cols-1 md:grid-cols-2 w-full">
                        <input type="text" name="fname" className="rounded-lg text-black p-4 w-full" placeholder="First Name" required />
                        <input type="text" name="lname" className="rounded-lg text-black p-4 w-full" placeholder="Last Name" />
                        <input type="text" name="phone" className="rounded-lg text-black p-4 w-full" placeholder="Your Phone" required />
                        <input type="email" name="email" value={email} className="rounded-lg text-black p-4 w-full" placeholder="Your Email" readOnly/>
                        <textarea rows={6} name="msg" className="rounded-lg text-black p-4 w-full md:col-span-2" placeholder="Your Message" required></textarea>
                        <button className="btn btn-primary w-full md:col-span-2">Order Confirm</button>
                    </div>
                </form>


            </div>

        </div>
    );
};

export default page;