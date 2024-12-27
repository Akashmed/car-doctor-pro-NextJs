
const Banner = () => {
    const banners = [
        {
            title: 'Affordable Price For Car Servicing',
            description: 'There are many variations of passages of  available, but the majority have suffered alteration in some form',
            next: '#slide2',
            prev: '#slide4'
        },
        {
            title: 'Affordable Price For Car Servicing',
            description: 'There are many variations of passages of  available, but the majority have suffered alteration in some form',
            next: '#slide3',
            prev: '#slide1'
        },
        {
            title: 'Affordable Price For Car Servicing',
            description: 'There are many variations of passages of  available, but the majority have suffered alteration in some form',
            next: '#slide4',
            prev: '#slide2'
        },
        {
            title: 'Affordable Price For Car Servicing',
            description: 'There are many variations of passages of  available, but the majority have suffered alteration in some form',
            next: '#slide1',
            prev: '#slide3'
        },
    ]
    return (
        <div className="w-full h-[550px] flex justify-center">
            <div className="carousel w-full container">
                {
                    banners.map((bnr, indx) => (
                        <div id={`slide${indx + 1}`} className="carousel-item relative w-full">
                            <img src={`/assets/images/banner/${indx + 1}.jpg`} className="w-full rounded-xl object-cover md:object-top" />
                            <div className="absolute rounded-xl flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                                <div className='text-white space-y-7 pl-12 w-1/2'>
                                    <h2 className='text-6xl font-bold'>{bnr.title}</h2>
                                    <p>{bnr.description}</p>
                                    <div className="">
                                        <button className="btn btn-primary mb-2 md:mb-0 md:mr-5">Discover More</button>
                                        <button className="btn btn-outline btn-secondary">Latest Project</button>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute left-5 right-5 bottom-0 flex -translate-y-1/2 transform justify-end">
                                <a href={bnr.prev} className="btn btn-circle mr-5">❮</a>
                                <a href={bnr.next} className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Banner;