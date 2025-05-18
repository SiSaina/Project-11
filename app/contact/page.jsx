import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Contact = () => {
    return (
        <>
            <Navbar />

            <section className="min-h-screen bg-gray-50 px-4 py-20">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
                    <p className="text-gray-600 mb-10">
                        Have questions, feedback, or just want to say hello? Fill out the form below.
                    </p>

                    <form className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
                        <div>
                            <label className="block text-left text-gray-700 font-medium mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Your Name"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-left text-gray-700 font-medium mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-left text-gray-700 font-medium mb-2" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows={5}
                                placeholder="Write your message..."
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Contact;
