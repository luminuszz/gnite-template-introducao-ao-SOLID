import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    const createdUser = Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(createdUser);

    return createdUser;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  turnAdmin(receivedUser: User): User {
    const editedUser: User = {
      ...receivedUser,
      updated_at: new Date(),
      admin: true,
    };

    this.users = this.users.map((user) =>
      editedUser.id === user.id ? editedUser : user
    );

    return editedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
