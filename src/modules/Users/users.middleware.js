import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { envs } from '../../config/enviroments/enviroments.js';
import { UserServices } from './users_service.js';
import { catchAsync } from '../../errors/index.js';
import { AppError } from '../../errors/index.js';
import { ERROR_MESSAGES } from '../../common/utils/ErrorMessagesHanddle.js';

const userService = new UserServices()

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError(ERROR_MESSAGES.error_user_not_login, 401)
    );
  }

  const decoded = await promisify(jwt.verify)(
    token,
    envs.SECRET_JWD_SEED
  );

  const user = await userService.findOneById(decoded.id)

  if (!user) {
    return next(
      new AppError(ERROR_MESSAGES.error_user_token_owner, 401)
    );
  }

  req.sessionUser = user;
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError(ERROR_MESSAGES.error_user_permissions, 403)
      );
    }

    next();
  };
};

export const protectAccountOwner = catchAsync(async (req, res, next) => {
  const { user, sessionUser } = req;

  if (user?.id !== sessionUser?.id) {
    return next(new AppError(ERROR_MESSAGES.error_user_own_account, 401));
  }

  next();
});

export const validExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const user = await userService.findOneById(id)

  if (!user) {
    return next(new AppError(ERROR_MESSAGES.error_user_not_exist, 404));
  }

  req.user = user;
  next()
})