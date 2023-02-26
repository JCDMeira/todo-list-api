import { IUsersRepository } from "../repositories";
import { IEditByIdDTO } from "../types";
import encryptPassword from "../utils/encryptPassword";

export class EditOne {
  constructor(private usersRepository: IUsersRepository) {}
  async execute(props: IEditByIdDTO) {
    const { username, password } = props;
    if (username !== undefined) {
      if (/\s/g.test(username)) throw new Error("Invalid Format");

      const isUnic = await this.usersRepository.findOne({
        key: "username",
        query: username,
      });

      if (!!isUnic) throw new Error("This username already exist");
    }

    if (password !== undefined) {
      props.password = await encryptPassword(password);
    }

    const user = await this.usersRepository.editById({ ...props });

    if (!user) throw new Error("User not found");
  }
}
