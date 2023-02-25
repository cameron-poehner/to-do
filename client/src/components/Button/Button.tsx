import { StyledButton, StyledButtonContainer } from './styles';

type variant = 'text' | 'contained' | 'outlined'

interface ButtonProps {
    onClick?: any
    title?: string
    variant?: variant
    tabIndex?: any
}


const Button: React.FC<ButtonProps> = ({ onClick, title, variant, tabIndex }) => {

    return (
        <StyledButtonContainer>
            <StyledButton tabIndex={tabIndex} variant={variant} onClick={onClick}>{title}</StyledButton>
        </StyledButtonContainer>
    )
}

export default Button;