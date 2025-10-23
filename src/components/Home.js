import Footer from "./Footer";
import Main from "./Main";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Home() {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <Main />
            <Footer />
        </div>
    );
}

export default Home;