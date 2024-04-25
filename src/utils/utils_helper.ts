export function uuidv4(): string {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c: any): string =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}

export function copyToClipboard(text: string) {
  return navigator.clipboard.writeText(text);
}

export function isUndefined(object: unknown): boolean {
  return typeof object === "undefined";
}

export function isNull(object: unknown): boolean {
  return object === null;
}

export function hasUpperCase(str: string): boolean {
  return str !== str.toLowerCase();
}

export function hasSpecialChar(str: string): boolean {
  return new RegExp(/[ `!@#$%^&*()+\-=\\[\]{};':"\\|,.<>\\/?~]/).test(str);
}

export function regexEmail(str: string): boolean {
  return new RegExp(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(str);
}

export function clamp(value: number, min: number, max: number): number {
  return value >= min ? (value <= max ? value : max) : min;
}

export function formatCurrency(
  number: number | bigint,
  locales = "vi-VN",
  options: Intl.NumberFormatOptions = { style: "currency", currency: "VND" }
) {
  return new Intl.NumberFormat(locales, options).format(number);
}

export function convertURLSearchParams(
  values: string | string[][] | Record<string, string> | URLSearchParams | undefined
) {
  return new URLSearchParams(values).toString();
}

export function addClassToElement(elementId: string, ...classNames: string[]) {
  document.getElementById(elementId)?.classList.add(...classNames);
}

export function removeClassFromElement(elementId: string, ...classNames: string[]) {
  document.getElementById(elementId)?.classList.remove(...classNames);
}

export function deepCopy<T>(object: T): T {
  if (typeof object !== "object" || object === null) return object as T;

  if (object instanceof Date) return new Date(object.getTime()) as T;

  if (object instanceof Array)
    return object.reduce((arr, item, i): Array<T> => {
      arr[i] = deepCopy(item);
      return arr;
    }, []) as T;

  if (object instanceof Object)
    return Object.keys(object).reduce((newObj, key): object => {
      newObj[key] = deepCopy(object[key]);
      return newObj;
    }, {}) as T;
}
