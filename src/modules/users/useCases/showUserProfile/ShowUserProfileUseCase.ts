import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ShowUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const verifyUserExists = this.usersRepository.findById(user_id);

    if (!verifyUserExists) {
      throw new Error("User not found");
    }

    return verifyUserExists;
  }
}

export { ShowUserProfileUseCase };
