import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './views/home/home';
import { Detail } from './views/Detail/detail';
import { Contenido } from './views/Contenido/contenido';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/movie/:id" element={<Detail />} />
                <Route path="/tv/:id" element={<Detail />} />
                <Route path="/movies" element={<Contenido />} />
                <Route path="/series" element={<Contenido />} />


                <Route path="/" element={<Navigate to="/home" />}></Route>
                <Route path="*" element={<Navigate to="/home" />}></Route>
            </Routes>
        </BrowserRouter>
    );
}