"use server";

export const getMarkdown = async (url: string) => {
  return fetch(url, {
    method: "GET",
  }).then((response) => response.text());
};
export const getClientIP = async () => {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getClientIP`, {
    method: "GET",
  }).then((response) => response.json());
};
