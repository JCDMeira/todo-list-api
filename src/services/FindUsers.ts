import { IUsersRepository } from "../repositories";

export class FindUsers {
  constructor(private usersRepository: IUsersRepository) {}
  async execute() {
    return await this.usersRepository.findAll();
  }
}
