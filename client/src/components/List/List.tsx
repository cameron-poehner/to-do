import { StyledList } from './styles';
import ListHeader from '../ListHeader';
import ListItem from '../ListItem';
import useStore from '../../store';
import { useCookies } from 'react-cookie';
import { useMatch } from 'react-router-dom';

type option = 'todos' | 'list'

const List: any = ({ list }: any) => {
    const toDos = useStore(state => state.toDos);
    const [cookies, setCookie, removeCookie] = useCookies();

    return (
        <StyledList>
            <ListHeader listname={`${cookies.Email}'s To-do Lists`} />
            {toDos?.map((task: any) => <ListItem key={task.id} task={task} />)}
        </StyledList>
    )
};

export default List;