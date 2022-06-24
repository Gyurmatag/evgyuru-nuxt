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

interface Child {
  name: string;
}

export interface ApplyCourse {
  courseId: string;
  children: [Child];
  userEmail?: string;
}
