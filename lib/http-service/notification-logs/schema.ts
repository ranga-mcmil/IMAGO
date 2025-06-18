import { z } from 'zod';

// Schema for notification log status filter
export const NotificationLogStatusSchema = z.enum([
  'PENDING',
  'FAILED', 
  'SENT',
  'RETRYING'
]);

// Pagination schema
export const PaginationSchema = z.object({
  pageNo: z.number().min(0).default(0),
  pageSize: z.number().min(1).max(100).default(20),
  sortBy: z.string().default('createdAt'),
  sortDir: z.enum(['asc', 'desc']).default('desc'),
});