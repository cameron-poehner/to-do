import { useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';
import {
    StyledListHeader,
    StyledButtonContainer,
} from './styles';
import { useCookies } from 'react-cookie';
import useStore from '../../store';


interface ListHeaderProps {
    listname: string;
    task?: any;
}

const ListHeader: React.FC<ListHeaderProps> = ({ listname, task }) => {
    const [showModal, setShowModal] = useState(false);
    const fetchData = useStore(state => state.fetch);
    const setMode = useStore(state => state.setMode);
    const [cookies, setCookie, removeCookie] = useCookies();

    const signOut = () => {
        removeCookie('Email');
        removeCookie('AuthToken');
        window.location.reload();
    }

    const addNew = () => {
        fetchData(cookies.Email);
        setShowModal(true);
        setMode('create');
    }

    return (
        <StyledListHeader>
            <h1>{listname}</h1>
            <StyledButtonContainer>
                <Button
                    onClick={addNew}
                    title="ADD NEW"
                    variant='contained'
                />
                <Button
                    onClick={signOut}
                    title="SIGN OUT"
                    variant='contained'
                />
            </StyledButtonContainer>
            {showModal && <Modal task={task} setShowModal={setShowModal} />}
        </StyledListHeader>
    )
}

export default ListHeader;