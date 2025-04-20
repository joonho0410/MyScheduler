'use client';

import BasicButton from '../Common/BasicButton';
import Modals from '../Modals/Modals';
import styles from './Main.module.scss';
import { useModalActions } from '@/Store/ModalStore';
import dynamic from 'next/dynamic';

const ModalContainer = dynamic(() => import('../Modals/ModalContainer'), { ssr: false });

const Main = () => {
  const { setModal } = useModalActions();

  return (
    <div className={styles.main}>
      <BasicButton
        onClick={() => setModal('controll_Todo')}
        sx={{
          position: 'absolute',
          top: '40px',
          right: '40px',
        }}
      >
        할 일 추가
      </BasicButton>
      <BasicButton
        onClick={() => setModal('show_Today')}
        sx={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
        }}
      >
        한 일 보기
      </BasicButton>
      <ModalContainer>
        <Modals />
      </ModalContainer>
    </div>
  );
};

export default Main;
