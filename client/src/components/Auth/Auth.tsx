import React, { useState, SyntheticEvent } from 'react';
import {
    StyledAuthContainer,
    StyledForm,
    StyledFormContainer,
    StyledTextField,
    StyledAuthOptions
} from './styles'
import Button from '../Button';
import { InputLabel, FormHelperText } from '@mui/material'
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

    const handleSubmit = async (event: SyntheticEvent, endpoint: string) => {
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


        if (data.detail) {
            setError(data.detail);
        } else {
            setCookie('Email', data.email);
            setCookie('AuthToken', data.token);

            window.location.reload();
        }
    }

    const passwordError = 'Login failed';
    const emailError = 'User does not exist';
    const confirmPasswordError = 'Make sure passwords match';

    return (
        <StyledAuthContainer>
            <StyledFormContainer>
                <StyledForm>
                    <h2
                        style={{
                            fontWeight: 400,
                            fontFamily: 'Helvetica',
                            letterSpacing: '1.5px',
                            alignSelf: 'center',
                            padding: 0,
                        }}>
                        {isLoggedIn ? 'Please log in' : 'Please sign up!'}
                    </h2>
                    <InputLabel error={error === emailError ? true : false} htmlFor='email'>Email</InputLabel>
                    <StyledTextField
                        autoComplete='off'
                        type='email'
                        placeholder='email'
                        variant='standard'
                        id='email'
                        name='email'
                        error={error === emailError ? true : false}
                        onChange={event => (setEmail(event?.target.value))}
                    />
                    {error === emailError && <FormHelperText error={error === emailError ? true : false} id='component-error-text'>{error}</FormHelperText>}
                    <InputLabel error={error === passwordError ? true : false} htmlFor='password'>Password</InputLabel>
                    <StyledTextField
                        type='password'
                        placeholder='password'
                        variant='standard'
                        id='password'
                        name='password'
                        error={error === passwordError ? true : false}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <>
                        {error === passwordError &&
                            <FormHelperText error={error === passwordError ? true : false} id='component-error-text'>{error}</FormHelperText>
                        }
                    </>
                    {!isLoggedIn &&
                        <>
                            <InputLabel error={error === confirmPasswordError ? true : false} htmlFor='confirm-password'>Confirm Password</InputLabel>
                            <StyledTextField
                                type='password'
                                placeholder='confirm password'
                                variant='standard'
                                id='confirm-password'
                                name='confirm-password'
                                error={error === confirmPasswordError ? true : false}
                                onChange={event => setConfirmPassword(event.target.value)}
                            />
                            {error === confirmPasswordError && <FormHelperText error={error === confirmPasswordError ? true : false} id='component-error-text'>{error}</FormHelperText>}
                        </>
                    }
                    <Button variant='contained' title='SUBMIT' onClick={(event: SyntheticEvent) => handleSubmit(event, isLoggedIn ? 'login' : 'signup')} />
                </StyledForm>
                {!isLoggedIn && (
                    <StyledAuthOptions>
                        <p>Already have an account?</p>
                        <Button variant='text' title='Sign in' onClick={() => viewLogin(true)} />
                    </StyledAuthOptions>
                )}
                {isLoggedIn && (
                    <StyledAuthOptions>
                        <p>Don't have an account?</p>
                        <Button variant='text' title='Sign Up' onClick={() => viewLogin(false)} />
                    </StyledAuthOptions>
                )

                }
            </StyledFormContainer>
        </StyledAuthContainer>
    )
}

export default Auth;