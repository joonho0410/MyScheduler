export type ModalType = 'create_Todo' | 'controll_Todo'
export type ModalProps = {
    close: (modalType: ModalType) => void
}