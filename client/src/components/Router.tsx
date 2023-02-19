import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Test from './Test';
import ListsPage from '../pages/ListsPage';

const Router: React.FC<any> = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/lists" element={<ListsPage />} />
        </Routes>
    </BrowserRouter>
);

export default Router;