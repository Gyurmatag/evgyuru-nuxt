import { hash } from "ohash";
import { FetchError } from "ohmyfetch";
import { FetchMethods as FetchMethodEnum } from "~/models/enums";
import { useUserStore } from "~/stores/user";
import { useResponseStore } from "~/stores/response";

interface FetchInputs {
  path: string;
  method?: FetchMethodEnum;
  params?: object;
  body?: object;
  headers?: HeadersInit;
  isAuthenticated?: boolean;
  initialCache?: boolean;
  server?: boolean;
  lazy?: boolean;
}

// TODO: requestType hozzáadása
export const useCustomFetch = <ResponseType>({
  path,
  method = FetchMethodEnum.GET,
  params,
  body,
  headers,
  isAuthenticated = false,
  initialCache = true,
  server = true,
  lazy = false,
}: FetchInputs) => {
  const { API_BASE: baseURL } = useRuntimeConfig();
  const userStore = useUserStore();
  const responseStore = useResponseStore();
  return useFetch<ResponseType, FetchError>(path, {
    baseURL,
    key: hash(["api-fetch", path, body]),
    method: FetchMethodEnum[method],
    params,
    body,
    headers: {
      ...headers,
      ...(isAuthenticated
        ? { "x-access-token": userStore.user.accessToken }
        : {}),
    },
    initialCache,
    server,
    lazy,
    async onResponseError({ response }) {
      // TODO: itt finomítani: hibakód, refresh token küldése és token frissítés, miért kell kérdőjeles conditional check response-ra?
      // TODO: ezt a jwt ecpired üzenetet nyelvesítési kullcsal el kell látni backenden
      if (response?._data.message === "jwt expired") {
        await navigateTo({
          path: "/",
        });
        userStore.$reset();
      }
    },
    async onResponse({ response }) {
      await responseStore.setResponse({
        isOk: response.ok,
        code: response.status,
        message: response._data.message,
      });
    },
  });
};
