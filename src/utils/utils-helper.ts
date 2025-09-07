export const uniqueId = (): string => {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c: string): string =>
    (Number(c) ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))).toString(
      16,
    ),
  )
}

export const isUndefined = (object: unknown): boolean => {
  return typeof object === 'undefined'
}

export const clamp = (value: number, min: number, max: number): number => {
  return value >= min ? (value <= max ? value : max) : min
}

export const repeat = <T>(count: number, ...values: Array<T>): Array<T> => {
  const result: Array<T> = []

  for (let i = 0; i < count; i++) result.push(...values)

  return result
}

export const deepCopy = <T>(object: T): T | undefined => {
  if (typeof object !== 'object' || object === null) return object

  if (object instanceof Date) return <T>new Date(object.getTime())

  if (object instanceof Array) return <T>object.reduce((arr, item, i): Array<T> => {
      arr[i] = deepCopy(item)
      return arr
    }, [])

  if (object instanceof Object) return <T>Object.keys(object).reduce((newObj, key): object => {
      ;(<any>newObj)[key] = deepCopy((<any>object)[key as any])
      return newObj
    }, {})
}
