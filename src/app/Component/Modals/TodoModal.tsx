import { Form } from 'antd'

const TodoModal = () => {
    return (
        <div onClick={(e) => {e.stopPropagation()}}>
            <Form>
                <Form.Item
                    messageVariables={{ another: 'good' }}
                    label="user"
                    rules={[{ required: true, message: '${another} is required' }]}
                >
                    
                </Form.Item>
                <Form.Item
                    messageVariables={{ label: 'good' }}
                    label={<span>user</span>}
                    rules={[{ required: true, message: '${label} is required' }]}
                >
                </Form.Item>
            </Form>
        </div>
    )
}

export default TodoModal