import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './views/home/home';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />


                <Route path="" element={<Navigate to="/home" />}></Route>
                <Route path="*" element={<Navigate to="/home" />}></Route>
            </Routes>
        </BrowserRouter>
    );
}