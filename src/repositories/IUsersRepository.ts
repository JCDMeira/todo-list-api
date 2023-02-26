import { ICreateUserDTO, IEditByIdDTO, IFindUserDTO, User } from "../types";

export interface IUsersRepository {
  create(props: ICreateUserDTO): void;

  findAll(): Promise<User[] | null>;

  findOne(props: IFindUserDTO): Promise<User | null>;

  editById(props: IEditByIdDTO): Promise<User | null>;

  deleteById(props: any): void;
}
