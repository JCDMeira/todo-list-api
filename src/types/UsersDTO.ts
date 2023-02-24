export interface ICreateUserDTO {
  name: string;
  username: string;
  password: string;
}

export interface IFindUserByUsernameDTO {
  username: string;
}
export interface IFindUserByIdDTO {
  id: string;
}
export interface IEditByIdDTO {
  id: string;
  name?: string;
  username?: string;
  password?: string;
}
