import { create } from 'zustand'

interface toDo {
    date: string
    id: string
    progress: Number
    title: string
    user_email: string
}

interface State {
    toDos: toDo[] | null
    showModal: boolean
    mode: string | null
    setToDos: (toDos: toDo[]) => void
    setShowModal: (showModal: boolean) => void
    setMode: (mode: string | null) => void
    fetch: (user_email: any) => void
}

const useStore = create<State>()((set) => ({
    toDos: null,
    showModal: false,
    mode: null,
    setToDos: (toDos: any) => set(state => ({
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
    fetch: async (user_email: any) => {
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