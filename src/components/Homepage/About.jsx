
const About = () => {
    return (
        <div className="hero min-h-screen container mx-auto">
            <div className="hero-content flex-col lg:flex-row">
                <div className='lg:w-1/2 relative'>
                    <img
                        src={'/assets/images/about_us/person.jpg'}
                        className="max-w-sm w-3/4 rounded-lg shadow-2xl" />
                    <img
                        src={'/assets/images/about_us/parts.jpg'}
                        className="max-w-sm w-1/2 rounded-lg shadow-2xl absolute right-5 top-1/2 border-8 border-white" />
                </div>
                <div className='lg:w-1/2 mt-8 md:mt-0'>
                    <h3 className='text-3xl text-[#FF3811] font-bold'>About Us</h3>
                    <h1 className="text-5xl text-slate-900 font-bold">We are qualified &<br />of experience in this field</h1>
                    <p className="pt-6 text-[#737373]">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable. </p>
                    <p className="py-6 text-[#737373]">the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                    <button className="btn btn-primary">Get More Info</button>
                </div>
            </div>
        </div>
    );
};

export default About;