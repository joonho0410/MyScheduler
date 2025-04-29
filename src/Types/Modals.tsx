import AddMainTaskModal from '@/app/Component/Modals/AddMainTaskModal/AddMainTaskModal';
import ShowMainTaskModal from '@/app/Component/Modals/ShowMaintaskModal/ShowMainTaskModal';
import ShowTodayModal from '@/app/Component/Modals/ShowTodayModal/ShowTodayModal';
import UpdateMainTaskModal from '@/app/Component/Modals/UpdateMainTaskModal/UpdateMainTaskModal';
import type { ComponentProps } from 'react';

const modalMap = {
  add_mainTask: (props: ComponentProps<typeof AddMainTaskModal>) => <AddMainTaskModal {...props} />,
  show_mainTask: (props: ComponentProps<typeof ShowMainTaskModal>) => (
    <ShowMainTaskModal {...props} />
  ),
  show_Today: (props: ComponentProps<typeof ShowTodayModal>) => <ShowTodayModal {...props} />,
  update_mainTask: (props: ComponentProps<typeof UpdateMainTaskModal>) => (
    <UpdateMainTaskModal {...props} />
  ),
} as const;

// 알맞은 모달 컴포넌트를 렌더링 해주는 컴포넌트
export const renderModal = (modal: ModalInstanceType) => {
  const ModalComponent = modalMap[modal.type] as any;

  return ModalComponent(modal.props);
};

type ModalMap = CheckValidMap<typeof modalMap>;
type CheckValidMap<T extends Record<string, (...args: any[]) => React.JSX.Element>> = T;

// type ModalMap = CheckValidMap<typeof modalMap>;
export type ModalType = keyof ModalMap;

// ModalInstance가 가지고 있을 수 있는 타입들을 찾아주는 역할.
// [modalType, modalType에 맞는 Props]들을 타입으로 갖게 된다.
export type ModalInstanceType = {
  [K in keyof ModalMap]: Parameters<ModalMap[K]> extends [infer P] ? { type: K; props: P } : never;
}[keyof ModalMap];
