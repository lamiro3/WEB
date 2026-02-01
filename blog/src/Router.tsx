import { Routes, Route, Navigate} from "react-router-dom";
import Home from "./Home";
import Login, { isLoggedIn } from "./Login";
import Writing from "./Writing";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route 
                path="/login" 
                element={isLoggedIn() ? <Navigate to="/" /> : <Login />} 
            />
            <Route path="/writing" element={<Writing />} />
        </Routes>
    );
}

export default Router;