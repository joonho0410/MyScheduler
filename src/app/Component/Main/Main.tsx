'use client'

import { useModalActions, useModalList } from '@/Store/ModalStore'
import Modals from '../Modals/Modals'
import dynamic from 'next/dynamic'
import styles from './Main.module.scss'

const ModalContainer = dynamic(() => import('../Modals/ModalContainer'), { ssr: false })

const Main = () => {
    const modalLsit = useModalList()
    const { setModal } = useModalActions();

    return (
        <div className={styles.main}>
            <button onClick={() => setModal('controll_Todo')}> 할일 추가 </button>
            <ModalContainer>
                <Modals/>
            </ModalContainer>
        </div>
    )
}

export default Main