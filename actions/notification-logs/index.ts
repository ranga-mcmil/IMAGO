// actions/notification-logs/index.ts
'use server';

import { APIResponse } from "@/lib/http-service/apiClient";
import { notificationLogService } from "@/lib/http-service/notification-logs";
import { 
  NotificationLogStatusSchema,
  PaginationSchema
} from "@/lib/http-service/notification-logs/schema";
import { 
  NotificationLogStatusFilter,
  PaginationParams,
  GetAllNotificationLogsResponse
} from "@/lib/http-service/notification-logs/types";

// Get All Notification Logs (with optional status filtering and pagination)
export async function getAllNotificationLogsAction(
  status?: NotificationLogStatusFilter,
  pagination?: Partial<PaginationParams>
): Promise<APIResponse<GetAllNotificationLogsResponse>> {
  // Validate status filter if provided
  if (status) {
    const statusValidation = NotificationLogStatusSchema.safeParse(status);
    if (!statusValidation.success) {
      return {
        success: false,
        error: 'Invalid notification log status filter',
        fieldErrors: statusValidation.error.flatten().fieldErrors,
      };
    }
  }

  // Validate pagination if provided
  if (pagination) {
    const paginationValidation = PaginationSchema.partial().safeParse(pagination);
    if (!paginationValidation.success) {
      return {
        success: false,
        error: 'Invalid pagination parameters',
        fieldErrors: paginationValidation.error.flatten().fieldErrors,
      };
    }
  }

  return await notificationLogService.getAllNotificationLogs(status, pagination);
}