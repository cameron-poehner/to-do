import { StyledButton, StyledButtonContainer } from './styles';

interface ButtonProps {
    onClick?: (event?: any) => void | Promise<void>
    title?: string
    type?: string
}

const Button: React.FC<ButtonProps> = ({ onClick, title }) => {

    return (
        <StyledButtonContainer>
            <StyledButton variant="contained" onClick={onClick}>{title}</StyledButton>
        </StyledButtonContainer>
    )
}

export default Button;