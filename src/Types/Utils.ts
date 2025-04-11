export type CombineTypes<T extends any []> = T extends [infer T, ...infer Rest]
    ? T & CombineTypes<Rest>
    : {}