'use client'

import useModalStore from '@/Store/ModalStore'
import Modals from '../Modals/Modals'
import dynamic from 'next/dynamic'
import styles from './Main.module.scss'
import AddTodoButton from '../Buttons/AddTodoButton/AddTodoButton'

const ModalContainer = dynamic(() => import('../Modals/ModalContainer'), { ssr: false })

const Main = () => {
    const { modalList, setModal } = useModalStore()

    return (
        <div className={styles.main}>
            <AddTodoButton/>
            <ModalContainer>
                <Modals/>
            </ModalContainer>
        </div>
    )
}

export default Main