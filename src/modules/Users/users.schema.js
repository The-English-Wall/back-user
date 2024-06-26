import z from "zod"

import { extractValidationData } from "../../common/utils/extractErrorData.js"

const registerUserSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email({ message: "invalid email" }),
    password: z.string().min(8),
    image: z.string().optional(),
    companyId: z.number().positive(),
    organizationName: z.string().optional(),
    organizationTaxId: z.string().optional(),
    organizationId: z.number().positive().optional(),
    userType: z.string().optional(),
})

const loginUserSchema = z.object({
    email: z.string().email({ message: "invalid email" }),
    password: z.string().min(8),
})

const updateUserSchema = z.object({
    email: z.string().email({ message: "invalid email" }),
    name: z.string().min(3).max(20),
    password: z.string().min(8),
    image: z.string().optional()
})

export const validateRegister = (data) => {
    const result = registerUserSchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data: userData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        userData
    }
}

export const validateLogin = (data) => {
    const result = loginUserSchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data: userData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        userData

    }
}
export const validateUpdate = (data) => {
    const result = updateUserSchema.partial().safeParse(data)

    const {
        hasError,
        errorMessages,
        data: userData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        userData

    }
}