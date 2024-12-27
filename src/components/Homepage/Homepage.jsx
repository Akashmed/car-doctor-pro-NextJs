import About from "./About";
import Banner from "./Banner";

const Homepage = () => {
    return (
        <div className="min-h-screen space-y-10 md:space-y-0">
            <Banner/>
            <About/>
        </div>
    );
};

export default Homepage;