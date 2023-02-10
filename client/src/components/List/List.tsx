import React from 'react';
import { StyledList } from './styles';
import ListHeader from '../ListHeader';
import ListItem from '../ListItem';

const List: React.FC<any> = (props) => {

    return (
        <StyledList>
            <ListHeader listname={'New York Prep List'} />
            {props?.list?.map((task: any) => <ListItem key={task.id} task={task} />)}
        </StyledList>
    )
};

export default List;