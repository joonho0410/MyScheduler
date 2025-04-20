import { useModalActions } from '@/Store/ModalStore';
import { useTodoActions } from '@/Store/TodoStore';
import { TodoType } from '@/Types/Todo';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';

let id = 1;

type FieldType = {
  head: string;
  content?: string;
};

const TodoModal = () => {
  const { deleteModal } = useModalActions();
  const { addTodo } = useTodoActions();

  const onFinish: FormProps<FieldType>['onFinish'] = values => {
    const newTodo: TodoType = {
      todoId: String(id++),
      head: values.head,
      content: values.content ?? '',
      isActive: false,
    };
    addTodo(newTodo);
    deleteModal('create_Todo');
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="할 일"
          name="head"
          rules={[{ required: true, message: '할 일을 적어주세요!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="상세 내용" name="content">
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            할 일 추가
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TodoModal;
