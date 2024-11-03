const cookieHelper = {
  getCookie: (name: string) => {
    const value = `; ${document.cookie}`;
    const parts: any = value.split(`; ${name}=`);

    if (parts.length === 2) return parts.pop().split(";").shift();
  },
  setCookie: (name: string, value: string, expiresDate = new Date(), path = "/") => {
    document.cookie = name + "=" + value + "; expires=" + expiresDate + "; path=" + path;
  },
  removeCookie: (name: string) => {
    document.cookie = name + "=; Max-Age=-99999999;";
  },
  clearAllCookies: () => {
    document.cookie
      .split(";")
      .forEach(
        (cookie) =>
          (document.cookie = cookie
            .replace(/^ +/, "")
            .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`))
      );
  },
};

export default cookieHelper;
