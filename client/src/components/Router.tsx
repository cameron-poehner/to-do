import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import ListsPage from '../pages/ListsPage';
import ToDosPage from '../pages/ToDosPage';
import Navbar from './Navbar';
import { ThemeProvider } from '@emotion/react';
import { theme, StyledPage } from '../styles/styles';

const Router: React.FC<any> = () => (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <StyledPage>
                <Navbar />
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/lists" element={<ListsPage />} />
                    <Route path="/lists/:list" element={<ToDosPage />} />
                </Routes>
            </StyledPage>
        </BrowserRouter>
    </ThemeProvider>
);

export default Router;