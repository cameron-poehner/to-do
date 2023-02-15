import Button from '../Button';
import Modal from '../Modal';
import {
    StyledListHeader,
    StyledButtonContainer,
} from './styles';
import { useCookies } from 'react-cookie';
import useStore from '../../store';


interface ListHeaderProps {
    listname: any;
    getData?: any;
    task?: any;
}

const ListHeader: React.FC<ListHeaderProps> = (props) => {
    const fetchData = useStore(state => state.fetch);
    const showModal = useStore(state => state.showModal);
    const setShowModal = useStore(state => state.setShowModal);
    const setMode = useStore(state => state.setMode);
    const [cookies, setCookie, removeCookie] = useCookies();

    const signOut = () => {
        removeCookie('Email');
        removeCookie('AuthToken');
        window.location.reload();
    }

    const addNew = () => {
        console.log('You have added a new to-do item');
        fetchData(cookies.Email);
        setShowModal(true);
        setMode('create');
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
            {showModal && <Modal task={props?.task} />}
        </StyledListHeader>
    )
}

export default ListHeader;