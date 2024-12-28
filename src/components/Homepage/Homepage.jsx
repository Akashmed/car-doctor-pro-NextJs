import About from "./About";
import Banner from "./Banner";
import Services from "./Services";

const Homepage = () => {
    return (
        <div className="min-h-screen space-y-10 md:space-y-0">
            <Banner/>
            <About/>
            <Services/>
        </div>
    );
};

export default Homepage;