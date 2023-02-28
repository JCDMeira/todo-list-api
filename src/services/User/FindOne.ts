import { IUsersRepository } from "@/repositories";

export class FindOne {
  constructor(private usersRepository: IUsersRepository) {}
  async execute(id: string) {
    const user = await this.usersRepository.findOne({
      key: "_id",
      query: id,
    });

    if (!user) throw new Error("User not found");

    return {
      id: user._id,
      name: user.name,
      username: user.username,
      password: undefined,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
