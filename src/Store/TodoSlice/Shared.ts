import { TodoStoreType } from '../TodoStore';
import { TodoType } from '@/Types/Todo';
import { StateCreator } from 'zustand';

type State = {};

type Action = {};

export type SharedSliceType = State & Action;

const SharedSlice: StateCreator<TodoStoreType, [], [], SharedSliceType> = set => ({});

export default SharedSlice;
