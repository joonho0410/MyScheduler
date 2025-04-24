import AddMainTaskModal from '@/app/Component/Modals/AddMainTaskModal/AddMainTaskModal';
import ShowMainTaskModal from '@/app/Component/Modals/ShowMaintaskModal/ShowMainTaskModal';
import ShowTodayModal from '@/app/Component/Modals/ShowTodayModal/ShowTodayModal';
import UpdateMainTaskModal from '@/app/Component/Modals/UpdateMainTaskModal/UpdateMainTaskModal';
import type { ComponentProps } from 'react';

export type ModalType = 'show_mainTask' | 'add_mainTask' | 'show_Today' | 'update_mainTask';

export const modalMap = {
  add_mainTask: (props: ComponentProps<typeof AddMainTaskModal>) => <AddMainTaskModal {...props} />,
  show_mainTask: (props: ComponentProps<typeof ShowMainTaskModal>) => (
    <ShowMainTaskModal {...props} />
  ),
  show_Today: (props: ComponentProps<typeof ShowTodayModal>) => <ShowTodayModal {...props} />,
  update_mainTask: (props: ComponentProps<typeof UpdateMainTaskModal>) => (
    <UpdateMainTaskModal {...props} />
  ),
} as const;

export type ModalMap = typeof modalMap;

// modalMap 이 key로 ModalType을 갖고 JSX.Element를 반환하는 함수를 value로 가지고 있는지 판별해주는 역할.
type CheckValidModalMap<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => React.JSX.Element ? T[K] : never;
};

// Valid 한 ModalType을 가진 ModalMap인지 확인해 주는 역할.
type ValidateModalMap = CheckValidModalMap<ModalMap>;

// ModalInstance가 가지고 있을 수 있는 타입들을 찾아주는 역할.
// [modalType, modalType에 맞는 Props]들을 타입으로 갖게 된다.
export type ModalInstanceType = {
  [K in keyof ValidateModalMap]: Parameters<ValidateModalMap[K]> extends [infer P]
    ? { type: K; props: P }
    : never;
}[keyof ValidateModalMap];
