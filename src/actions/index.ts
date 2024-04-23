"use server";

export const getMarkdown = async (markdown: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getMarkdown?markdown=${markdown}`, {
    method: "GET",
  }).then((response) => response.json());
};
export const getClientIP = async () => {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getClientIP`, {
    method: "GET",
  }).then((response) => response.json());
};
