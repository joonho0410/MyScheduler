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

type ChecklistProps<ListItem, Key extends keyof ListItem, P> = ListItem[Key] extends string | number
  ? {
      items: ListItem[];
      itemKey: Key;
      componentProps: P;
      ContentComponent: ComponentType<ListItem & P>;
    }
  : never;

const ListBox = <GenericListItem, Key extends keyof GenericListItem, Component extends (...args: any) => React.JSX.Element>({
  items,
  itemKey,
  ContentComponent,
  componentProps
}: ChecklistProps<GenericListItem, Key, Component>): React.JSX.Element => {
  return (
    <List dense sx={ListDefaultStyle}>
      {items.length === 0 && <Box sx={emptyBoxStyle}>😢 아무것도 등록되어 있지 않아요...</Box>}
      {items.map(item => (
        <ContentComponent key={item[itemKey] as string | number} {...item} {...componentProps ?? {}}/>
      ))}
    </List>
  );
};

export default ListBox;
