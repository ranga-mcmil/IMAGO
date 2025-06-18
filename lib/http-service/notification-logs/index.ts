import { apiClient, APIResponse } from "@/lib/http-service/apiClient";
import { apiHeaderService } from "@/lib/http-service/apiHeaders";
import { BaseAPIRequests } from "@/lib/http-service/baseAPIRequests";
import { 
  NotificationLogStatusFilter,
  PaginationParams,
  GetAllNotificationLogsResponse
} from "./types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/next-auth-options";

export class NotificationLogService extends BaseAPIRequests {
  
  // GET /api/admin/notification-logs - Get All Notification Logs (with filtering and pagination)
  async getAllNotificationLogs(
    status?: NotificationLogStatusFilter,
    pagination?: Partial<PaginationParams>
  ): Promise<APIResponse<GetAllNotificationLogsResponse>> {
    const params = new URLSearchParams({
      pageNo: (pagination?.pageNo ?? 0).toString(),
      pageSize: (pagination?.pageSize ?? 20).toString(),
      sortBy: pagination?.sortBy ?? 'createdAt',
      sortDir: pagination?.sortDir ?? 'desc',
    });

    // Add status filter if provided
    if (status) {
      params.append('status', status);
    }

    const url = `/api/admin/notification-logs?${params.toString()}`;

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.get(url, { headers });
      return this.handleResponse<GetAllNotificationLogsResponse>(response);
    } catch (error) {
      console.error('Notification Log Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }
}

export const notificationLogService = new NotificationLogService(apiClient, apiHeaderService);