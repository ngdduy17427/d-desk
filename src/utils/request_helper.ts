import axios, { AxiosRequestConfig } from "axios";
import cookieHelper from "./cookie_helper";

export enum AxiosMethods {
  HEAD = "head",
  OPTIONS = "options",
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

type TRequestURL = string;
type TRequestBody = any | undefined;
type TRequestHeaders = AxiosRequestConfig | undefined;

const requestHelper = (
  method: AxiosMethods,
  url: TRequestURL,
  body: TRequestBody = undefined,
  headers: TRequestHeaders = undefined
) => {
  const accessToken = cookieHelper.getCookie("accessToken");
  const authorization = accessToken ? "Bearer " + accessToken : "";

  return axios[method](
    url,
    {
      ...headers,
      Authorization: authorization,
    },
    JSON.parse(body)
  );
};

export default requestHelper;
