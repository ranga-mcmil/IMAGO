import { z } from 'zod';

// Schema for order item
export const OrderItemSchema = z.object({
  productId: z.string()
    .uuid({ message: 'Product ID must be a valid UUID' }),
  quantity: z.number()
    .min(1, { message: 'Quantity must be at least 1' })
    .int({ message: 'Quantity must be a whole number' }),
});

// Schema for creating orders
export const CreateOrderSchema = z.object({
  orderItems: z.array(OrderItemSchema)
    .min(1, { message: 'At least one order item is required' })
    .max(100, { message: 'Cannot have more than 100 items in one order' }),
});

// Schema for updating order status
export const UpdateOrderStatusSchema = z.object({
  status: z.string()
    .min(1, { message: 'Status is required' })
    .max(50, { message: 'Status must be at most 50 characters' }),
});

// Schema for order number validation
export const OrderNumberSchema = z.object({
  orderNumber: z.string()
    .min(1, { message: 'Order number is required' })
    .max(50, { message: 'Order number must be at most 50 characters' }),
});

// Schema for shop ID validation
export const ShopIdSchema = z.object({
  shopId: z.string()
    .uuid({ message: 'Shop ID must be a valid UUID' }),
});

// Pagination schema
export const PaginationSchema = z.object({
  pageNo: z.number().min(0).default(0),
  pageSize: z.number().min(1).max(100).default(10),
  sortBy: z.string().default('id'),
  sortDir: z.enum(['asc', 'desc']).default('asc'),
});