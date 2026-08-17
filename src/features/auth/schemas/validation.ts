import { z } from 'zod';

const MIN_PASSWORD_LENGTH = 8;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Enter a valid email address' }),
  password: z.string().min(MIN_PASSWORD_LENGTH, {
    message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
