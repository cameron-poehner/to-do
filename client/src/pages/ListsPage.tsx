import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { StyledPage, theme } from '../styles/styles';
import Navbar from '../components/Navbar';

const ListsPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <StyledPage>
                <Navbar />
                <h1>Hello World</h1>
            </StyledPage>
        </ThemeProvider>
    )
}

export default ListsPage;