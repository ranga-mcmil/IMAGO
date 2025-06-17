import { z } from 'zod';

// Schema for creating users
export const CreateUserSchema = z.object({
  email: z.string()
    .email({ message: 'Enter a valid email address' })
    .min(1, { message: 'Email is required' }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/, {
      message: 'Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character (@#$%^&+=)'
    }),
  phoneNumber: z.string()
    .min(1, { message: 'Phone number is required' })
    .regex(/^\+?[0-9\s-]{10,}$/, {
      message: 'Phone number must be at least 10 characters and contain only numbers, spaces, hyphens, and optional plus sign'
    }),
  firstName: z.string()
    .max(50, { message: 'First name must be at most 50 characters' })
    .optional(),
  lastName: z.string()
    .max(50, { message: 'Last name must be at most 50 characters' })
    .optional(),
  role: z.string()
    .min(1, { message: 'Role is required' }),
});

// Schema for updating users
export const UpdateUserSchema = z.object({
  email: z.string()
    .email({ message: 'Enter a valid email address' })
    .min(1, { message: 'Email is required' }),
  phoneNumber: z.string()
    .min(1, { message: 'Phone number is required' })
    .regex(/^\+?[0-9\s-]{10,}$/, {
      message: 'Phone number must be at least 10 characters and contain only numbers, spaces, hyphens, and optional plus sign'
    }),
  firstName: z.string()
    .max(50, { message: 'First name must be at most 50 characters' })
    .optional(),
  lastName: z.string()
    .max(50, { message: 'Last name must be at most 50 characters' })
    .optional(),
  role: z.string()
    .min(1, { message: 'Role is required' }),
});

// Schema for updating users v2
export const UpdateUserV2Schema = z.object({
  email: z.string()
    .email({ message: 'Enter a valid email address' })
    .min(1, { message: 'Email is required' }),
  phoneNumber: z.string()
    .min(1, { message: 'Phone number is required' })
    .regex(/^\+?[0-9\s-]{10,}$/, {
      message: 'Phone number must be at least 10 characters and contain only numbers, spaces, hyphens, and optional plus sign'
    }),
  firstName: z.string()
    .max(50, { message: 'First name must be at most 50 characters' })
    .optional(),
  lastName: z.string()
    .max(50, { message: 'Last name must be at most 50 characters' })
    .optional(),
  role: z.string()
    .min(1, { message: 'Role is required' }),
});

// Schema for forgot password request
export const ForgotPasswordSchema = z.object({
  email: z.string()
    .email({ message: 'Enter a valid email address' })
    .min(1, { message: 'Email is required' }),
  newPassword: z.string()
    .min(1, { message: 'New password is required' }),
});

// Schema for OTP request
export const OtpRequestSchema = z.object({
  email: z.string()
    .email({ message: 'Enter a valid email address' })
    .min(1, { message: 'Email is required' }),
});

// Schema for change password
export const ChangePasswordSchema = z.object({
  currentPassword: z.string()
    .min(1, { message: 'Current password is required' }),
  newPassword: z.string()
    .min(1, { message: 'New password is required' }),
});

// Schema for email validation
export const EmailSchema = z.object({
  email: z.string()
    .email({ message: 'Enter a valid email address' })
    .min(1, { message: 'Email is required' }),
});

// Pagination schema
export const PaginationSchema = z.object({
  pageNo: z.number().min(0).default(0),
  pageSize: z.number().min(1).max(100).default(10),
  sortBy: z.string().default('id'),
  sortDir: z.enum(['asc', 'desc']).default('asc'),
});