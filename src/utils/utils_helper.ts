/**
 * Return an UUID v4
 */
export function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c: any) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}

/**
 * Return a `Promise` that is resolved once the system clipboard has been updated
 */
export function copyToClipboard(text: string) {
  return navigator.clipboard.writeText(text);
}

/**
 * Returns `true` if the given `object` is `undefined`. Otherwise,
 * returns `false`.
 */
export function isUndefined(object: unknown) {
  return typeof object === "undefined";
}

/**
 * Returns `true` if the given `object` is `null`. Otherwise,
 * returns `false`.
 */
export function isNull(object: unknown) {
  return object === null;
}

/**
 * Returns `true` if the given `str` has `upperCase`. Otherwise,
 * returns `false`.
 */
export function hasUpperCase(str: string) {
  return str !== str.toLowerCase();
}

/**
 * Returns `true` if the given `str` has `SpecialChar`. Otherwise,
 * returns `false`.
 */
export function hasSpecialChar(str: string) {
  return new RegExp(/[ `!@#$%^&*()+\-=\\[\]{};':"\\|,.<>\\/?~]/).test(str);
}

/**
 * Returns `true` if the given `str` is an `email`. Otherwise,
 * returns `false`.
 */
export function regexEmail(str: string) {
  return new RegExp(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(str);
}

/**
 * Returns number with the given `value`, `min`, `max`.
 */
export function clamp(value: number, min: number, max: number) {
  return value >= min ? (value <= max ? value : max) : min;
}

/**
 * Return `currency` with the given number
 */
export function formatCurrency(
  number: number | bigint,
  locales = "vi-VN",
  options: Intl.NumberFormatOptions = { style: "currency", currency: "VND" }
) {
  return new Intl.NumberFormat(locales, options).format(number);
}

/**
 * Return `URL search params` with the given `object`
 */
export function convertURLSearchParams(
  values: string | string[][] | Record<string, string> | URLSearchParams | undefined
) {
  return new URLSearchParams(values).toString();
}

/**
 * Return given `object` replaced `empty field` with `undefined`
 */
export function reObjByUndefined(obj: any) {
  if (!obj) return;

  Object.keys(obj).forEach(function (key) {
    if (obj[key] === "") {
      obj[key] = undefined;
    }
  });

  return obj;
}
