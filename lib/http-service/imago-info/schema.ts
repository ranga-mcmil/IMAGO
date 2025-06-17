import { z } from 'zod';

export const ImagoInfoSchema = z.object({
  email: z.string()
    .email({ message: 'Enter a valid email address' })
    .min(1, { message: 'Email is required' }),
  phoneNumber: z.string()
    .min(1, { message: 'Phone number is required' })
    .regex(/^[+]?[0-9\s\-()]{7,20}$/, { 
      message: 'Enter a valid phone number (7-20 characters, numbers, spaces, +, -, () allowed)' 
    }),
  companyName: z.string()
    .min(1, { message: 'Company name is required' })
    .max(100, { message: 'Company name must be at most 100 characters' }),
});