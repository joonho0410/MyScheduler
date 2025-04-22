// components/SubtaskItem.tsx
import {
  Checkbox,
  ButtonGroup,
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from '@mui/material';
import React from 'react';

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: 1,
  border: '1px solid #ccc',
  borderRadius: 2,
  backgroundColor: '#f9f9f9',
};

type SubtaskItemProps = { id: string; title: string; completed: boolean };

const SubtaskItem = (subtask: SubtaskItemProps): React.JSX.Element => {
  const dummy = () => {};

  return (
    <Box key={subtask.id} sx={containerStyle}>
      <Checkbox
        color="success"
        edge="end"
        onChange={() => console.log()}
        checked={subtask.completed}
      />
      <ListItem
        secondaryAction={
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button color="info" onClick={dummy}>
              {' '}
              Edit{' '}
            </Button>
            <Button color="error" onClick={dummy}>
              {' '}
              Delete{' '}
            </Button>
          </ButtonGroup>
        }
        disablePadding
      >
        <ListItemButton>
          <ListItemText
            primary={subtask.title}
            slotProps={{
              primary: {
                noWrap: true,
                sx: {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: 200,
                },
              },
            }}
          />
        </ListItemButton>
      </ListItem>
    </Box>
  );
};

export default SubtaskItem;
