import { Link } from "react-router-dom";

function Navbar() {
    return (
        <>
            <h1>Navbar Component</h1>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>

        </>
    );
}

export default Navbar;