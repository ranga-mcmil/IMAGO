import { z } from 'zod';

// Schema for getting all products with filters
export const GetAllProductsSchema = z.object({
  pageNo: z.number().min(0).default(0),
  pageSize: z.number().min(1).max(100).default(10),
  sortBy: z.string().default('name'),
  sortDir: z.enum(['asc', 'desc']).default('asc'),
});

// Pagination schema (for reusability)
export const PaginationSchema = z.object({
  pageNo: z.number().min(0).default(0),
  pageSize: z.number().min(1).max(100).default(10),
  sortBy: z.string().default('name'),
  sortDir: z.enum(['asc', 'desc']).default('asc'),
});