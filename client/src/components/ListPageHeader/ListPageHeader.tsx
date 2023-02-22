import React, { useState } from 'react';
import { StyledContainer } from './styles';
import Button from '../Button';
import useStore from '../../store';
import ListModal from '../ListModal';

const ListPageHeader: React.FC<any> = ({ user }) => {
    const setMode = useStore(state => state.setMode);
    const [showModal, setShowModal] = useState(false);

    const addNew = () => {
        // fetchData(cookies.Email);
        setShowModal(true);
        setMode('create');
    }

    return (
        <StyledContainer>
            <h1>
                {user}'s Lists
            </h1>
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