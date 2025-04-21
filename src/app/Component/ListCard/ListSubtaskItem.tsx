// components/SubtaskItem.tsx
import React from 'react';
import { Checkbox, ButtonGroup, Button, ListItem, ListItemButton, ListItemText } from '@mui/material';

type SubtaskItemProps = { id: string; title: string; completed: boolean };

const SubtaskItem = (subtask: SubtaskItemProps): React.JSX.Element => {
    const dummy = () => {}

  return (
    <div key={subtask.id} style={{ display: 'flex' }}>
      <Checkbox
        color="success"
        edge="end"
        onChange={() => console.log()}
        checked={subtask.completed}
      />
      <ListItem
        secondaryAction={
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button color="info" onClick={dummy}> Edit </Button>
            <Button color="error" onClick={dummy}> Delete </Button>
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
    </div>
  );
};

export default SubtaskItem;
