import TodoModal from './AddTodoModal/AddTodoModal';
import { TodoModalPropsType } from './AddTodoModal/AddTodoModal';
import ShowTodayModal from './ShowTodayModal/ShowTodayModal';
import TodoControllModal from './TodoControllerModal/TodoControllerModal';
import { useModalActions, useModalList } from '@/Store/ModalStore';
import { ModalType } from '@/Types/Modals';
import { Close } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { ReactNode } from 'react';

const modalBackgroundStyle = {
  display: 'flex', // flexbox를 사용하여 배치
  justifyContent: 'center', // 가운데 정렬
  alignItems: 'center', // 세로로 가운데 정렬
  position: 'fixed', // 모달을 화면에 고정
  top: 0, // 화면 상단에 고정
  left: 0, // 화면 좌측에 고정
  width: '100%', // 전체 화면을 채움
  height: '100vh', // 전체 화면 높이
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경을 반투명 블랙으로 설정
  zIndex: 999, // 다른 요소들보다 위에 표시
};

const modalContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  backgroundColor: 'white', // 모달의 배경색
  borderRadius: '8px', // 모서리 둥글게
  padding: '20px', // 안쪽 여백
  boxShadow: 3, // 그림자 효과
  width: '80%', // 모달 크기 설정 (필요시 조정)
  maxWidth: '500px', // 모달의 최대 너비
  margin: '0 auto', // 중앙 정렬
}; 

const modalMap = {
  create_Todo: (props: TodoModalPropsType) => <TodoModal {...props} />,
  controll_Todo: () => <TodoControllModal />,
  show_Today: () => <ShowTodayModal />,
} as const;

type ModalMap = typeof modalMap;

export type ModalAndProps =
  {
    [K in keyof ModalMap]: Parameters<ModalMap[K]> extends [infer P]
      ? [K, P]
      : [K, undefined];
  }[keyof ModalMap];


const getModal = (modal: ModalAndProps) => {
  const [type, props] = modal;

  switch (type) {
    case 'create_Todo':
      return <TodoModal {...props} />;
    case 'controll_Todo':
      return <TodoControllModal />;
    case 'show_Today':
      return <ShowTodayModal />;
  }
};
  

const Modals = () => {
  const modalList = useModalList();

  return (
    <>
      {modalList.map((modal, idx) => {
        const [type, props] = modal;
        return (
          <Modals.Background key={type} type={type} idx={idx}>
            <Modals.Container type={type}>{getModal(modal)}</Modals.Container>
          </Modals.Background>
        );
      })}
    </>
  );
};

const ModalsBackground = ({
  type,
  idx,
  children,
}: {
  type: ModalType;
  idx: number;
  children: React.ReactNode;
}) => {
  const { deleteModal } = useModalActions();

  return (
    <Box
      sx={{ ...modalBackgroundStyle, zIndex: idx + 100 }}
      onClick={e => {
        e.stopPropagation();
        deleteModal(type); // 모달 삭제
      }}
    >
      {children}
    </Box>
  );
};

const exitButtonStyle = {
  alignSelf: 'end',
  color: 'grey.500',
  '&:hover': {
    color: 'grey.800',
  },
};
const ModalsContainer = ({ type, children }: { type: ModalType; children: ReactNode }) => {
  const { deleteModal } = useModalActions();

  return (
    <Box
      sx={theme => ({ ...modalContainerStyle, bgcolor: theme.palette.custom.card.bg })}
      onClick={e => e.stopPropagation()}
    >
      <IconButton onClick={() => deleteModal(type)} aria-label="close" sx={exitButtonStyle}>
        <Close />
      </IconButton>
      {children}
    </Box>
  );
};

Modals.Background = ModalsBackground;
Modals.Container = ModalsContainer;

export default Modals;
