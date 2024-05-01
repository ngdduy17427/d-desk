export function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c: string): string =>
    (Number(c) ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))).toString(
      16
    )
  );
}

export function copyToClipboard(text: string): Promise<void> {
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
): string {
  return new Intl.NumberFormat(locales, options).format(number);
}

export function convertURLSearchParams(
  values: string | string[][] | Record<string, string> | URLSearchParams | undefined
): string {
  return new URLSearchParams(values).toString();
}

export function addClassToElement(elementId: string, ...classNames: string[]): void {
  document.getElementById(elementId)?.classList.add(...classNames);
}

export function removeClassFromElement(elementId: string, ...classNames: string[]): void {
  document.getElementById(elementId)?.classList.remove(...classNames);
}

export function deepCopy<T>(object: T): T {
  if (typeof object !== "object" || object === null) return object;

  if (object instanceof Date) return <T>new Date(object.getTime());

  if (object instanceof Array) return <T>object.reduce((arr, item, i): Array<T> => {
      arr[i] = deepCopy(item);
      return arr;
    }, []);

  if (object instanceof Object) return <T>Object.keys(object).reduce((newObj, key): object => {
      newObj[key] = deepCopy(object[key]);
      return newObj;
    }, {});
}

export function repeat<T>(count: number, ...values: T[]): T[] {
  const result: T[] = [];

  for (let i = 0; i < count; i++) result.push(...values);

  return result;
}

export function randomNumber(minimum: number, maximum: number): number {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}
