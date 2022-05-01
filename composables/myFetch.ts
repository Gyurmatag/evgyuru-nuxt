import { FetchMethods as FetchMethodEnum } from "~/models/enums";
import { useUserStore } from "~/stores/user";

interface FetchInputs {
  path: string;
  method?: FetchMethodEnum;
  params?: object;
  body?: object;
  headers?: HeadersInit;
  isAuthenticated?: boolean;
}

export const useCustomFetch = <ResponseType>({
  path,
  method = FetchMethodEnum.GET,
  params,
  body,
  headers,
  isAuthenticated = false,
}: FetchInputs) => {
  const { API_BASE: baseURL } = useRuntimeConfig();
  const userStore = useUserStore();
  return useFetch<ResponseType>(path, {
    baseURL,
    method: FetchMethodEnum[method],
    params,
    body,
    headers: {
      ...headers,
      ...(isAuthenticated
        ? { "x-access-token": userStore.user.accessToken }
        : {}),
    },
  });
};
