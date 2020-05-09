import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs'; // file system do NodeJS

import uploadConfig from '../config/upload';
import User from '../models/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new Error('Only authenticated users can change avatar.');
    }

    if (user.avatar) {
      // Deletar avatar anterior

      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar); // (caminho, nome)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath); // stat - status de um arquivo se existir

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath); // Deletar arquivo antigo
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
