import UsersRepository from "../repositories/UsersRepository";
import { ICreateUserDTO } from "../types";

class CreateUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, username, password }: ICreateUserDTO) {
    if (/\s/g.test(username)) throw new Error("Invalid format");

    const isUnic = await this.usersRepository.findByUsername({ username });
    if (!!isUnic) throw new Error("This username already exist");

    this.usersRepository.create({
      name,
      username,
      password,
    });
  }
}

export default CreateUser;
