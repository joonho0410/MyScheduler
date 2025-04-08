import { create } from "zustand";
import { ModalType } from "@/Types/Modals";

// 같은 모달이 중첩될 수 있나? 있다면 id 사용이 필요할듯?

interface ModalState {
    modalList : ModalType[]
    setModal: (modalType: ModalType) => void
    deleteModal: (modalType: ModalType) => void
}

const useModalStore = create<ModalState>()((set) => ({
    modalList : [],
    setModal: (modalType) => set((state) => {
        if (state.modalList.includes(modalType)) return state
        return ({modalList: [...state.modalList, modalType]})
    }),
    deleteModal: (modalType) => set((state) => ({modalList: state.modalList.filter((e) => e !== modalType )})) 
}))

export default useModalStore