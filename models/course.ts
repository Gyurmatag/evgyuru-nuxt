import { BaseList } from "~/models/baseList";

export interface BaseCourse {
  title: string;
  description: string;
  price: number;
  occasions: number;
  dateFrom: Date | string;
  dateTo: Date | string;
  imageUrl: string;
}

export interface Course extends BaseCourse {
  _id: string;
}

export interface CourseList extends BaseList {
  courses: [Course];
}
