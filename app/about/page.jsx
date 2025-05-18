import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const About = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold mb-4">About Us</h1>
                <p className="text-lg text-center max-w-2xl">
                    Welcome to our website! We are dedicated to providing you with the best experience possible.
                     Our team is passionate about what we do, and we strive to exceed your expectations.
                </p>
            </div>
            <Footer />
        </>
    );
}
export default About;



