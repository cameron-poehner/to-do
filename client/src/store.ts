import { create } from 'zustand'

export interface toDo {
    date?: string | Date
    id?: string
    progress?: number
    title?: string
    user_email: string
}

interface State {
    toDos: toDo[] | null
    showModal: boolean
    mode: string | null
    setToDos: (toDos: toDo[]) => void
    setShowModal: (showModal: boolean) => void
    setMode: (mode: string | null) => void
    fetch: (user_email: string) => void
}

const useStore = create<State>()((set) => ({
    toDos: null,
    showModal: false,
    mode: null,
    setToDos: (toDos: toDo[]) => set(state => ({
        ...state,
        toDos,
    })),
    setShowModal: (showModal: boolean) => set(state => ({
        ...state,
        showModal,
    })),
    setMode: (mode: string | null) => set((state) => ({
        ...state,
        mode,
    })),
    fetch: async (user_email: string): Promise<void> => {
        await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${user_email}`)
            .then(res => res.json())
            .then(toDos =>
                useStore.setState((state: any) => ({
                    ...state,
                    toDos,
                })))
    }
}));

export default useStore;