import { create } from "zustand";
import { ModalType } from "@/Types/Modals";

// 같은 모달이 중첩될 수 있나? 있다면 id 사용이 필요할듯?

type State = {
    modalList: ModalType[]
}

type Action = {
    action : {
        setModal: (modalType: ModalType) => void
        deleteModal: (modalType: ModalType) => void    
    }
}

const useModalStore = create<State & Action>()((set) => ({
    modalList : [],
    action : {
        setModal: (modalType) => set((state) => {
            if (state.modalList.includes(modalType)) return state
            return ({modalList: [...state.modalList, modalType]})
        }),
        deleteModal: (modalType) => set((state) => ({modalList: state.modalList.filter((e) => e !== modalType )})) 
    }
}))

export const useModalList = () => useModalStore((state) => state.modalList)
export const useModalActions = () => useModalStore((state) => state.action)
