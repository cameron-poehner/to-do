import React, { useState } from 'react';
import { StyledContainer, StyledListHeader } from './styles';
import Button from '../Button';
import ListModal from '../ListModal';

interface ListPageHeaderProps {
    user: string
}

const ListPageHeader: React.FC<ListPageHeaderProps> = ({ user }) => {
    const [showModal, setShowModal] = useState(false);

    const addNew = () => {
        setShowModal(true);
    }

    return (
        <StyledContainer>
            <StyledListHeader>
                {user}'s Lists
            </StyledListHeader>
            <Button
                onClick={addNew}
                title="ADD NEW"
                variant='contained'
            />
            {showModal && <ListModal setShowModal={setShowModal} />}
        </StyledContainer>
    );
};

export default ListPageHeader;