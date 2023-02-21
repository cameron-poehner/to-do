import { StyledList } from './styles';
import ListHeader from '../ListHeader';
import ListItem from '../ListItem';
import useStore from '../../store';
import { useCookies } from 'react-cookie';

type option = 'todos' | 'list'

const List: any = ({ list }: any) => {
    const toDos = useStore(state => state.toDos);
    const [cookies, setCookie, removeCookie] = useCookies();
    const view: any = 'list';
    console.log('To-dos', toDos);
    console.log('list', list);
    const lists = view === 'list' ? list : toDos;

    return (
        <StyledList>
            <ListHeader listname={`${cookies.Email}'s To-do Lists`} />
            {lists.map((task: any) => <ListItem key={task.id} task={task} />)}
        </StyledList>
    )
};

export default List;