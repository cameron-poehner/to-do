import { useState } from 'react';
import { StyledList } from './styles';
import ListHeader from '../ListHeader';
import ListItem from '../ListItem';
import ListStats from '../ListStats';
import useStore from '../../store';

const List = () => {
    const [showCompleted, setShowCompleted] = useState(false);
    const toDos = useStore(state => state.toDos);
    const completedToDos = useStore(state => state.completedToDos);

    return (
        <StyledList>
            <ListHeader />
            <ListStats showCompleted={showCompleted} setShowCompleted={setShowCompleted} />
            {toDos?.map((task: any) => <ListItem key={task.id} task={task} />)}
            {showCompleted && completedToDos?.map((task: any) => <ListItem key={task.id} task={task} />)}
        </StyledList>
    )
};

export default List;