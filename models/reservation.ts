import { BaseList } from "~/models/baseList";
import { BaseUser } from "~/models/user";
import { Course } from "~/models/course";

interface Child {
  name: string;
}

export interface Reservation {
  _id: string;
  user: BaseUser;
  children: [Child];
  course: Course;
}

export interface ReservationList extends BaseList {
  reservations: [Reservation];
}

export interface ApplyCourse {
  courseId: string;
  children: [Child];
  userEmail?: string;
}
