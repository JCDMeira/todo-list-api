import IUsersRepository from "../repositories/IUsersRepository";
import { ICreateUserDTO } from "../types";

class CreateUser {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, username, password }: ICreateUserDTO) {
    if (/\s/g.test(username)) throw new Error("Invalid format");

    const alreadyExist = await this.usersRepository.findOne({
      key: "username",
      query: username,
    });
    if (!!alreadyExist) throw new Error("This username already exist");

    this.usersRepository.create({
      name,
      username,
      password,
    });
  }
}

export default CreateUser;
