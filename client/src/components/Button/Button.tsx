import { StyledButton, StyledButtonContainer } from './styles';

type variant = 'text' | 'contained' | 'outlined'

interface ButtonProps {
    onClick?: any
    title?: string
    variant?: variant
    tabIndex?: any
    style?: any
}


const Button: React.FC<ButtonProps> = ({ onClick, title, variant, tabIndex, style }) => {

    return (
        <StyledButton style={style} tabIndex={tabIndex} variant={variant} onClick={onClick}>{title}</StyledButton>
    )
}

export default Button;