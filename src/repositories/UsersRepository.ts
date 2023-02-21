import UserModel from "../models/UserModel";

interface ICreateUserDTO {
  name: string;
  username: string;
  password: string;
}

interface IfindUserByUsernameDTO {
  username: string;
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
}

export default UsersRepository;
