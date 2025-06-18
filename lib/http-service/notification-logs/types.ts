import { z } from "zod";
import { 
  NotificationLogStatusSchema,
  PaginationSchema
} from "./schema";

// Payload types (input)
export type NotificationLogStatusFilter = z.infer<typeof NotificationLogStatusSchema>;
export type PaginationParams = z.infer<typeof PaginationSchema>;

// Response types (based on OpenAPI spec)
export type NotificationLogStatus = 
  | "PENDING" 
  | "FAILED" 
  | "SENT" 
  | "RETRYING";

export type NotificationLog = {
  id: string;
  recipient: string;
  notificationType: string;
  templateId: string;
  status: NotificationLogStatus;
  createdAt: string;
  sentAt?: string;
  lastError?: string;
  payload: string;
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
export type GetAllNotificationLogsResponse = PaginatedResponse<NotificationLog>;