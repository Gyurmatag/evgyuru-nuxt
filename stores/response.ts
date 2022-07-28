import { defineStore } from "pinia";
import { ApiResponse } from "~/models/apiResponse";

interface ErrorState {
  response: ApiResponse;
}

export const useResponseStore = defineStore("responseStore", {
  state: (): ErrorState => ({
    response: null,
  }),
  actions: {
    setResponse(response: ApiResponse) {
      this.response = response;
    },
  },

  persist: false,
});
