import { StyledButton, StyledButtonContainer } from './styles';

const Button: React.FC<any> = ({ onClick, title }) => {

    return (
        <StyledButtonContainer>
            <StyledButton variant="contained" onClick={onClick}>{title}</StyledButton>
        </StyledButtonContainer>
    )
}

export default Button;