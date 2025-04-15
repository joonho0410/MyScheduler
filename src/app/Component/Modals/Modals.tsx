import { useModalActions, useModalList } from '@/Store/ModalStore'
import styles from './Modals.module.scss'
import TodoModal from './AddTodoModal/AddTodoModal'
import { ModalType } from '@/Types/Modals'
import TodoControllModal from './TodoControllerModal/TodoControllerModal'
import ShowTodayModal from './ShowTodayModal/ShowTodayModal'

const getModal = (type: ModalType) => {
    switch(type) {
        case 'create_Todo' : return <TodoModal/>
        case 'controll_Todo' : return <TodoControllModal/>
        case 'show_Today': return <ShowTodayModal/>
        default: null;
    }
}

const Modals = () => {
    const modalList = useModalList();
    const { deleteModal } = useModalActions();
    
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