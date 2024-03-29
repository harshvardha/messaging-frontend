import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Messaging from "./pages/Messaging/Messaging";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <div className="App" style={{ backgroundColor: "#0c1317", height: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
