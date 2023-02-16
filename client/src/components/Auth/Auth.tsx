import React, { useState, SyntheticEvent } from 'react';
import {
    StyledAuthContainer,
    StyledForm,
    StyledFormContainer,
    StyledTextField,
    StyledAuthOptions
} from './styles'
import Button from '../Button';
import { InputLabel } from '@mui/material'
import { useCookies } from 'react-cookie';

const Auth = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const viewLogin = (status: boolean): void => {
        setError(null);
        setIsLoggedIn(status);
    };

    const handleSubmit = async (event: any, endpoint: string): Promise<void> => {
        event.preventDefault();
        if (!isLoggedIn && password !== confirmPassword) {
            setError('Make sure passwords match');
            return;
        }

        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        console.log('Data', data);

        if (data.detail) {
            setError(data.detail);
        } else {
            setCookie('Email', data.email);
            setCookie('AuthToken', data.token);

            window.location.reload();
        }
    }

    return (
        <StyledAuthContainer>
            <StyledFormContainer>
                <StyledForm>
                    <h2
                        style={{
                            fontWeight: 400,
                            fontFamily: 'Helvetica',
                            letterSpacing: '1.5px',
                            alignSelf: 'center'
                        }}>
                        {isLoggedIn ? 'Please log in' : 'Please sign up!'}
                    </h2>
                    <InputLabel htmlFor='email'>Email</InputLabel>
                    <StyledTextField
                        autoComplete='off'
                        type='email'
                        placeholder='email'
                        variant='standard'
                        id='email'
                        name='email'
                        onChange={event => (setEmail(event?.target.value))}
                    />
                    <InputLabel htmlFor='password'>Password</InputLabel>
                    <StyledTextField
                        type='password'
                        placeholder='password'
                        variant='standard'
                        id='password'
                        name='password'
                        onChange={event => setPassword(event.target.value)}
                    />
                    {!isLoggedIn &&
                        <>
                            <InputLabel htmlFor='confirm-password'>Confirm Password</InputLabel>
                            <StyledTextField
                                type='password'
                                placeholder='confirm password'
                                variant='standard'
                                id='confirm-password'
                                name='confirm-password'
                                onChange={event => setConfirmPassword(event.target.value)}
                            />
                        </>
                    }
                    <Button type='submit' title='SUBMIT' onClick={(event: SyntheticEvent) => handleSubmit(event, isLoggedIn ? 'login' : 'signup')} />
                    {error && <p>{error}</p>}
                </StyledForm>
                <StyledAuthOptions>
                    <Button title='Sign in' onClick={() => viewLogin(false)} />
                    <Button title='Sign Up' onClick={() => viewLogin(true)} />
                </StyledAuthOptions>
            </StyledFormContainer>
        </StyledAuthContainer>
    )
}

export default Auth;