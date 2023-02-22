import React from 'react';
import { StyledListViewerContainer } from './styles';
import ListViewerItem from '../ListViewerItem';


interface ListViewerProps {
    lists?: any
}

const ListViewer: React.FC<ListViewerProps> = ({ lists }) => {

    return (
        <StyledListViewerContainer>
            {lists?.map((list: any) => <ListViewerItem key={list.id} list={list} />)}
        </StyledListViewerContainer>
    );
};

export default ListViewer;