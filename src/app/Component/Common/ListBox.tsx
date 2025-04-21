// components/Common/Checklist.tsx
import { CheckPropsIsStringOrNumber } from '@/Types/Utils';
import { List } from '@mui/material';
import { ComponentType, ReactNode } from 'react';

const ListDefaultStyle = {
  width: '100%',
  maxHeight: '200px',
  bgcolor: 'background.paper',
  overflowY: 'auto',
};

type ChecklistProps<
  ListItem,
  Key extends keyof ListItem
> = ListItem[Key] extends string | number
  ? {
      items: ListItem[];
      itemKey: Key;
      ContentComponent: ComponentType<ListItem>;
    }
  : never;


const ListBox = <
  GenericListItem,
  Key extends keyof GenericListItem
>({
  items,
  itemKey,
  ContentComponent,
}: ChecklistProps<GenericListItem, Key>): React.JSX.Element => {
  return (
    <List dense sx={ListDefaultStyle}>
      {items.length === 0 && '😢 아무것도 등록되어 있지 않아요...'}
      {items.map(item => (
        <ContentComponent key={ item[itemKey] as string | number } {...item}/>
      ))}
    </List>
  );
};

export default ListBox
