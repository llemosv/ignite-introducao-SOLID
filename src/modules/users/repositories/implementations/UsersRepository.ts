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

    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const listById = this.users.find((user) => user.id === id);

    return listById;
  }

  findByEmail(email: string): User | undefined {
    const listByEmail = this.users.find((users) => users.email === email);
    return listByEmail;
  }

  turnAdmin(receivedUser: User): User {
    const user = receivedUser;

    // const user = {
    //   ...receivedUser,
    //   admin: !receivedUser.admin,
    //   updated_at: new Date(),
    // };

    Object.assign(user, {
      admin: true,
      updated_at: new Date(),
    });

    return user;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
