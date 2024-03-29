export function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c: any) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}

export function copyToClipboard(text: string) {
  return navigator.clipboard.writeText(text);
}

export function isUndefined(object: unknown) {
  return typeof object === "undefined";
}

export function isNull(object: unknown) {
  return object === null;
}

export function hasUpperCase(str: string) {
  return str !== str.toLowerCase();
}

export function hasSpecialChar(str: string) {
  return new RegExp(/[ `!@#$%^&*()+\-=\\[\]{};':"\\|,.<>\\/?~]/).test(str);
}

export function regexEmail(str: string) {
  return new RegExp(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(str);
}

export function clamp(value: number, min: number, max: number) {
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

export function reObjByUndefined(obj: any) {
  if (!obj) return;

  Object.keys(obj).forEach(function (key) {
    if (obj[key] === "") {
      obj[key] = undefined;
    }
  });

  return obj;
}

export function addClassToElement(elementId: string, ...classNames: string[]) {
  document.getElementById(elementId)?.classList.add(...classNames);
}

export function removeClassFromElement(elementId: string, ...classNames: string[]) {
  document.getElementById(elementId)?.classList.remove(...classNames);
}
