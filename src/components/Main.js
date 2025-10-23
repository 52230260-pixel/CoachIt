import { Routes, Route } from "react-router-dom";
import About from "../pages/About";

function Main() {
    return (
        <>
        <h1>Main Page</h1>
        <Routes>
            <Route path = "/" element={ <div>Home Page</div>} />
            {/* <Route path="/about" element={<About />} /> */}
            <Route path="/about" Component={About} />


        </Routes>
        </>
    );
}

export default Main;