import { BaseList } from "~/models/baseList";

export interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  occasions: number;
  dateFrom: string;
  dateTo: string;
  imageUrl: string;
}

export interface CourseList extends BaseList {
  courses: [Course];
}

// TODO: base kurzus létrehozása
export interface NewCourse {
  title: string;
  description: string;
  price: number;
  occasions: number;
  dateFrom: Date;
  dateTo: Date;
  imageUrl: string;
}
