import { hash } from "ohash";
import { FetchError } from "ohmyfetch";
import { FetchMethods as FetchMethodEnum } from "~/models/enums";
import { useUserStore } from "~/stores/user";
import { useResponseStore } from "~/stores/response";

// TODO: további type-ok megadása
interface FetchInputs {
  customBaseURL?: string;
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
  customBaseURL = null,
  path,
  method = FetchMethodEnum.GET,
  params,
  body,
  headers,
  isAuthenticated = false,
  server = true,
  lazy = false,
}: FetchInputs) => {
  const config = useRuntimeConfig();
  const userStore = useUserStore();
  const responseStore = useResponseStore();
  return useFetch<ResponseType, FetchError>(path, {
    baseURL: customBaseURL || config.public.apiBase,
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
