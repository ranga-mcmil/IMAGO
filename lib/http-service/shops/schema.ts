import { z } from 'zod';

export const CreateCategoryFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  icon: z
    .any()
    .refine(
      (file) => file instanceof File,
      { message: "Icon must be a file." }
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file?.type),
      { message: "Only JPEG, PNG, GIF, or WebP files are allowed." }
    )
    .refine(
      (file) => file?.size <= 5 * 1024 * 1024, // 5MB limit
      { message: "File size must be less than 5MB." }
    ),
});

export const CreateCategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  icon: z
    .any()
    .refine(
      (file) => file instanceof File,
      { message: "Icon must be a file." }
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file?.type),
      { message: "Only JPEG, PNG, GIF, or WebP files are allowed." }
    )
    .refine(
      (file) => file?.size <= 5 * 1024 * 1024, // 5MB limit
      { message: "File size must be less than 5MB." }
    ),
});

export const UpdateCategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
});

export const UploadCategoryIconSchema = z.object({
  icon: z
    .any()
    .refine(
      (file) => file instanceof File,
      { message: "Icon must be a file." }
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file?.type),
      { message: "Only JPEG, PNG, GIF, or WebP files are allowed." }
    )
    .refine(
      (file) => file?.size <= 5 * 1024 * 1024, // 5MB limit
      { message: "File size must be less than 5MB." }
    ),
});

// Keep existing schemas for backward compatibility
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




// S H O P S
// Pagination schema
export const PaginationSchema = z.object({
  pageNo: z.number().min(0).default(0),
  pageSize: z.number().min(1).max(100).default(10),
  sortBy: z.string().default('name'),
  sortDir: z.enum(['asc', 'desc']).default('asc'),
});