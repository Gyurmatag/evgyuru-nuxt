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
    ): ((courseId: string) => Reservation) => {
      return (courseId) =>
        state.user?.reservations.find(
          (reservation) => reservation?.course._id === courseId
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
    activateUser() {
      this.user.isActivated = true;
    },
    addNewReservation(reservation: Reservation) {
      this.user.reservations.push(reservation);
    },
    setReservations(reservations: [Reservation]) {
      this.user.reservations = reservations;
    },
    deleteReservation(reservationId: string) {
      this.user.reservations = this.user.reservations.filter(
        (reservation) => reservation._id !== reservationId
      );
    },
    setReservationToActivated(activationKey: string) {
      this.user.reservations = this.user.reservations.map((reservation) =>
        reservation.activationKey === activationKey
          ? { ...reservation, isActivated: true, activationKey: "" }
          : reservation
      );
    },
  },

  persist: true,
});
