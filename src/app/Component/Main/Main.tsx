'use client'

import useModalStore from '@/Store/ModalStore'
import Modals from '../Modals/Modals'
import styles from './Main.module.scss'
import dynamic from 'next/dynamic'

const ModalContainer = dynamic(() => import('../Modals/ModalContainer'), { ssr: false })

const Main = () => {
    const { modalList, setModal } = useModalStore()

    return (
        <div className={styles.main}>
            <button onClick={() => setModal('create_Todo')}> 할일 추가 </button>
            <ModalContainer>
                <Modals/>
            </ModalContainer>
        </div>
    )
}

export default Main