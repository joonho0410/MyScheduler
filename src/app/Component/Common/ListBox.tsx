// components/Common/Checklist.tsx
import { CheckPropsIsStringOrNumber } from '@/Types/Utils';
import { Box, List } from '@mui/material';
import { ComponentType, ReactNode } from 'react';

const ListDefaultStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  width: '100%',
  flexGrow: 1,
  bgcolor: 'background.paper',
  overflowY: 'auto',
  backgroundColor: 'transparent',
  maxHeight: '30vh',
};

const emptyBoxStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

type ChecklistProps = { contents: ReactNode };

const ListBox = ({ contents }: ChecklistProps): React.JSX.Element => {
  return (
    <List dense sx={ListDefaultStyle}>
      {contents}
      {/* {items.length === 0 && <Box sx={emptyBoxStyle}>😢 아무것도 등록되어 있지 않아요...</Box>}
      {items.map(item => (
        <ContentComponent key={item[itemKey] as string | number} {...item} {...componentProps ?? {}}/>
      ))} */}
    </List>
  );
};

export default ListBox;
