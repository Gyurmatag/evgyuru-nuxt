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
      address: null,
      accessToken: null,
      roles: [],
      reservations: [],
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
    currentCourseReservedByUser: (state: UserState) => {
      return (courseId) =>
        state.user.reservations.find(
          (reservation) => reservation.course._id === courseId
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
  },

  persist: true,
});
