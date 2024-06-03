import express from 'express';
import {
      login,
      deleteUser,
      updateUser,
      register,
      findAllUsers,
      findOneUser,
      Test
} from './user.controller.js';

import {
      protect,
      protectAccountOwner,
      validExistUser
} from './users.middleware.js';

export const router = express.Router()

router.post("/login", login)

router.post("/register", register)

router.route('/')
      .get(findAllUsers)

router.route('/:id')
      .get(findOneUser)

router.route('/:id')
      .patch(validExistUser, protect, protectAccountOwner, updateUser)
      .delete(validExistUser, protectAccountOwner, deleteUser)

router.route('/test')
      .post(Test)



