import TodoModal from "@/app/Component/Modals/AddTodoModal/AddTodoModal";
import { TodoModalPropsType } from "@/app/Component/Modals/AddTodoModal/AddTodoModal";
import TodoControllModal from "@/app/Component/Modals/TodoControllerModal/TodoControllerModal";
import ShowTodayModal from "@/app/Component/Modals/ShowTodayModal/ShowTodayModal";

export type ModalType = 'create_Todo' | 'controll_Todo' | 'show_Today';

const modalMap = {
  create_Todo: (props: TodoModalPropsType) => <TodoModal {...props} />,
  controll_Todo: () => <TodoControllModal />,
  show_Today: () => <ShowTodayModal />,
} as const;

export type ModalMap = typeof modalMap

export type ModalInstanceType =
  {
    [K in keyof ModalMap]: Parameters<ModalMap[K]> extends [infer P]
      ? {type: K, props: P}
      : {type: K, props?: undefined};
  }[keyof ModalMap];