export type CombineTypes<T extends any[]> = T extends [infer T, ...infer Rest]
  ? T & CombineTypes<Rest>
  : {};

export type CheckPropsIsStringOrNumber<T> = T extends string | number
  ? {}
  : {Props_Must_Be_String_Or_Number : never}