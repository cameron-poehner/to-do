import { useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';
import {
    StyledListHeader,
    StyledButtonContainer,
} from './styles';
import { useCookies } from 'react-cookie';
import useStore from '../../store';
import { useMatch } from 'react-router-dom';


interface ListHeaderProps {
    listname: string;
    task?: any;
}

const ListHeader: React.FC<ListHeaderProps> = ({ listname, task }) => {
    const [showModal, setShowModal] = useState(false);
    const fetchData = useStore(state => state.fetchToDos);
    const setMode = useStore(state => state.setMode);
    const [cookies, setCookie, removeCookie] = useCookies();

    const addNew = () => {
        // fetchData(cookies.Email);
        setShowModal(true);
        setMode('create');
    }

    return (
        <StyledListHeader>
            <h1>{listname}</h1>
            <Button
                onClick={addNew}
                title="ADD NEW"
                variant='contained'
            />
            {showModal && <Modal task={task} setShowModal={setShowModal} />}
        </StyledListHeader>
    )
}

export default ListHeader;