import React from 'react';
import { StyledButton, StyledButtonContainer } from './styles';

const Button: React.FC<any> = (props) => {
    console.log('props', props);


    return (
        <StyledButtonContainer>
            <StyledButton variant="contained" onClick={props?.onClick}>{props?.title}</StyledButton>
        </StyledButtonContainer>
    )
}

export default Button;