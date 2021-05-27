import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const currentUser = this.usersRepository.findById(user_id);

    if (!currentUser.admin || !currentUser) {
      throw new Error("This user not has permission");
    }

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
