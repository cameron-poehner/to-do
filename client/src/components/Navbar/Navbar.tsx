import React from 'react';
import { StyledNav, StyledLink, StyledLinkContainer } from './styles';
import { useCookies } from 'react-cookie';
import Button from '../Button';

const Navbar = () => {
    const [cookies, setCookie, removeCookie] = useCookies();


    const signOut = () => {
        removeCookie('Email');
        removeCookie('AuthToken');
        // window.location.reload();
    }

    return (
        <StyledNav style={{ zIndex: 10 }}>
            <StyledLinkContainer>
                <StyledLink to="/">Home</StyledLink>
                <StyledLink to='lists'>Lists</StyledLink>
                <StyledLink to='/'>
                    <Button variant='contained' title='Sign Out' onClick={signOut} />
                </StyledLink>
            </StyledLinkContainer>
        </StyledNav>
    )
}

export default Navbar;