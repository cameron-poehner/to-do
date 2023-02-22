import React from 'react';
import { StyledContainer, StyledLink, StyledButtonContainer, StateContainer } from './styles';
import Button from '../Button';

const ListViewerItem: React.FC<any> = ({ list }) => {
    console.log('List', list);

    const handleClick = () => {
        console.log('Im clicked')
    }
    return (
        <StyledContainer>
            <StyledLink to={`/lists/${list.id}`}>
                <Button variant='text' onClick={handleClick} title={list.title} />
            </StyledLink>
            <StateContainer>1</StateContainer>
            <StyledButtonContainer>
                <Button variant='contained' onClick={handleClick} title='edit' />
                <Button variant='contained' onClick={handleClick} title='delete' />
            </StyledButtonContainer>
        </StyledContainer>
    );
};

export default ListViewerItem;