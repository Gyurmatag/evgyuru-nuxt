import { BaseList } from "~/models/baseList";
import { Reservation } from "~/models/reservation";

export interface BaseCourse {
  title: string;
  description: string;
  price: number;
  occasions: number;
  zipCode: string;
  city: string;
  streetAddress: string;
  dateFrom: Date | string;
  dateTo: Date | string;
  imageUrl: string;
  maxGroupSize: number;
  reservations: [Reservation];
}

export interface CourseFilter {
  filterDateFromAfterToday: boolean;
}

export interface Course extends BaseCourse {
  _id: string;
}

export interface CourseList extends BaseList {
  courses: [Course];
}

export interface CourseForm extends BaseCourse {
  timeFrom: string;
  timeTo: string;
}
