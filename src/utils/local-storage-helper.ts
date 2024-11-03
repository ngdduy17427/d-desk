const localStorageHelper = {
  get: (key: string) => localStorage.getItem(key),
  update: (key: string, data: any) => localStorage.setItem(key, JSON.stringify(data)),
  delete: (key: string) => localStorage.removeItem(key),
};

export default localStorageHelper;
