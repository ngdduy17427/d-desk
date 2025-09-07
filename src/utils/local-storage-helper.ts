export const localStorageHelper = {
  get: (key: string) => localStorage.getItem(key),
  set: (key: string, data: any) => localStorage.setItem(key, JSON.stringify(data)),
  delete: (key: string) => localStorage.removeItem(key),
  deleteAll: () => localStorage.clear(),
}
