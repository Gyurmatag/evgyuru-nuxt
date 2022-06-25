import { Roles } from "~/models/enums";
import { Reservation } from "~/models/reservation";

export interface BaseUser {
  _id: string;
  email: string;
  fullName: string;
  telephoneNumber: string;
  address: string;
}

export interface User extends BaseUser {
  accessToken: string;
  roles: Roles[];
  reservations: Reservation[];
}

export interface SignUpUser {
  email: string;
  fullName: string;
  telephoneNumber: string;
  zipCode: string;
  city: string;
  streetAddress: string;
  password: string;
  passwordConfirmation: string;
  acceptNewsletter: boolean;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface IsEmailAlreadyRegistered {
  isEmailAlreadyRegistered: boolean;
}
