export enum AuthenticationSteps {
  Initial,
  NewUserRegister,
  ExistingUserLogin,
  SignupSuccess,
}

export enum Roles {
  User = "ROLE_USER",
  Moderator = "ROLE_MODERATOR",
  Admin = "ROLE_ADMIN",
}

export enum FetchMethods {
  GET,
  POST,
  DELETE,
  PUT,
}
