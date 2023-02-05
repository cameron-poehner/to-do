import React from 'react';
import {
    StyledListHeader,
    StyledButton,
    StyledContainer,
    StyledButtonContainer,
} from './styles';


interface ListHeaderProps {
    listname: any;
}

const ListHeader: React.FC<ListHeaderProps> = (props) => {
    console.log('Props', props);

    const signOut = () => {
        console.log('You have been signed out');
    }

    const addNew = () => {
        console.log('You have added a new to-do item');
    }

    return (
        <StyledListHeader>
            <StyledContainer>
                <h1>{props.listname}</h1>
                <StyledButtonContainer>
                    <StyledButton
                        variant="contained"
                        onClick={addNew}
                    >ADD NEW</StyledButton>
                    <StyledButton
                        variant="contained"
                        onClick={signOut}
                    >SIGN OUT</StyledButton>
                </StyledButtonContainer>
            </StyledContainer>
        </StyledListHeader>
    )
}

export default ListHeader;