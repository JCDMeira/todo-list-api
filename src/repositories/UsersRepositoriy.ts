import UserModel from "../models/UserModel";

interface ICreateUserDTO {
  name: string;
  username: string;
  password: string;
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
}

export default UsersRepository;
