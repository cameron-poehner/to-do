import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import ListsPage from '../pages/ListsPage';
import ToDosPage from '../pages/ToDosPage';

const Router: React.FC<any> = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/lists" element={<ListsPage />} />
            <Route path="/lists/:list" element={<ToDosPage />} />
        </Routes>
    </BrowserRouter>
);

export default Router;