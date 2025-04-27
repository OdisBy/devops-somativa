import { BrowserRouter, Route, Routes } from "react-router";

import SignInWrapper from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/cadastro" exact={true} element={<SignUp />} />
                <Route path="/login" exact={true} element={<SignInWrapper />} />
                <Route path="/" exact={true} element={<SignInWrapper />} />
                <Route path="/home" exact={true} element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;