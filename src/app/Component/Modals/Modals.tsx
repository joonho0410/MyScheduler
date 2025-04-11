import useModalStore from '@/Store/ModalStore'
import styles from './Modals.module.scss'
import TodoModal from './TodoModal'
import { ModalType } from '@/Types/Modals'

const getModal = (type: ModalType) => {
    switch(type) {
        case 'create_Todo' : return <TodoModal/>
        default: null;
    }
}

const Modals = () => {
    const { modalList, setModal, deleteModal } = useModalStore()
    
    return (
        <>
          {
            modalList.map((type) => (
                <div key={type} className={styles.modals_Container} onClick={(e) => {e.stopPropagation(); deleteModal(type)}}>
                    <div className={styles.modals_contents} onClick={(e) => e.stopPropagation()}>
                        {getModal(type)}
                    </div>
                </div>
            ))
          }
        </>
    )
}

export default Modals