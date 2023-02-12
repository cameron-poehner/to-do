import React, { useState } from 'react';
import {
    StyledAuthContainer,
    StyledForm,
    StyledFormContainer,
    StyledTextField,
    StyledAuthOptions
} from './styles'
import Button from '../Button';
import { InputLabel } from '@mui/material'

const Auth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
    const [error, setError] = useState<any>(null);

    const viewLogin = (status: any) => {
        setError(null);
        setIsLoggedIn(status);
    };

    const handleChange = (event: any) => {
        event.preventDefault();
        console.log('Event', event);
    }

    const handleSubmit = async (event: any, endpoint: any) => {
        event.preventDefault();
        if (!isLoggedIn && password !== confirmPassword) {
            setError('Make sure passwords match');
            return;
        }

        await fetch(`${process.env.REACT_APP_SERVER_URL}/${endpoint}`)
    }

    return (
        <StyledAuthContainer>
            <StyledFormContainer>
                <StyledForm>
                    <h2 style={{ fontWeight: 400, fontFamily: 'Helvetica', letterSpacing: '1.5px', alignSelf: 'center' }}>{isLoggedIn ? 'Please log in' : 'Please sign up!'}</h2>
                    <InputLabel htmlFor='email'>Email</InputLabel>
                    <StyledTextField
                        autoComplete='off'
                        type='email'
                        placeholder='email'
                        variant='standard'
                        id='email'
                        name='email'
                        onChange={handleChange}
                    />
                    <InputLabel htmlFor='password'>Password</InputLabel>
                    <StyledTextField
                        type='password'
                        placeholder='password'
                        variant='standard'
                        id='password'
                        name='password'
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
                            />
                        </>
                    }
                    <Button type='submit' title='SUBMIT' onClick={(event: any) => handleSubmit(event, isLoggedIn ? 'login' : 'signup')} />
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