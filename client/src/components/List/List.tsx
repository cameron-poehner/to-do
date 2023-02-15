import { StyledList } from './styles';
import ListHeader from '../ListHeader';
import ListItem from '../ListItem';
import useStore from '../../store';

const List: React.FC<any> = (props) => {
    const toDos = useStore(state => state.toDos);

    return (
        <StyledList>
            <ListHeader listname={'New York Prep List'} />
            {toDos?.map((task: any) => <ListItem key={task.id} task={task} />)}
        </StyledList>
    )
};

export default List;