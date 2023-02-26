import UserModel from "../models/UserModel";
import {
  ICreateUserDTO,
  IEditByIdDTO,
  IFindUserByIdDTO,
  IFindUserByUsernameDTO,
} from "../types";
import IUsersRepository from "./IUsersRepository";

class UsersRepository implements IUsersRepository {
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

  async findByUsername({ username }: IFindUserByUsernameDTO) {
    const user = await UserModel.findOne({ username }, { __v: 0 }).select(
      "+password"
    );
    return user;
  }

  async findAll() {
    const users = await UserModel.find({}, { username: 1, name: 1 });
    return users;
  }

  async findById({ id }: IFindUserByIdDTO) {
    const user = await UserModel.findOne({ _id: id }, { username: 1, name: 1 });
    return user;
  }

  async editById({ id, ...rest }: IEditByIdDTO) {
    const user = await UserModel.findByIdAndUpdate(id, {
      ...rest,
      updated_at: new Date().getTime(),
    });

    return user;
  }

  async deleteById({ id }: IFindUserByIdDTO) {
    await UserModel.findByIdAndDelete(id);
  }
}

export default UsersRepository;
