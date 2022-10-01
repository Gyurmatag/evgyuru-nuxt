import { defineStore } from "pinia";
import { User } from "~/models/user";
import { Reservation } from "~/models/reservation";
import { Roles } from "~/models/enums";

interface UserState {
  user: User;
}

export const useUserStore = defineStore("userStore", {
  state: (): UserState => ({
    user: {
      _id: null,
      email: null,
      fullName: null,
      telephoneNumber: null,
      zipCode: null,
      city: null,
      streetAddress: null,
      accessToken: null,
      accessTokenExpireTimeInMs: null,
      accessTokenExpireDate: null,
      roles: [],
      reservations: [],
      isActivated: false,
      areCookiesAccepted: false,
    },
  }),
  getters: {
    monogram: (state: UserState): string => {
      if (state.user.fullName) {
        return state.user.fullName
          .split(" ")
          .reduce((acc, subName) => acc + subName[0], "");
      }
    },
    currentCourseReservedByUser: (
      state: UserState
    ): ((reservations: [Reservation]) => Reservation) => {
      return (reservations: [Reservation]) =>
        reservations.find(
          (reservation) => reservation?.user === state.user._id
        );
    },
    isSimpleUser: (state: UserState): boolean => {
      return state.user.roles.toString() === [Roles.User].toString();
    },
    hasModeratorRole: (state: UserState): boolean => {
      return state.user.roles.includes(Roles.Moderator);
    },
  },
  actions: {
    storeUserData(userData: User) {
      this.user = userData;
    },
    activateUser() {
      this.user.isActivated = true;
    },
  },

  persist: true,
});
