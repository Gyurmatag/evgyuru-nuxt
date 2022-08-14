import { AggregatedList, BaseList } from "~/models/baseList";
import { BaseUser } from "~/models/user";
import { Course } from "~/models/course";

export interface Reservation {
  _id: string;
  user: BaseUser | string;
  children: [Child];
  course: Course;
  activationKey: string;
  isActivated: boolean;
}

export interface ReservationListBasicResponse extends BaseList {
  reservations: [Reservation];
}

export interface ReservationListResponse extends BaseList {
  reservations: [AggregatedList<Reservation>];
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
