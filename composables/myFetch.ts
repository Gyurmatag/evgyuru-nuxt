import { hash } from "ohash";
import { FetchMethods as FetchMethodEnum } from "~/models/enums";
import { useUserStore } from "~/stores/user";

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
  return useFetch<ResponseType>(path, {
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
    async onResponseError({ request, options, response }) {
      // TODO: itt finomítani: hibakód, refresh token küldése és token frissítés, miért kell kérdőjeles conditional check response-ra?
      if (response?._data.message === "jwt expired") {
        await navigateTo({
          path: "/",
        });
        userStore.$reset();
      }
    },
  });
};
