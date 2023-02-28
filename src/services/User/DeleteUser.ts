import { IUsersRepository } from "../../repositories";

export class DeleteUser {
  constructor(private usersRepository: IUsersRepository) {}
  async execute(id: string, userId: string) {
    await this.usersRepository.deleteById({ id });
    console.log(
      "adicionar blacklist de tokens se o id deletado for o mesmo que o id:",
      userId
    );
  }
}
