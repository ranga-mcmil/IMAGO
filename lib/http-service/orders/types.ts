import { z } from "zod";
import { 
  CreateOrderSchema,
  UpdateOrderStatusSchema,
  OrderNumberSchema,
  ShopIdSchema,
  PaginationSchema
} from "./schema";

// Payload types (input)
export type CreateOrderPayload = z.infer<typeof CreateOrderSchema>;
export type UpdateOrderStatusPayload = z.infer<typeof UpdateOrderStatusSchema>;
export type OrderNumberPayload = z.infer<typeof OrderNumberSchema>;
export type ShopIdPayload = z.infer<typeof ShopIdSchema>;
export type PaginationParams = z.infer<typeof PaginationSchema>;

// Response types (based on OpenAPI spec)
export type OrderItem = {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  discount: number;
  lineTotalPrice: number;
};

export type OrderItemsHeader = {
  totalPrice: number;
  items: OrderItem[];
};

export type Order = {
  id: number;
  orderNumber: string;
  status: string;
  createdAt: string;
};

// Pagination response wrapper
export type PaginatedResponse<T> = {
  content: T[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};

// API Response types
export type CreateOrderResponse = Order;
export type GetOrdersByShopResponse = PaginatedResponse<Order>;
export type GetOrderItemsResponse = OrderItemsHeader;
export type UpdateOrderStatusResponse = {
  [key: string]: string;
};
export type CancelOrderResponse = {
  [key: string]: string;
};
export type GetUserOrdersResponse = PaginatedResponse<Order>;
export type GetAllOrdersForAdminResponse = PaginatedResponse<Order>;