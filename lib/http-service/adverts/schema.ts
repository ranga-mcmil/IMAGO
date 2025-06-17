import { z } from 'zod';

// Schema for creating advert requests
export const CreateAdvertSchema = z.object({
  productId: z.string()
    .uuid({ message: 'Product ID must be a valid UUID' }),
  durationDays: z.number()
    .min(1, { message: 'Duration must be at least 1 day' })
    .max(365, { message: 'Duration cannot exceed 365 days' }),
  notes: z.string()
    .max(500, { message: 'Notes cannot exceed 500 characters' })
    .optional(),
});

// Schema for advert approval
export const AdvertApprovalSchema = z.object({
  action: z.enum(['APPROVE', 'REJECT'], {
    message: 'Action must be either APPROVE or REJECT'
  }),
  rejectionReason: z.string()
    .min(1, { message: 'Rejection reason is required when rejecting' })
    .optional(),
  startDate: z.string()
    .datetime({ message: 'Start date must be a valid datetime' })
    .optional(),
}).refine(
  (data) => {
    // If action is REJECT, rejectionReason is required
    if (data.action === 'REJECT' && !data.rejectionReason) {
      return false;
    }
    // If action is APPROVE, startDate is required
    if (data.action === 'APPROVE' && !data.startDate) {
      return false;
    }
    return true;
  },
  {
    message: 'Rejection reason is required when rejecting, start date is required when approving',
    path: ['rejectionReason'],
  }
);

// Schema for cancelling adverts
export const CancelAdvertSchema = z.object({
  cancellationReason: z.string()
    .min(1, { message: 'Cancellation reason is required' })
    .max(500, { message: 'Cancellation reason cannot exceed 500 characters' }),
});

// Schema for filtering adverts
export const AdvertStatusFilterSchema = z.enum([
  'PENDING',
  'APPROVED', 
  'ACTIVE',
  'REJECTED',
  'EXPIRED',
  'CANCELLED',
  'PAUSED'
]);

// Pagination schema
export const PaginationSchema = z.object({
  pageNo: z.number().min(0).default(0),
  pageSize: z.number().min(1).max(100).default(10),
  sortBy: z.string().default('id'),
  sortDir: z.enum(['asc', 'desc']).default('asc'),
});