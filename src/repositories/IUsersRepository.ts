import {
  ICreateUserDTO,
  IEditByIdDTO,
  IFindUserByIdDTO,
  IFindUserByUsernameDTO,
  User,
} from "../types";

export default interface IUsersRepository {
  create(props: ICreateUserDTO): void;

  findByUsername(props: IFindUserByUsernameDTO): Promise<User | null>;

  findAll(): void;

  findById(props: IFindUserByIdDTO): Promise<User | null>;

  editById(props: IEditByIdDTO): Promise<User | null>;

  deleteById(props: IFindUserByIdDTO): void;
}
