export type ModalType = 'create_Todo' | 'controll_Todo' | 'show_Today';
export type ModalProps = {
  close: (modalType: ModalType) => void;
};
