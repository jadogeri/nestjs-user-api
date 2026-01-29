// src/user/user.factory.ts
import { setSeederFactory } from 'typeorm-extension';
import { User } from './entities/user.entity';

export const UserFactory = setSeederFactory(User, (faker) => {
  const user = new User();
  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  // 2. Derive email (e.g., John.Doe@example.com)
  user.email = faker.internet.email({
    firstName: user.firstName,
    lastName: user.lastName,
  });
  user.age = faker.number.int({ min: 18, max: 80 });
  // SSN is handled by @BeforeInsert in your entity
  return user;
});
