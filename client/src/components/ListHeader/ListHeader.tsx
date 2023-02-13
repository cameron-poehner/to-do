import React, { useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';
import {
    StyledListHeader,
    StyledButtonContainer,
} from './styles';
import { useCookies } from 'react-cookie';


interface ListHeaderProps {
    listname: any;
    getData: any;
}

const ListHeader: React.FC<ListHeaderProps> = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [showModal, setShowModal] = useState<boolean>(false);

    const signOut = () => {
        console.log('You have been signed out');
        removeCookie('Email');
        removeCookie('AuthToken');
        window.location.reload();
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
            {showModal && <Modal mode='create' setShowModal={setShowModal} getData={props?.getData} />}
        </StyledListHeader>
    )
}

export default ListHeader;