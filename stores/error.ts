import { defineStore } from "pinia";
import { ApiError } from "~/models/apiError";

interface ErrorState {
  error: ApiError;
}

export const useErrorStore = defineStore("errorStore", {
  state: (): ErrorState => ({
    error: null,
  }),
  actions: {
    setError(error: ApiError) {
      this.error = error;
    },
  },

  persist: false,
});
