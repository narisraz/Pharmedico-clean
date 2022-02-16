export type Builder<T> = {
  [k in keyof T]: (arg: T[k]) => Builder<T>
} & { build(): T }