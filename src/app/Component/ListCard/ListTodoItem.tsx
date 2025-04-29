import { useTodoActions } from '@/Store/TodoStore';
import { TodoType } from '@/Types/Todo';
import { Box, Button, ButtonGroup } from '@mui/material';

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: 1,
  border: '1px solid #ccc',
  borderRadius: 2,
  backgroundColor: '#f9f9f9',
};

const headTextStyle = {
  flexGrow: 1,
  fontWeight: 'bold',
  fontSize: '1.1rem',
  textAlign: 'center',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};

const ListTodoItem = (props: TodoType) => {
  const { startTodo, endTodo, deleteTodo } = useTodoActions();

  return (
    <Box sx={containerStyle} onClick={() => console.log('onclick')}>
      <Box sx={headTextStyle}>{props.head}</Box>
      <ButtonGroup size="small" variant="outlined" aria-label="Basic button group">
        {props.isActive ? (
          <Button
            sx={theme => ({
              bgcolor: theme.palette.error.main,
              color: theme.palette.error.contrastText,
            })}
            variant="outlined"
            size="small"
            onClick={() => endTodo(props)}
          >
            Stop
          </Button>
        ) : (
          <Button
            sx={theme => ({
              bgcolor: theme.palette.success.main,
              color: theme.palette.success.contrastText,
            })}
            variant="outlined"
            size="small"
            onClick={() => startTodo(props)}
          >
            Start
          </Button>
        )}
        <Button
          sx={theme => ({
            bgcolor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
          })}
          variant="outlined"
          size="small"
          onClick={() => deleteTodo(props)}
        >
          Delete
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default ListTodoItem;
