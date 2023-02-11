import React from 'react';
import { StyledList } from './styles';
import ListHeader from '../ListHeader';
import ListItem from '../ListItem';

const List: React.FC<any> = (props) => {
    console.log('props', props);

    return (
        <StyledList>
            <ListHeader listname={'New York Prep List'} getData={props?.getData} />
            {props?.list?.map((task: any) => <ListItem key={task.id} task={task} getData={props.getData} />)}
        </StyledList>
    )
};

export default List;