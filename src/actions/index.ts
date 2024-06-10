"use server";

export const getMarkdown = async (url: string): Promise<string> => {
  return fetch(url, {
    method: "GET",
    cache: "no-cache",
  }).then((response): Promise<string> => response.text());
};
export const getMyPetPlayersOnline = async (): Promise<any> => {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/myPet/getPlayersOnline`, {
    method: "GET",
    cache: "no-cache",
  }).then((response): Promise<any> => response.json());
};
export const getMyPetPlayerList = async (): Promise<any> => {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/myPet/getPlayerList`, {
    method: "GET",
    cache: "no-cache",
  }).then((response): Promise<any> => response.json());
};
export const getClientIP = async (): Promise<any> => {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getClientIP`, {
    method: "GET",
    cache: "no-cache",
  }).then((response): Promise<any> => response.json());
};
