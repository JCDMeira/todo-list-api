export interface ICreateUserDTO {
  name: string;
  username: string;
  password: string;
}

export interface IDeleteUserByIdDTO {
  id: string;
}

export interface IFindUserDTO {
  key: "_id" | "username";
  query: string;
}
export interface IEditByIdDTO {
  id: string;
  name?: string;
  username?: string;
  password?: string;
}
export interface ILoginDTO {
  username: string;
  password: string;
}
