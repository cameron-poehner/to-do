import { StyledButton, StyledButtonContainer } from './styles';

type variant = 'text' | 'contained' | 'outlined'

interface ButtonProps {
    onClick?: any
    title?: string
    variant?: variant
}


const Button: React.FC<ButtonProps> = ({ onClick, title, variant }) => {

    return (
        <StyledButtonContainer>
            <StyledButton variant={variant} onClick={onClick}>{title}</StyledButton>
        </StyledButtonContainer>
    )
}

export default Button;