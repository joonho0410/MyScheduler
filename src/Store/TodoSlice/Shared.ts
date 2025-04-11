import { StateCreator } from "zustand";
import { TodoType } from "@/Types/Todo";
import { TodoStoreType } from "../TodoStore";


type State = {
    
}

type Action = {
    
}

export type SharedSliceType = State & Action

const SharedSlice: StateCreator<
    TodoStoreType,
    [],
    [],
    SharedSliceType
> = (set) => ({
       
})

export default SharedSlice