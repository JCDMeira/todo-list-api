import UserModel from "../models/UserModel";
import {
  ICreateUserDTO,
  IEditByIdDTO,
  IDeleteUserByIdDTO,
  IFindUserDTO,
} from "../types";
import { IUsersRepository } from "./";

export class UsersRepository implements IUsersRepository {
  async create({ name, username, password }: ICreateUserDTO) {
    const date = new Date().getTime();

    await UserModel.create({
      name,
      username,
      password,
      created_at: date,
      updated_at: date,
    });
  }

  async findAll() {
    const users = await UserModel.find({}, { username: 1, name: 1 });
    return users;
  }

  async findOne({ key, query }: IFindUserDTO) {
    const user = await UserModel.findOne({ [key]: query }, { __v: 0 }).select(
      "+password"
    );
    return user;
  }

  async editById({ id, ...rest }: IEditByIdDTO) {
    const user = await UserModel.findByIdAndUpdate(id, {
      ...rest,
      updated_at: new Date().getTime(),
    });

    return user;
  }

  async deleteById({ id }: IDeleteUserByIdDTO) {
    await UserModel.findByIdAndDelete(id);
  }
}
