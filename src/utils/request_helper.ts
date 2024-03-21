import axios from "axios";
import Cookies from "./cookie_helper";

export enum AxiosMethods {
  HEAD = "head",
  OPTIONS = "options",
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

const request = async ({
  method,
  url,
  body = null,
  headers = null,
}: {
  method: AxiosMethods;
  url: string;
  body?: any;
  headers?: any;
}) => {
  const accessToken = Cookies.getCookie("accessToken");
  const authorization = accessToken ? "Bearer " + accessToken : "";

  return axios[method](
    url,
    {
      Accept: "application/json",
      Authorization: authorization,
      ...headers,
    },
    JSON.parse(body)
  )
    .then(async (response: any) => {
      const result = await response?.json();

      if (!response.ok) throw new Error(result.error.message);

      return result.success;
    })
    .catch(() => {
      throw new Error("Please contact with the owner!");
    });
};

export default request;
