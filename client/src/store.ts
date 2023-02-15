import { create } from 'zustand'

interface BearState {
    bears: number
    toDos: any
    showModal: boolean
    mode: string | null
    increase: (by: number) => void
    setToDos: (toDos: any) => void
    setShowModal: (showModal: boolean) => void
    setMode: (mode: string | null) => void
    fetch: (user_email: any) => void
}

const useStore = create<BearState>()((set) => ({
    bears: 0,
    toDos: null,
    showModal: false,
    mode: null,
    setToDos: (toDos: any) => set(state => ({
        ...state,
        toDos,
    })),
    increase: (by) => set((state) => ({ bears: state.bears + by })),
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