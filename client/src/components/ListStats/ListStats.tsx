import React from 'react';
import { StyledContainer, StyledStatContainer } from './styles';
import Button from '../Button';
import useStore from '../../store';

const ListStats: React.FC<any> = ({ showCompleted, setShowCompleted }) => {
    const completedToDos = useStore(state => state.completedToDos);

    const handleClick = () => {
        setShowCompleted(!showCompleted);
    };

    return (
        <StyledContainer>
            <StyledStatContainer>
                <p>{completedToDos?.length} completed</p>
            </StyledStatContainer>
            <Button title='show' variant='text' onClick={handleClick} />
        </StyledContainer>
    )
}

export default ListStats;