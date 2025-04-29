import { ModalType } from '@/Types/Modals';
import { ModalInstanceType } from '@/Types/Modals';
import { create } from 'zustand';

// 같은 모달이 중첩될 수 있나? 있다면 id 사용이 필요할듯?
type ModalInstanceList = ModalInstanceType[];

type State = {
  modalList: ModalInstanceList;
};

type Action = {
  action: {
    setModal: (modalInstance: ModalInstanceType) => void;
    deleteModal: (modalType: Pick<ModalInstanceType, 'type'>['type']) => void;
  };
};

const useModalStore = create<State & Action>()(set => ({
  modalList: [],
  action: {
    setModal: modalInstance =>
      set(state => {
        for (let instance of state.modalList) {
          if (instance.type === modalInstance.type) return state;
        }
        return { modalList: [...state.modalList, modalInstance] };
      }),
    deleteModal: modalType =>
      set(state => ({ modalList: state.modalList.filter(e => e.type !== modalType) })),
  },
}));

export const useModalList = () => useModalStore(state => state.modalList);
export const useModalActions = () => useModalStore(state => state.action);
