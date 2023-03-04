import { create } from 'zustand'

export interface toDo {
    date: Date
    id: string
    list_id: string
    completed: boolean
    title: string
    notes: string
    user_email: string
}

interface State {
    toDos: toDo[] | null
    completedToDos: toDo[] | null
    mode: string | null
    lists: any
    list: any
    listId: any
    listTitle: any
    setToDos: (toDos: toDo[]) => void
    setCompletedToDos: (completedToDos: toDo[]) => void
    setMode: (mode: string | null) => void
    setLists: (lists: any) => void
    setList: (list: any) => void
    setListId: (listId: any) => void
    setListTitle: (listTitle: any) => void
    fetchLists: (user_email: string) => void
    fetchList: (list_id: string, user_email: string) => void
    fetchToDos: (list_id?: string, user_email?: string) => void
    fetchCompletedToDos: (list_id?: string, user_email?: string) => void
    fetchListTitle: (list_id: string) => void
}

const useStore = create<State>()((set) => ({
    toDos: [],
    completedToDos: [],
    mode: null,
    lists: [],
    list: [],
    listId: '',
    listTitle: '',
    setToDos: (toDos: toDo[]) => set(state => ({
        ...state,
        toDos,
    })),
    setCompletedToDos: (completedToDos: any) => set(state => ({
        ...state,
        completedToDos,
    })),
    setMode: (mode: string | null) => set((state) => ({
        ...state,
        mode,
    })),
    setLists: (lists: any) => set(state => ({
        ...state,
        lists,
    })),
    setList: (list: any) => set(state => ({
        ...state,
        list,
    })),
    setListId: (listId: any) => set(state => ({
        ...state,
        listId,
    })),
    setListTitle: (listTitle: any) => set(state => ({
        ...state,
        listTitle,
    })),
    fetchLists: async (user_email: string): Promise<void> => {
        await fetch(`${process.env.REACT_APP_SERVER_URL}/lists/${user_email}`)
            .then(res => res.json())
            .then(lists =>
                useStore.setState((state: any) => ({
                    ...state,
                    lists,
                })))
    },
    fetchList: async (list_id: string, user_email: string): Promise<void> => {
        await fetch(`${process.env.REACT_APP_SERVER_URL}/lists/${list_id}/${user_email}`)
            .then(res => res.json())
            .then(list =>
                useStore.setState((state: any) => ({
                    ...state,
                    list,
                })));
    },
    fetchToDos: async (list_id?: string, user_email?: string,): Promise<void> => {
        await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${list_id}/${user_email}`)
            .then(res => res.json())
            .then(toDos =>
                useStore.setState((state: any) => ({
                    ...state,
                    toDos,
                })))
    },
    fetchCompletedToDos: async (list_id?: string, user_email?: string,): Promise<void> => {
        await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${list_id}/${user_email}/completed`)
            .then(res => res.json())
            .then(completedToDos =>
                useStore.setState((state: any) => ({
                    ...state,
                    completedToDos,
                })))
    },
    fetchListTitle: async (list_id: string): Promise<void> => {
        await fetch(`${process.env.REACT_APP_SERVER_URL}/list/list_title/${list_id}`)
            .then(res => res.json())
            .then(listTitle =>
                useStore.setState((state: any) => ({
                    ...state,
                    listTitle,
                })))
    }
}));

export default useStore;