import { BaseList } from "~/models/baseList";
import { BaseUser } from "~/models/user";
import { Course } from "~/models/course";

export interface Reservation {
  _id: string;
  user: BaseUser;
  childName: string;
  course: Course;
}

export interface ReservationList extends BaseList {
  reservations: [Reservation];
}

export interface ApplyCourse {
  courseId: string;
  childName: string;
  userEmail?: string;
}
