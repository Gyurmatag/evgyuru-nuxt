import { BaseList } from "~/models/baseList";
import { BaseUser } from "~/models/user";
import { Course } from "~/models/course";

export interface Reservation {
  _id: string;
  user: BaseUser;
  children: [Child];
  course: Course;
  activationKey: string;
  isActivated: boolean;
}

export interface ReservationList extends BaseList {
  reservations: [Reservation];
}

export interface ApplyCourse {
  courseId: string;
  children: [Child];
  userEmail?: string;
  isNotRegisteredOnlyForCourseApply?: boolean;
}
