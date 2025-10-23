import { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if (isLoggedIn) {
    return (
      <>
        <Home />
        <button onClick={() => setIsLoggedIn(false)}>Logout</button>
      </>
    );
  }
  return (
    <>
      <Login />
      <button onClick={() => setIsLoggedIn(true)}>Login</button>
    </>
  );
}

export default App;
