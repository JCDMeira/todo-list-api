import UserModel from "../models/UserModel";

interface ICreateUserDTO {
  name: string;
  username: string;
  password: string;
}

interface IfindUserByUsernameDTO {
  username: string;
}
interface IfindUserByIdDTO {
  id: string;
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

  async findByName({ username }: IfindUserByUsernameDTO) {
    const user = await UserModel.find({ username });
    return user;
  }

  async findAll() {
    const users = await UserModel.find({}, { username: 1, name: 1 });
    return users;
  }

  async findById({ id }: IfindUserByIdDTO) {
    const user = await UserModel.find({ _id: id }, { username: 1, name: 1 });
    return user;
  }
}

export default UsersRepository;
