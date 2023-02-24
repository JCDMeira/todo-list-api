import {
  ICreateUserDTO,
  IEditByIdDTO,
  IFindUserByIdDTO,
  IFindUserByUsernameDTO,
} from "../types";

export default interface IUsersRepository {
  create(props: ICreateUserDTO): void;

  findByUsername(props: IFindUserByUsernameDTO): any;

  findAll(): void;

  findById(props: IFindUserByIdDTO): any;

  editById(props: IEditByIdDTO): any;

  deleteById(props: IFindUserByIdDTO): void;
}
