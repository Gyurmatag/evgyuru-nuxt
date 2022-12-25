import { AggregatedList, BaseList } from "~/models/baseList";
import { BaseUser } from "~/models/user";
import { Course } from "~/models/course";

export interface Reservation {
  _id: string;
  user: BaseUser | string;
  children: [Child | string];
  course: Course | string;
  activationKey?: string;
  isActivated?: boolean;
}

export interface ReservationListBasicResponse extends BaseList {
  reservations: [Reservation];
}

export interface ReservationListResponse extends BaseList {
  reservations: [AggregatedList<Reservation>];
}

export interface SimpleCourseListResult {
  _id: string;
  title: string;
  dateFrom: Date | string;
  dateTo: Date | string;
  imageUrl: string;
  project: string;
}

export interface SimpleCourseListResultList {
  simplkeCourseListResult: [SimpleCourseListResult];
}

export interface SimpleReservationListResponse {
  courses: SimpleCourseListResultList;
}

export interface ReservationFilter {
  filterDateFromAfterToday: boolean;
}

export interface ApplyCourse {
  courseId: string;
  children: [Child];
  userEmail?: string;
  isNotRegisteredOnlyForCourseApply?: boolean;
}

export type EditReservation = {
  reservationId: string;
  childrenIdList: [string];
  targetCourseId: string;
};
