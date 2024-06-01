import { AppError, catchAsync } from '../../errors/index.js';
import {
  validateLogin,
  validateRegister,
  validateUpdate,
} from './users.schema.js';
import { UserServices } from './users_service.js';
import generateJWT from '../../config/plugins/generate-JWT.js';
import { verifyPassword } from '../../config/plugins/encrypted-password.js';
import { BASE_URL_COMPANY, BASE_URL_SUPPLIER } from '../../config/conections/axios.config.js';
import { ERROR_MESSAGES } from '../../common/utils/ErrorMessagesHanddle.js';
import { SUCCESS_MESSAGES } from '../../common/utils/succesMessages.js';

const userService = new UserServices();

export const findAllUsers = catchAsync(async (req, res, next) => {
  const user = await userService.findAllUser()

  res.status(200).json(user)
})

export const findOneUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await userService.findOneById(id)

  if (!user) {
    next(new AppError(ERROR_MESSAGES.error_user_not_found, 404))
  }

  res.status(200).json(user)
})

export const login = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateLogin(req.body);
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const user = await userService.findUserByEmail(userData.email);

  if (!user) {
    return next(new AppError(ERROR_MESSAGES.error_user_not_exist, 404));
  }

  const isCorrectPassword = await verifyPassword(
    userData.password,
    user.password
  );

  if (!isCorrectPassword) {
    return next(new AppError(ERROR_MESSAGES.error_user_icorrect_information, 401));
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    token,
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image
    },
  });
});

export const register = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateRegister(req.body);
  
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }


  // if(userData.userType === "customer") {
  //   try {
  //     const { data } = await BASE_URL_SUPPLIER.get(`/supplier/${userData.organizationId}`)
  //     console.log('data: ', data)
  //     await BASE_URL_SUPPLIER.patch(`/supplier/${userData.organizationId}`, {userId})
  //   } catch (error) {
      
  //   }
  // }

  if(userData.userType === "employee") {
    try {
      const { data } = await BASE_URL_COMPANY.get(`/company/${userData.companyId}`)
      let userListPayload = data.userList === null ? [] : data.userList
  
      userListPayload.push(userData)
  
      await BASE_URL_COMPANY.patch(`/company/${userData.companyId}`, { userList: userListPayload })
    } catch (error) {
      next(new AppError(ERROR_MESSAGES.error_user_register, 422))
    }
  }

  const user = await userService.createUser(userData);

  const token = await generateJWT(user.id);

  return res.status(201).json({
    token,
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
      userType: user.userType
    },
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateUpdate(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const { user } = req;

  const updatedUser = await userService.updateUser(user, userData);

  return res.status(200).json(SUCCESS_MESSAGES.success_message_updated, updatedUser);
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const user = await userService.findOneById(id)

  if (!user) {
    return next(new AppError(ERROR_MESSAGES.error_user_not_exist, 404));
  }

  await userService.deleteUser(user);

  return res.status(200).json(SUCCESS_MESSAGES.succes_message_deleted);
});


