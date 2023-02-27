import { IUsersRepository } from "../repositories";

export class LogoutUser {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findOne({
      key: "_id",
      query: userId,
    });

    if (!user) throw new Error("Error");
    console.log(userId);
    //!todo: fazer sistema de blacklist para o token
  }
}
