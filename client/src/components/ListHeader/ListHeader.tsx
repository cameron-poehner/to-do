import { useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';
import {
    StyledListHeader,
} from './styles';
import useStore from '../../store';


interface ListHeaderProps {
    listname?: string;
    task?: any;
}

const ListHeader: React.FC<ListHeaderProps> = ({ listname, task }) => {
    const [showModal, setShowModal] = useState(false);
    const setMode = useStore(state => state.setMode);
    const listTitle = useStore(state => state.listTitle);

    const addNew = () => {
        setShowModal(true);
        setMode('create');
    }

    return (
        <StyledListHeader>
            <h1>{listTitle}</h1>
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