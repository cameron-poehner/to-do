import React, { useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';
import {
    StyledListHeader,
    StyledButtonContainer,
} from './styles';


interface ListHeaderProps {
    listname: any;
}

const ListHeader: React.FC<ListHeaderProps> = (props) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const signOut = () => {
        console.log('You have been signed out');
    }

    const addNew = () => {
        console.log('You have added a new to-do item');
        setShowModal(true);
    }

    return (
        <StyledListHeader>
            <h1>{props.listname}</h1>
            <StyledButtonContainer>
                <Button
                    onClick={addNew}
                    title="ADD NEW"
                />
                <Button
                    onClick={signOut}
                    title="SIGN OUT"
                />
            </StyledButtonContainer>
            {showModal && <Modal mode='create' setShowModal={setShowModal} />}
        </StyledListHeader>
    )
}

export default ListHeader;