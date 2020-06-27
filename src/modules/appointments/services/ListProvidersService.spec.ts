import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the profile', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Joel Mittel',
      email: 'joelm@example.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Joel Rittol',
      email: 'joelr@example.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Joel Quattel',
      email: 'joelq@example.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]); // 15:00
  });

  // it('should not be able to show the profile from non-existing user', async () => {
  //   expect(
  //     showProfile.execute({
  //       user_id: 'non-existing-user-id',
  //     })
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});