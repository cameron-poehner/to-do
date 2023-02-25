import React from 'react';
import { StyledListViewerContainer } from './styles';
import ListViewerItem from '../ListViewerItem';
import useStore from '../../store';

interface ListViewerProps {
    lists?: any
}

const ListViewer: React.FC<ListViewerProps> = ({ lists }) => {
    const testLists = useStore(state => state.lists);

    return (
        <StyledListViewerContainer>
            {testLists?.map((list: any) => <ListViewerItem key={list.id} list={list} />)}
        </StyledListViewerContainer>
    );
};

export default ListViewer;