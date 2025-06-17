import { apiClient, APIResponse } from "@/lib/http-service/apiClient";
import { apiHeaderService } from "@/lib/http-service/apiHeaders";
import { BaseAPIRequests } from "@/lib/http-service/baseAPIRequests";
import { 
  TriggerManualSyncResponse,
  SyncSpecificOrderResponse,
  GetOrderStatusSummaryResponse
} from "./types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/next-auth-options";

export class OrderStatusAdminService extends BaseAPIRequests {
  
  // 1. POST /api/admin/order-status/sync - Trigger Manual Sync
  async triggerManualSync(): Promise<APIResponse<TriggerManualSyncResponse>> {
    const url = '/api/admin/order-status/sync';

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.post(url, {}, { headers });
      return this.handleResponse<TriggerManualSyncResponse>(response);
    } catch (error) {
      console.error('Order Status Admin Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  // 2. POST /api/admin/order-status/sync/{orderNumber} - Sync Specific Order
  async syncSpecificOrder(orderNumber: string): Promise<APIResponse<SyncSpecificOrderResponse>> {
    const url = `/api/admin/order-status/sync/${encodeURIComponent(orderNumber)}`;

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.post(url, {}, { headers });
      return this.handleResponse<SyncSpecificOrderResponse>(response);
    } catch (error) {
      console.error('Order Status Admin Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }

  // 3. GET /api/admin/order-status/summary - Get Order Status Summary
  async getOrderStatusSummary(): Promise<APIResponse<GetOrderStatusSummaryResponse>> {
    const url = '/api/admin/order-status/summary';

    try {
      const session = await getServerSession(authOptions);
      const headers = await this.apiHeaders.getHeaders(session);
      const response = await this.client.get(url, { headers });
      return this.handleResponse<GetOrderStatusSummaryResponse>(response);
    } catch (error) {
      console.error('Order Status Admin Service request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      };
    }
  }
}

export const orderStatusAdminService = new OrderStatusAdminService(apiClient, apiHeaderService);