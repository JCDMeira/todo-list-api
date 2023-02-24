import UserModel from "../models/UserModel";

interface ICreateUserDTO {
  name: string;
  username: string;
  password: string;
}

interface IFindUserByUsernameDTO {
  username: string;
}
interface IFindUserByIdDTO {
  id: string;
}
interface IEditByIdDTO {
  id: string;
  name?: string;
  username?: string;
  password?: string;
}

class UsersRepository {
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
    const user = UserModel.findOne({ username }, { __v: 0 }).select(
      "+password"
    );
    return user;
  }

  async findAll() {
    const users = await UserModel.find({}, { username: 1, name: 1 });
    return users;
  }

  async findById({ id }: IFindUserByIdDTO) {
    const user = await UserModel.find({ _id: id }, { username: 1, name: 1 });
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
