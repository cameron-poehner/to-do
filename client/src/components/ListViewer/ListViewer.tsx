import React from 'react';
import { StyledListViewerContainer } from './styles';
import ListViewerItem from '../ListViewerItem';

interface List {
    date: Date
    id: string
    title: string
    user_email: string
}

interface ListViewerProps {
    lists?: List[]
}

const ListViewer: React.FC<ListViewerProps> = ({ lists }) => {

    return (
        <StyledListViewerContainer>
            {lists?.map((list: any) => <ListViewerItem key={list.id} list={list} />)}
        </StyledListViewerContainer>
    );
};

export default ListViewer;