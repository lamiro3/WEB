import { Routes, Route, Navigate} from "react-router-dom";
import Home from "./home/Home";
import Login, { isLoggedIn } from "./login/Login";
import Writing from "./writing/Writing";

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