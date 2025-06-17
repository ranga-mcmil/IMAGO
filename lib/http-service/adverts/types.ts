import { z } from "zod";
import { 
  CreateAdvertSchema, 
  AdvertApprovalSchema, 
  CancelAdvertSchema,
  AdvertStatusFilterSchema,
  PaginationSchema
} from "./schema";

// Payload types (input)
export type CreateAdvertPayload = z.infer<typeof CreateAdvertSchema>;
export type AdvertApprovalPayload = z.infer<typeof AdvertApprovalSchema>;
export type CancelAdvertPayload = z.infer<typeof CancelAdvertSchema>;
export type AdvertStatusFilter = z.infer<typeof AdvertStatusFilterSchema>;
export type PaginationParams = z.infer<typeof PaginationSchema>;

// Response types (based on OpenAPI spec)
export type AdvertStatus = 
  | "PENDING" 
  | "APPROVED" 
  | "ACTIVE" 
  | "REJECTED" 
  | "EXPIRED" 
  | "CANCELLED" 
  | "PAUSED";

export type Advert = {
  id: number;
  productId: string;
  productName: string;
  requesterId: string;
  requesterName: string;
  status: AdvertStatus;
  durationDays: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isExpired: boolean;
  daysRemaining: number;
  approvedByName?: string;
  approvedAt?: string;
  rejectionReason?: string;
  cancellationReason?: string;
  createdAt: string;
};

export type ActiveAdvert = {
  baseUrl: string;
  id: number;
  productName: string;
  productId: string;
  productPrice: number;
  productDiscount: number;
  productImageUrl: string;
  shopName: string;
  shopId: string;
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
export type CreateAdvertResponse = Advert;
export type GetAdvertsResponse = PaginatedResponse<Advert>;
export type GetPendingAdvertsResponse = PaginatedResponse<Advert>;
export type ProcessAdvertApprovalResponse = Advert;
export type CancelAdvertResponse = Advert;
export type GetActiveAdvertsResponse = ActiveAdvert[];