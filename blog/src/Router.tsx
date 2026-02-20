import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./home/Home";
import Login, { isLoggedIn } from "./login/Login";
import Writing from "./writing/Writing";
import Content from "./content/Content";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route 
                path="/login" 
                element={isLoggedIn() ? <Navigate to="/" /> : <Login />} 
            />
            <Route path="/writing" element={<Writing />} />
            {/* 동적 파라미터 id 활용 */}
            <Route path="/content/:id" element={<Content />} />
        </Routes>
    );
}

export default Router;