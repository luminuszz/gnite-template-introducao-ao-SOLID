import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const foundedUser = this.usersRepository.findByEmail(email);

    if (foundedUser) {
      throw new Error("User already exists");
    }

    return this.usersRepository.create({ email, name });
  }
}

export { CreateUserUseCase };
