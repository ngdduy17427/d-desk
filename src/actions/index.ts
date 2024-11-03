"use server";

export const getMarkdown = async (url: string): Promise<string> => {
  return fetch(url, {
    method: "GET",
    cache: "force-cache",
  }).then((response): Promise<string> => response.text());
};
export const getClientIP = async (): Promise<any> => {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getClientIP`, {
    method: "GET",
    cache: "force-cache",
  }).then((response): Promise<any> => response.json());
};
