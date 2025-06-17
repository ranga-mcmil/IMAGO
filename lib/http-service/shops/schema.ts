import { z } from 'zod';

export const CreateCategorySchema = z.object({
  category: z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
  }),  
  icon: z
    .any()
    .refine(
      (file) => file instanceof File,
      { message: "Icon must be a file." }
    )
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file?.type),
      { message: "Only JPEG or PNG files are allowed." }
    ),
});

export const UpdateBranchSchema = z.object({
  name: z.string(),
  location: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    province: z.string(),
    country: z.string(),
    postalCode: z.string(),
  }),
});
