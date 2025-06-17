
import { z } from 'zod';

// Schema for syncing specific order
export const SyncSpecificOrderSchema = z.object({
  orderNumber: z.string()
    .min(1, { message: 'Order number is required' })
    .max(50, { message: 'Order number must be at most 50 characters' }),
});

// No additional schemas needed for triggerManualSync and getOrderStatusSummary
// as they don't require request bodies