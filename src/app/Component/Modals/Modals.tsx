import TodoModal from './AddTodoModal/AddTodoModal';
import styles from './Modals.module.scss';
import ShowTodayModal from './ShowTodayModal/ShowTodayModal';
import TodoControllModal from './TodoControllerModal/TodoControllerModal';
import { useModalActions, useModalList } from '@/Store/ModalStore';
import { ModalType } from '@/Types/Modals';
import { Box } from '@mui/material';

const s1 = {
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

const s2 = {
  backgroundColor: 'white', // 모달의 배경색
  borderRadius: '8px', // 모서리 둥글게
  padding: '20px', // 안쪽 여백
  boxShadow: 3, // 그림자 효과
  width: '80%', // 모달 크기 설정 (필요시 조정)
  maxWidth: '500px', // 모달의 최대 너비
  margin: '0 auto', // 중앙 정렬
};

const getModal = (type: ModalType) => {
  switch (type) {
    case 'create_Todo':
      return <TodoModal />;
    case 'controll_Todo':
      return <TodoControllModal />;
    case 'show_Today':
      return <ShowTodayModal />;
    default:
      null;
  }
};

const Modals = () => {
  const modalList = useModalList();
  const { deleteModal } = useModalActions();

  return (
    <>
      {modalList.map((type, idx) => (
        <Box
          key={type}
          sx={{ ...s1, zIndex: 999 - idx }}
          onClick={e => {
            e.stopPropagation();
            deleteModal(type); // 모달 삭제
          }}
        >
          <Box
            sx={s2}
            onClick={e => e.stopPropagation()} // 클릭 이벤트 전파 막기
          >
            <button onClick={() => deleteModal(type)}>X</button>
            {getModal(type)} {/* 모달 콘텐츠 */}
          </Box>
        </Box>
      ))}
    </>
  );
};

export default Modals;
