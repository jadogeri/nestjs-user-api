// src/user/user.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const userFactory = await factoryManager.get(User);

    // ✅ Happy Path: Create 50 random users
    await userFactory.saveMany(50);

    // ✅ Edge Case: Create a specific admin user for testing
    const repository = dataSource.getRepository(User);
    const adminExists = await repository.findOneBy({ email: 'admin@test.com' });
    
    if (!adminExists) {
      await repository.insert([
        {
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@test.com',
          age: 99,
          ssn: '000-00-0000'
        },
      ]);
    }
  }
}
