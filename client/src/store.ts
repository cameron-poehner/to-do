import { create } from 'zustand'

export interface toDo {
    date?: string | Date
    id?: string
    progress?: number
    title?: string
    user_email?: string
}

interface State {
    toDos: toDo[] | null
    mode: string | null
    lists: any
    list: any
    listId: any
    setToDos: (toDos: toDo[]) => void
    setMode: (mode: string | null) => void
    setLists: (lists: any) => void
    setList: (list: any) => void
    setListId: (listId: any) => void
    fetchLists: (user_email: string) => void
    fetchList: (list_id: string, user_email: string) => void
    fetchToDos: (list_id?: string, user_email?: string) => void
}

const useStore = create<State>()((set) => ({
    toDos: [],
    mode: null,
    lists: [],
    list: [],
    listId: '',
    setToDos: (toDos: toDo[]) => set(state => ({
        ...state,
        toDos,
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
    }
}));

export default useStore;